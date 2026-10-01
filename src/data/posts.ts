import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "stripe-razorpay-nodejs-payments",
    title: "Supporting Stripe and Razorpay in One Node.js App",
    excerpt:
      "Two payment gateways, one codebase. A provider-agnostic interface, server-side verification, signed webhooks and idempotency — and why the browser never decides whether an order is paid.",
    publishedAt: "2026-09-22T09:00:00.000Z",
    category: "Backend",
    tags: ["Stripe", "Razorpay", "Node.js", "Express", "Payments"],
    readingMinutes: 9,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "On a multi-role franchise platform, payments had to work for customers in India and outside it. That meant Razorpay for one group and Stripe for the other, both feeding the same orders, the same dashboards and the same franchisee payouts. The tempting route is two parallel code paths. The one that survives is a single payment flow with two thin adapters underneath it.",
      },
      { type: "heading", level: 2, text: "One interface, two adapters" },
      {
        type: "paragraph",
        text: "The rest of the app should never import a gateway SDK. It talks to a `PaymentProvider`, and the provider translates between our vocabulary and the gateway's. Both gateways work in the smallest currency unit — paise and cents — so amounts stay integers end to end.",
      },
      {
        type: "code",
        language: "ts",
        caption: "The contract every gateway adapter implements",
        code: `export type ProviderName = "stripe" | "razorpay";

export interface CreatePaymentInput {
  orderId: string;
  amount: number; // smallest unit: paise or cents
  currency: string;
}

export interface PaymentEvent {
  provider: ProviderName;
  eventId: string;
  type: "payment.succeeded" | "payment.failed" | "ignored";
  orderId?: string;
  providerPaymentId?: string;
  amount?: number;
  currency?: string;
}

export interface PaymentProvider {
  readonly name: ProviderName;
  createPayment(input: CreatePaymentInput): Promise<{ clientSecret?: string; providerOrderId: string }>;
  parseWebhook(rawBody: Buffer, headers: IncomingHttpHeaders): PaymentEvent;
}`,
      },
      {
        type: "paragraph",
        text: "The adapters stay small. Stripe creates a PaymentIntent and returns its client secret; Razorpay creates an order and returns its id for the checkout widget. Our own order id travels in metadata or notes, so every event that comes back can be tied to a row we created.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Creating the payment — our order id rides along in both",
        code: `// Stripe adapter
const intent = await stripe.paymentIntents.create(
  { amount, currency, metadata: { orderId } },
  { idempotencyKey: "order-" + orderId }
);
return { clientSecret: intent.client_secret ?? undefined, providerOrderId: intent.id };

// Razorpay adapter
const order = await razorpay.orders.create({
  amount,
  currency,
  receipt: orderId,
  notes: { orderId },
});
return { providerOrderId: order.id };`,
      },
      { type: "heading", level: 2, text: "The client is never the source of truth" },
      {
        type: "paragraph",
        text: "A success callback in the browser proves only that some JavaScript ran. Anyone can call your 'payment complete' endpoint with a made-up payment id, close the tab before the callback fires, or lose connection halfway through a redirect. So the browser is allowed to report what happened, but never to decide it.",
      },
      {
        type: "list",
        items: [
          "Amounts are computed on the server from the order, never accepted from the request body.",
          "Razorpay's checkout response is verified with an HMAC signature before we even look at it.",
          "The order only becomes `paid` when a verified webhook says so — the redirect page just shows 'confirming' and polls.",
        ],
      },
      {
        type: "code",
        language: "ts",
        caption: "Verifying Razorpay's checkout signature on the server",
        code: `import crypto from "node:crypto";

export function verifyRazorpayCheckout(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  signature: string
): boolean {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}`,
      },
      {
        type: "callout",
        tone: "warn",
        text: "Compare signatures with `crypto.timingSafeEqual`, not `===`. A plain string comparison returns early on the first mismatched character, which leaks timing information to anyone probing the endpoint.",
      },
      { type: "heading", level: 2, text: "Webhooks: raw body first, JSON never" },
      {
        type: "paragraph",
        text: "Both gateways sign the exact bytes they send. If `express.json()` parses the body before your handler sees it, the bytes are gone and every signature check fails. Mount the webhook route with `express.raw()` before the global JSON parser.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Signature checks on the raw request body",
        code: `app.post("/webhooks/:provider", express.raw({ type: "application/json" }), handleWebhook);
app.use(express.json());

// Stripe adapter
parseWebhook(rawBody, headers) {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    headers["stripe-signature"] as string,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  // ...map payment_intent.succeeded / payment_intent.payment_failed
}

// Razorpay adapter
parseWebhook(rawBody, headers) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");
  if (!safeEqual(expected, String(headers["x-razorpay-signature"] ?? ""))) {
    throw new Error("invalid_signature");
  }
  const body = JSON.parse(rawBody.toString("utf8"));
  // ...map payment.captured / payment.failed
}`,
      },
      { type: "heading", level: 2, text: "Idempotency, because gateways retry" },
      {
        type: "paragraph",
        text: "Webhooks are delivered at least once, not exactly once. A slow response, a deploy mid-request or a network blip and the same event arrives again. Treat duplicate delivery as normal, and make processing an event twice produce the same result as processing it once.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Record the event first; let a unique index reject repeats",
        code: `export async function applyPaymentEvent(event: PaymentEvent) {
  try {
    await ProcessedEvent.create({ provider: event.provider, eventId: event.eventId });
  } catch (err) {
    if ((err as { code?: number }).code === 11000) return; // already handled
    throw err;
  }

  if (event.type !== "payment.succeeded" || !event.orderId) return;

  const order = await Order.findById(event.orderId).lean();
  if (!order || order.amount !== event.amount || order.currency !== event.currency) {
    throw new Error("payment_mismatch");
  }

  // Conditional update: only a pending order can become paid
  await Order.updateOne(
    { _id: order._id, status: "pending" },
    { $set: { status: "paid", paidVia: event.provider, providerPaymentId: event.providerPaymentId } }
  );
}`,
      },
      {
        type: "paragraph",
        text: "Three layers do the work: a unique index on `{ provider, eventId }` stops the same event being applied twice, the amount check stops a payment for one order settling another, and the `status: \"pending\"` filter makes the state transition itself idempotent. On the outbound side, Stripe's `idempotencyKey` stops a retried create request from charging twice.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Acknowledge the webhook with a 2xx as soon as the event is safely recorded, and do slow follow-up work — emails, payout calculations — afterwards. A handler that times out gets retried, and that retry storm is avoidable.",
      },
      { type: "heading", level: 2, text: "What the abstraction should not hide" },
      {
        type: "paragraph",
        text: "The interface covers creating and confirming payments, not everything the gateways do. Refunds, disputes and settlement reports differ enough that forcing them into one shape produces an interface that fits neither. I keep those as provider-specific services and only unify the part every flow depends on: an order goes from pending to paid exactly once, and only because a gateway said so in a message we could verify.",
      },
    ],
  },
  {
    slug: "mongodb-schema-design-indexes",
    title: "Designing MongoDB Schemas from Access Patterns",
    excerpt:
      "Start with the queries, not the entities. Embedding vs referencing, compound indexes that match real filters and sorts, .lean(), cursor pagination and explain(), with an order and inventory example.",
    publishedAt: "2026-08-26T09:00:00.000Z",
    category: "Databases",
    tags: ["MongoDB", "Mongoose", "Node.js", "Schema Design", "Performance"],
    readingMinutes: 8,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "Relational habits push you to model entities first and worry about queries later. In MongoDB that order is backwards. On a bulk stock-purchasing platform — orders, pricing and inventory with a lot of transactions moving through — the schemas that held up were the ones designed from the list of questions the app actually asks.",
      },
      { type: "heading", level: 2, text: "Write the access patterns down first" },
      {
        type: "paragraph",
        text: "Before any schema, I list the reads and writes the screens and jobs will perform, roughly in order of frequency. For an order and inventory system it looks something like this:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List a buyer's orders, filtered by status, newest first, paginated.",
          "Open one order with all its line items.",
          "Check and reserve stock for several products in one purchase.",
          "Show current stock per product across warehouses.",
          "Update a product's price without rewriting historical orders.",
        ],
      },
      { type: "heading", level: 2, text: "Embed what is read together and bounded" },
      {
        type: "paragraph",
        text: "Line items belong inside the order. They're always read with it, there's a sensible upper limit on how many one order has, and — crucially — they should be a snapshot. The price and product name at the moment of purchase are facts about the order, not live references to a product that may change tomorrow.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Embedded snapshot for line items, reference for the buyer",
        code: `const lineItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    sku: { type: String, required: true },
    name: { type: String, required: true }, // snapshot
    unitPrice: { type: Number, required: true }, // snapshot, smallest unit
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "Buyer", required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "cancelled"], required: true },
    items: { type: [lineItemSchema], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);`,
      },
      { type: "heading", level: 2, text: "Reference what grows or changes independently" },
      {
        type: "paragraph",
        text: "Products, buyers and stock levels live in their own collections. A product appears in an unbounded number of orders, and its price changes on its own schedule. Embedding orders inside a buyer, or stock movements inside a product, creates arrays that grow forever — and documents have a hard size limit long before that becomes comfortable. An array with no natural upper bound is a reference waiting to happen.",
      },
      { type: "heading", level: 3, text: "Inventory gets its own document per product and warehouse" },
      {
        type: "paragraph",
        text: "Stock is the hottest write path, so it gets the smallest document: one per product per warehouse. Reserving stock becomes a conditional `$inc` whose `available: { $gte: quantity }` filter prevents overselling — the check and the decrement are one atomic operation, so two concurrent purchases can't both pass. A transaction then makes a multi-product purchase all-or-nothing, though it needs a replica set, which is worth knowing before local development surprises you.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Reserve every line or none of them",
        code: `await mongoose.connection.transaction(async (session) => {
  for (const item of items) {
    const result = await Inventory.updateOne(
      { productId: item.productId, warehouseId, available: { $gte: item.quantity } },
      { $inc: { available: -item.quantity, reserved: item.quantity } },
      { session }
    );
    if (result.modifiedCount === 0) {
      throw new OutOfStockError(item.productId);
    }
  }
  await Order.create([orderDoc], { session });
});`,
      },
      { type: "heading", level: 2, text: "Index for the query you actually run" },
      {
        type: "paragraph",
        text: "A compound index helps only if its field order matches the query. The guideline I follow is equality, sort, range: fields matched exactly first, then the sort fields, then anything filtered by a range. Separate single-field indexes on the same fields look similar but behave very differently — MongoDB will typically pick one, scan more than it needs and sort the rest in memory. For pattern one — a buyer's orders by status, newest first — that gives:",
      },
      {
        type: "code",
        language: "ts",
        caption: "Equality fields, then the sort — in the same direction the query sorts",
        code: `orderSchema.index({ buyerId: 1, status: 1, createdAt: -1, _id: -1 });
inventorySchema.index({ productId: 1, warehouseId: 1 }, { unique: true });`,
      },
      { type: "heading", level: 2, text: "Paginate with a cursor and read lean" },
      {
        type: "paragraph",
        text: "`skip()` still walks past every skipped document, so page 200 costs far more than page 1. Keyset pagination — 'give me the next 20 after this one' — uses the same index for every page. And for read-only list endpoints, `.lean()` returns plain objects instead of full Mongoose documents, skipping hydration you'd never use.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Cursor pagination on (createdAt, _id), projected and lean",
        code: `const filter: Record<string, unknown> = { buyerId, status };

if (cursor) {
  filter.$or = [
    { createdAt: { $lt: cursor.createdAt } },
    { createdAt: cursor.createdAt, _id: { $lt: cursor.id } },
  ];
}

const rows = await Order.find(filter)
  .sort({ createdAt: -1, _id: -1 })
  .limit(limit + 1)
  .select("status total createdAt")
  .lean();

const hasMore = rows.length > limit;
const page = hasMore ? rows.slice(0, limit) : rows;`,
      },
      {
        type: "paragraph",
        text: "Including `_id` as a tiebreaker matters: during a bulk import, many orders can share a timestamp, and paginating on `createdAt` alone will skip or repeat rows at page boundaries.",
      },
      { type: "heading", level: 2, text: "Prove it with explain()" },
      {
        type: "paragraph",
        text: "An index you think is used and an index that is used are different things. Run the real query with `.explain(\"executionStats\")` and read three things: the winning plan should show an `IXSCAN`, not a `COLLSCAN`; there should be no in-memory `SORT` stage; and `totalDocsExamined` should be close to `nReturned`. If the database examines thousands of documents to return twenty, the index doesn't fit the query.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Keep the access-pattern list in the repository next to the models. When a new screen needs a new query, adding it to the list is the moment to ask whether an existing index already covers it.",
      },
    ],
  },
  {
    slug: "socketio-ai-human-handoff",
    title: "Handing Off from AI to a Human Agent with Socket.IO",
    excerpt:
      "An AI assistant needs a way out. How I build live AI-to-human support handoff with Socket.IO and Express: a room per conversation, agent availability, reconnection and MongoDB persistence.",
    publishedAt: "2026-08-04T09:00:00.000Z",
    category: "Backend",
    tags: ["Socket.IO", "Node.js", "Express", "MongoDB", "Real-Time"],
    readingMinutes: 9,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "On a multi-tenant EHS platform, the AI assistant answers most questions, but some need a person: an incident that doesn't fit a category, a compliance deadline that's already passed. For those, the user clicks once and a live support agent joins the same conversation, with the full transcript already loaded. The frontend for that moment is simple. The backend behind it is where the interesting problems are.",
      },
      { type: "heading", level: 2, text: "Authenticate the socket, not just the page" },
      {
        type: "paragraph",
        text: "A Socket.IO connection is a second front door to the API, and it needs the same lock. I verify the JWT once in connection middleware and attach the claims to `socket.data`, so every event handler knows who is talking and which tenant they belong to.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Socket.IO middleware runs once per connection",
        code: `const io = new Server(httpServer, {
  cors: { origin: process.env.APP_ORIGIN, credentials: true },
  connectionStateRecovery: { maxDisconnectionDuration: 2 * 60 * 1000 },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token as string;
    socket.data.user = jwt.verify(token, process.env.JWT_SECRET!) as AuthClaims;
    next();
  } catch {
    next(new Error("unauthorised"));
  }
});`,
      },
      { type: "heading", level: 2, text: "One room per conversation" },
      {
        type: "paragraph",
        text: "Each conversation maps to a room. The customer joins it when the chat opens; the agent joins it when assigned. Broadcasting to the room reaches everyone in that conversation and nobody else. The important part is that joining is a checked operation — a client asking to join a room is a request, not a right.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Join only conversations you belong to, in your own tenant",
        code: `const room = (conversationId: string) => "conversation:" + conversationId;

io.on("connection", (socket) => {
  const { userId, tenantId } = socket.data.user;

  socket.on("conversation:join", async (conversationId: string, ack) => {
    const allowed = await Conversation.exists({
      _id: conversationId,
      tenantId,
      $or: [{ customerId: userId }, { agentId: userId }],
    });
    if (!allowed) return ack({ ok: false });

    await socket.join(room(conversationId));
    ack({ ok: true });
  });
});`,
      },
      { type: "heading", level: 2, text: "Persist first, then broadcast" },
      {
        type: "code",
        language: "ts",
        caption: "A client-generated id makes retries safe",
        code: `socket.on("message:send", async ({ conversationId, clientId, text }, ack) => {
  if (!socket.rooms.has(room(conversationId))) {
    return ack({ ok: false, error: "not_joined" });
  }

  // Unique index on { conversationId, clientId } turns a resend into a no-op
  const message = await Message.findOneAndUpdate(
    { conversationId, clientId },
    { $setOnInsert: { conversationId, clientId, text, senderId: userId, tenantId } },
    { upsert: true, new: true }
  );

  io.to(room(conversationId)).emit("message:new", message);
  ack({ ok: true, id: message._id });
});`,
      },
      {
        type: "paragraph",
        text: "Every message is written to MongoDB before it's emitted; reverse the order and a crash between the two leaves participants having seen a message that isn't in the transcript — exactly the record a compliance product can't afford to lose. The `clientId` is generated in the browser when the user hits send. If the acknowledgement never arrives and the client retries, the upsert finds the existing message instead of creating a duplicate. The UI keys optimistic messages on the same id, so the confirmed message replaces the pending one rather than appearing twice.",
      },
      { type: "heading", level: 2, text: "Agent availability is shared state" },
      {
        type: "paragraph",
        text: "Assigning an agent sounds like 'find someone who's free'. Under concurrency, two handoffs can find the same free agent at the same moment, so the assignment has to be a single atomic operation that both checks capacity and claims it. Sorting by current load, then by who was assigned longest ago, spreads conversations fairly without a separate scheduler; releasing capacity when a conversation closes is the mirror image, a guarded `$inc` of minus one.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Find and claim an agent in one atomic step",
        code: `const agent = await Agent.findOneAndUpdate(
  { tenantId, status: "available", activeChats: { $lt: MAX_CHATS_PER_AGENT } },
  { $inc: { activeChats: 1 }, $set: { lastAssignedAt: new Date() } },
  { sort: { activeChats: 1, lastAssignedAt: 1 }, new: true }
);`,
      },
      { type: "heading", level: 3, text: "Presence needs a grace period" },
      {
        type: "paragraph",
        text: "Agents open several tabs, laptops sleep, and Wi-Fi drops for a few seconds. Marking an agent offline on the first `disconnect` event makes them flicker in and out of the queue. Instead, each agent's sockets also join a personal room, and on disconnect I wait briefly and check whether any socket remains before changing their status. On a single Node process this works as written; across several instances, rooms and `fetchSockets()` need a Socket.IO adapter so every instance sees the same connections.",
      },
      {
        type: "code",
        language: "ts",
        code: `socket.on("disconnect", () => {
  setTimeout(async () => {
    const remaining = await io.in("agent:" + userId).fetchSockets();
    if (remaining.length === 0) {
      await Agent.updateOne({ _id: userId }, { $set: { status: "offline" } });
    }
  }, 30_000);
});`,
      },
      { type: "heading", level: 2, text: "Reconnection without lost messages" },
      {
        type: "paragraph",
        text: "Socket.IO reconnects automatically, but a reconnected socket is a new socket: it's in no rooms and missed whatever was sent while it was away. Connection state recovery covers short drops. For longer ones, the client rejoins and fetches anything newer than the last message it has, over plain REST.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Client side: rejoin and backfill on every reconnect",
        code: `socket.on("connect", async () => {
  if (socket.recovered) return; // rooms and missed events restored

  await socket.emitWithAck("conversation:join", conversationId);
  const missed = await api.get<Message[]>(
    "/conversations/" + conversationId + "/messages",
    { params: { after: lastMessageId } }
  );
  mergeMessages(missed);
});`,
      },
      { type: "heading", level: 2, text: "When nobody is free" },
      {
        type: "list",
        items: [
          "A user who asked for a human and gets silence assumes the feature is broken, so put the conversation in a queue and tell them, honestly, that they're waiting — not a spinner that implies someone is about to type.",
          "Keep the AI assistant available while they wait, clearly labelled, so the wait isn't dead time.",
          "When an agent's capacity frees up, assign from the queue oldest first, using the same atomic claim.",
          "If no agent is online at all, offer to turn the conversation into a support ticket, with the transcript attached, so nobody has to repeat themselves later.",
        ],
      },
      {
        type: "paragraph",
        text: "None of these pieces is complicated on its own. What makes the handoff feel seamless is that they all agree on one rule: the database is the record, and the socket is just the fastest way to tell people what changed.",
      },
    ],
  },
  {
    slug: "multi-tenant-rbac-mern-saas",
    title: "Multi-Tenant Role-Based Access in a MERN SaaS",
    excerpt:
      "One missing filter and a tenant can read another's data. The layered approach I use in MERN SaaS apps: tenantId on every document, JWT claims, Express guards and scoped Mongoose queries.",
    publishedAt: "2026-07-07T09:00:00.000Z",
    category: "Architecture",
    tags: ["MERN", "Node.js", "MongoDB", "Express", "Security"],
    readingMinutes: 8,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "In a multi-tenant SaaS, the worst bug isn't a crash. It's a list endpoint that returns another company's incident reports because someone wrote `Incident.find({ status })` and forgot the tenant. Nothing errors, the tests with one seeded tenant pass, and the leak sits there until a customer notices. Across an EHS platform and a franchise platform with admin, franchisor and franchisee roles, the lesson was the same: tenant isolation can't depend on every developer remembering a filter. It has to be a property of the system.",
      },
      { type: "heading", level: 2, text: "tenantId on every document" },
      {
        type: "paragraph",
        text: "I use a shared database with a `tenantId` field on every tenant-owned document, rather than a database per tenant. It keeps deployments, migrations and indexes simple. The cost is that isolation becomes your code's job — so the field is added by a schema plugin, required, and leads every compound index.",
      },
      {
        type: "code",
        language: "ts",
        caption: "A plugin so no model can forget the field",
        code: `export function tenantScoped(schema: Schema) {
  schema.add({
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, immutable: true },
  });
  schema.index({ tenantId: 1 });
}

incidentSchema.plugin(tenantScoped);
incidentSchema.index({ tenantId: 1, status: 1, createdAt: -1 });`,
      },
      { type: "heading", level: 2, text: "Keep JWT claims small and boring" },
      {
        type: "paragraph",
        text: "The token carries identity, not authority: the user id, their tenant and their role. Permissions are derived on the server from the role, so changing what a role can do doesn't require every user to log in again, and a token can't be crafted to claim a permission that the role map doesn't grant.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Authenticate once, attach claims to the request",
        code: `export interface AuthClaims {
  sub: string;
  tenantId: string;
  role: "admin" | "franchisor" | "franchisee";
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "unauthenticated" });
    return;
  }
  try {
    req.auth = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as AuthClaims;
    next();
  } catch {
    res.status(401).json({ error: "unauthenticated" });
  }
}`,
      },
      { type: "heading", level: 2, text: "Guard routes by permission, not by role" },
      {
        type: "paragraph",
        text: "Checking `role === \"admin\"` in a route spreads the access model across dozens of files. Checking a named permission keeps the model in one map, where a reviewer can read who can do what in a single screen.",
      },
      {
        type: "code",
        language: "ts",
        caption: "One map, one middleware factory",
        code: `const permissions = {
  admin: ["orders:read", "orders:write", "users:manage", "payouts:read"],
  franchisor: ["orders:read", "orders:write", "payouts:read"],
  franchisee: ["orders:read"],
} as const satisfies Record<AuthClaims["role"], readonly string[]>;

export type Permission = (typeof permissions)[keyof typeof permissions][number];

export const can = (role: AuthClaims["role"], permission: Permission) =>
  (permissions[role] as readonly string[]).includes(permission);

export const requirePermission =
  (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !can(req.auth.role, permission)) {
      res.status(403).json({ error: "forbidden" });
      return;
    }
    next();
  };

router.get("/orders", authenticate, requirePermission("orders:read"), listOrders);`,
      },
      { type: "heading", level: 2, text: "Make unscoped queries fail loudly" },
      {
        type: "paragraph",
        text: "Route guards answer 'may this user do this kind of thing?'. They don't answer 'which records?'. For that, every query on a tenant-scoped model must include the tenant — and I'd rather a forgotten filter throw in development than leak in production.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Query middleware that refuses to run without a tenant",
        code: `schema.pre(
  ["find", "findOne", "countDocuments", "updateOne", "updateMany", "deleteOne", "deleteMany", "findOneAndUpdate"],
  function () {
    if (!this.getFilter().tenantId) {
      throw new Error("Unscoped query on tenant model: " + this.model.modelName);
    }
  }
);`,
      },
      {
        type: "paragraph",
        text: "A side effect I like: `findById(id)` now fails, because it becomes a `findOne` filtered only by `_id`. The replacement, `findOne({ _id: id, tenantId })`, is exactly the query you wanted anyway. Aggregations need their own `pre(\"aggregate\")` hook that checks the first `$match` stage, since query middleware doesn't see pipelines.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "When a record exists but belongs to another tenant, return 404, not 403. A 403 confirms the id is real, which is information the caller shouldn't have.",
      },
      { type: "heading", level: 3, text: "When roles also narrow the data" },
      {
        type: "paragraph",
        text: "In the franchise platform, roles didn't only change what you could do — they changed what you could see. A franchisor sees all of their outlets; a franchisee sees only their own. I build that as one function that turns claims into a base filter, and every list endpoint starts from it rather than assembling its own.",
      },
      {
        type: "code",
        language: "ts",
        code: `export function baseFilter(auth: AuthClaims & { outletId?: string }) {
  const filter: Record<string, unknown> = { tenantId: auth.tenantId };
  if (auth.role === "franchisee") filter.outletId = auth.outletId;
  return filter;
}

const orders = await Order.find({ ...baseFilter(req.auth), status }).lean();`,
      },
      { type: "heading", level: 2, text: "Mirror permissions in the React UI" },
      {
        type: "paragraph",
        text: "The client fetches the current user's permissions from a `/me` endpoint — computed by the same map the server uses — and exposes them through a small hook. Buttons, menu items and whole routes render based on it, so nobody is shown an action that will only fail with a 403.",
      },
      {
        type: "code",
        language: "tsx",
        caption: "UI checks are for experience; the server is for security",
        code: `export function useCan(permission: Permission) {
  const { data } = useQuery({ queryKey: ["me"], queryFn: fetchMe, staleTime: 5 * 60_000 });
  return data?.permissions.includes(permission) ?? false;
}

function OrderActions({ order }: { order: Order }) {
  const canWrite = useCan("orders:write");
  if (!canWrite) return null;
  return <Button onClick={() => approve(order.id)}>Approve</Button>;
}`,
      },
      {
        type: "paragraph",
        text: "Hiding a button is a courtesy; rejecting the request is the control. Layered this way — a required field, a guard per route, a query layer that refuses to run unscoped, and a UI that reflects the same rules — no single forgotten line is enough to expose another tenant's data. That's the bar a multi-tenant product has to clear.",
      },
    ],
  },
  {
    slug: "server-state-vs-client-state-react",
    title: "Stop Putting Server Data in Your Global Store",
    excerpt:
      "Most React state bugs come from one mistake: treating data you fetched as if you owned it. Here's the split that fixed it for me — TanStack Query for server state, Zustand for everything else.",
    publishedAt: "2026-06-18T09:00:00.000Z",
    category: "Architecture",
    tags: ["React", "TanStack Query", "Zustand", "State Management"],
    readingMinutes: 7,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "The first dashboard I built had a single global store holding everything: the logged-in user, the sidebar collapse flag, the current filter, and the 400 rows of table data we'd just fetched. It worked until it didn't — stale rows after a mutation, two components fetching the same endpoint, and a `refreshData()` function that nobody could safely delete.",
      },
      {
        type: "paragraph",
        text: "The fix wasn't a better store. It was noticing that those things are not the same kind of state.",
      },
      { type: "heading", level: 2, text: "Two kinds of state" },
      {
        type: "paragraph",
        text: "Client state is state you own. It's created in the browser, it's authoritative, and nobody else can change it behind your back: is the modal open, which tab is active, what's typed in the search box.",
      },
      {
        type: "paragraph",
        text: "Server state is a cached copy of something you don't own. The database is the source of truth. Your copy is stale the moment you receive it, another user can change it, and it needs refetching, deduplication and invalidation. Putting it in a global store means hand-rolling all of that.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Rule of thumb: if the data arrived over the network, it is a cache — treat it like one.",
      },
      { type: "heading", level: 2, text: "What that looks like in practice" },
      {
        type: "paragraph",
        text: "Server state goes to TanStack Query. The query key is the identity of the data, and everything — deduplication, background refetch, garbage collection — follows from getting that key right.",
      },
      {
        type: "code",
        language: "tsx",
        caption: "Server state — the cache owns it",
        code: `export function useIncidents(filters: IncidentFilters) {
  return useQuery({
    queryKey: ["incidents", filters],
    queryFn: () => api.get<Incident[]>("/incidents", { params: filters }),
    staleTime: 30_000,
  });
}`,
      },
      {
        type: "paragraph",
        text: "Client state goes to Zustand — small, flat, and holding only things the browser is authoritative about. Note what is absent here: no `incidents` array, no `isLoading`, no `error`.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Client state — you own it",
        code: `export const useIncidentUi = create<IncidentUiState>((set) => ({
  filters: { status: "open", page: 1 },
  selectedId: null,
  setFilters: (filters) => set({ filters, page: 1 }),
  select: (selectedId) => set({ selectedId }),
}));`,
      },
      {
        type: "paragraph",
        text: "The two connect at exactly one point: client state feeds the query key. Change a filter and the key changes, so the cache serves a different entry — refetching if it doesn't have one. There's no `useEffect` syncing the two, because there's nothing to sync.",
      },
      { type: "heading", level: 2, text: "What this actually buys you" },
      {
        type: "list",
        items: [
          "Deduplication for free — five components calling `useIncidents` with the same filters make one request.",
          "Mutations invalidate instead of manually patching arrays, so the UI can't drift from the server.",
          "`isLoading` and `error` come from the cache, not from three booleans you maintain by hand.",
          "The global store shrinks to the point where you can read it in one screen.",
        ],
      },
      { type: "heading", level: 2, text: "The mistake I still see" },
      {
        type: "paragraph",
        text: "Copying query results into local state on mount. The moment you write `useEffect(() => setRows(data), [data])`, you've made a second source of truth and handed yourself the synchronisation problem you were trying to avoid. If you need a derived shape, derive it during render or with `select` — don't store it.",
      },
      {
        type: "code",
        language: "tsx",
        caption: "Derive, don't duplicate",
        code: `const { data: openCount } = useQuery({
  queryKey: ["incidents", filters],
  queryFn: fetchIncidents,
  select: (rows) => rows.filter((r) => r.status === "open").length,
});`,
      },
      {
        type: "paragraph",
        text: "Draw the line once, and most of the state bugs you were budgeting time for simply stop happening.",
      },
    ],
  },
  {
    slug: "frontend-for-rag-chatbot",
    title: "The Frontend Half of a RAG Chatbot",
    excerpt:
      "Retrieval and prompting get all the attention, but the interface decides whether users trust the answer. Notes from building a Claude-powered assistant inside a compliance platform.",
    publishedAt: "2026-05-27T09:00:00.000Z",
    category: "AI Engineering",
    tags: ["Claude API", "RAG", "React", "Streaming"],
    readingMinutes: 8,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "When we added an AI assistant to an EHS platform, the retrieval pipeline was the part everyone talked about — chunking strategy, embedding model, vector store. The part that decided whether safety officers actually used it was the interface.",
      },
      {
        type: "paragraph",
        text: "In a compliance context, a confident wrong answer is worse than no answer. Every frontend decision below follows from that.",
      },
      { type: "heading", level: 2, text: "Stream, but stream honestly" },
      {
        type: "paragraph",
        text: "A three-second wait with a spinner feels broken. The same three seconds with text arriving feels fast. But streaming introduces its own problem: users start reading before the model finishes, and a partial sentence can say the opposite of the complete one.",
      },
      {
        type: "list",
        items: [
          "Render tokens as they arrive, but hold citations back until the message is complete — a source list that grows mid-read is distracting.",
          "Keep the stop button visible for the whole stream. Being able to cancel is what makes a slow answer tolerable.",
          "Never auto-scroll if the user has scrolled up. Pin to bottom only while they're already at the bottom.",
        ],
      },
      {
        type: "code",
        language: "ts",
        caption: "Only follow the stream when the user hasn't taken over",
        code: `const atBottom =
  el.scrollHeight - el.scrollTop - el.clientHeight < 48;

if (atBottom) {
  el.scrollTop = el.scrollHeight;
}`,
      },
      { type: "heading", level: 2, text: "Show the retrieval, not just the answer" },
      {
        type: "paragraph",
        text: "The single highest-value element we shipped was the source list under each answer: which documents the retrieval step actually pulled, with a link into the exact section. It turns an opaque assertion into something checkable.",
      },
      {
        type: "paragraph",
        text: "It also makes failure legible. When the answer is wrong, users can see that retrieval pulled the wrong policy document — which is a fixable problem — rather than concluding the whole feature is unreliable.",
      },
      {
        type: "callout",
        tone: "info",
        text: "If retrieval returns nothing above your similarity threshold, say so and stop. A grounded assistant that admits it has no source beats one that falls back on general knowledge.",
      },
      { type: "heading", level: 2, text: "Design the exit before the happy path" },
      {
        type: "paragraph",
        text: "Every AI surface needs a way out. Ours was a human handoff: a waiting-room state, then a live agent joining the same conversation with the full transcript already loaded. The user never repeats themselves, and the escalation is one click rather than a support-ticket form.",
      },
      {
        type: "paragraph",
        text: "Building that early changes how the rest of the feature feels. You stop trying to make the model handle every edge case, because there's a defined path for the ones it can't.",
      },
      { type: "heading", level: 2, text: "Capture the signal" },
      {
        type: "paragraph",
        text: "Thumbs up/down and a star rating per answer cost almost nothing to build and are the only structured data you'll get about where the model is weak. Attach the retrieved document ids to each rating — then a bad score tells you whether the failure was retrieval or generation.",
      },
      { type: "heading", level: 2, text: "Latency is a UI problem" },
      {
        type: "list",
        ordered: true,
        items: [
          "Echo the user's message instantly — never wait for the server to confirm it.",
          "Show the retrieval step as its own visible phase, so the pause before tokens has an explanation.",
          "Render skeletons sized to the expected answer so the layout doesn't jump when text arrives.",
          "Keep the composer enabled while streaming; queue the next message rather than blocking input.",
        ],
      },
      {
        type: "paragraph",
        text: "None of this improves the model. All of it improves whether people keep using it.",
      },
    ],
  },
  {
    slug: "json-driven-dynamic-forms-react",
    title: "Rendering Forms from JSON Instead of Writing Them",
    excerpt:
      "When every client wants a different questionnaire, hard-coded forms mean a release per client. Here's how a schema-driven renderer with conditional logic replaced that.",
    publishedAt: "2026-04-14T09:00:00.000Z",
    category: "React",
    tags: ["React", "Forms", "TypeScript", "Architecture"],
    readingMinutes: 6,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "On an assessment platform, every client wanted a slightly different report and a slightly different questionnaire to feed it. Sections reordered, questions conditional on earlier answers, scoring narratives swapped. Written as components, each variation is a deploy.",
      },
      {
        type: "paragraph",
        text: "Written as data, each variation is a row in a table.",
      },
      { type: "heading", level: 2, text: "The schema is the contract" },
      {
        type: "code",
        language: "ts",
        caption: "A field describes itself, including when it exists",
        code: `type Field = {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "radio" | "date";
  required?: boolean;
  options?: { label: string; value: string }[];
  /** Field renders only when this evaluates true */
  visibleWhen?: Condition;
};

type Condition =
  | { field: string; equals: string | number | boolean }
  | { field: string; oneOf: (string | number)[] }
  | { all: Condition[] }
  | { any: Condition[] };`,
      },
      {
        type: "paragraph",
        text: "Making `visibleWhen` a recursive union rather than a string expression is the decision that matters. It's serialisable, it's type-checked, and you never end up running `eval` on customer-authored data.",
      },
      { type: "heading", level: 2, text: "Evaluating conditions" },
      {
        type: "code",
        language: "ts",
        code: `function matches(cond: Condition, values: FormValues): boolean {
  if ("all" in cond) return cond.all.every((c) => matches(c, values));
  if ("any" in cond) return cond.any.some((c) => matches(c, values));
  if ("oneOf" in cond) return cond.oneOf.includes(values[cond.field]);
  return values[cond.field] === cond.equals;
}`,
      },
      {
        type: "paragraph",
        text: "Twelve lines, no dependencies, fully testable in isolation. Almost every conditional-form requirement I've been handed decomposes into this.",
      },
      { type: "heading", level: 2, text: "The trap: hidden fields keep their values" },
      {
        type: "paragraph",
        text: "The bug that will find you is a field the user filled in, which later became hidden because they changed an earlier answer — and whose value silently submitted anyway. Sometimes that's what you want. Usually it isn't.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Decide explicitly whether hidden fields are pruned before submit, and validate only the visible set. Otherwise a required field the user can't see will block a form with no visible error.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Validate and submit only what's on screen",
        code: `const visible = fields.filter(
  (f) => !f.visibleWhen || matches(f.visibleWhen, values)
);

const payload = Object.fromEntries(
  visible.map((f) => [f.id, values[f.id]])
);

await schemaFor(visible).validate(payload, { abortEarly: false });`,
      },
      { type: "heading", level: 2, text: "Keep the registry boring" },
      {
        type: "paragraph",
        text: "One map from field type to component, and nothing else clever. The temptation is to let the schema pass arbitrary props through to components; resist it. The moment schema authors can reach into component internals, the contract stops being a contract.",
      },
      {
        type: "paragraph",
        text: "The payoff is that new questionnaires stop being engineering tickets. Someone in the product team composes one, and the renderer already knows how to draw it.",
      },
    ],
  },
  {
    slug: "core-web-vitals-for-dashboards",
    title: "Core Web Vitals When Your App Is a Dashboard",
    excerpt:
      "Most performance advice assumes a marketing page. Dashboards fail differently — INP from heavy re-renders, CLS from async widgets, and a bundle nobody audits. What actually moved the numbers.",
    publishedAt: "2026-03-09T09:00:00.000Z",
    category: "Performance",
    tags: ["Performance", "React", "Next.js", "Core Web Vitals"],
    readingMinutes: 7,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "Advice about Core Web Vitals is mostly written for landing pages: compress your hero image, preload your font, defer the analytics script. Useful, and almost irrelevant when your LCP element is a table that renders after three authenticated requests.",
      },
      { type: "heading", level: 2, text: "INP is the one that hurts" },
      {
        type: "paragraph",
        text: "Interaction to Next Paint is where dashboards fail. A user types in a filter box, and a single keystroke triggers a re-render of six hundred table rows because the input's state lives at the page level.",
      },
      {
        type: "list",
        items: [
          "Push input state down to the smallest component that needs it — a controlled input at page level re-renders the page on every keypress.",
          "Debounce the value that feeds the query key, not the value that feeds the input. The field should feel instant even when the fetch doesn't.",
          "Memoise row components and make sure the props are actually stable — an inline arrow in the parent defeats `React.memo` completely.",
          "Virtualise past a few hundred rows. There is no amount of memoisation that beats not rendering.",
        ],
      },
      {
        type: "code",
        language: "tsx",
        caption: "Instant input, debounced fetch",
        code: `const [text, setText] = useState("");
const deferred = useDeferredValue(text);

const { data } = useQuery({
  queryKey: ["rows", deferred],
  queryFn: () => fetchRows(deferred),
  placeholderData: keepPreviousData,
});`,
      },
      {
        type: "paragraph",
        text: "`keepPreviousData` matters more than it looks. Without it, every keystroke empties the table and refills it — which is both a layout shift and a visual stutter.",
      },
      { type: "heading", level: 2, text: "CLS comes from your own widgets" },
      {
        type: "paragraph",
        text: "Dashboard layout shift rarely comes from images. It comes from cards that render at zero height while loading and then push everything down when data lands.",
      },
      {
        type: "paragraph",
        text: "The fix is unglamorous: give every async region a fixed minimum height matching its loaded state, and make skeletons the same size as the real thing rather than a generic grey bar. Reserve space for scrollbars too — a container that gains one on data load shifts everything horizontally.",
      },
      { type: "heading", level: 2, text: "LCP is a data problem, not an image problem" },
      {
        type: "paragraph",
        text: "If the largest element only appears after auth, then a session check, then a fetch, no amount of image optimisation helps. What helped us:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Render the shell — nav, page header, card frames — from a server component immediately, so first paint isn't blocked on data.",
          "Fire independent requests in parallel instead of chaining them; most 'slow API' complaints are actually a client-side waterfall.",
          "Stream the slow region with Suspense rather than holding the whole page for the slowest widget.",
        ],
      },
      { type: "heading", level: 2, text: "Audit the bundle once a quarter" },
      {
        type: "paragraph",
        text: "Dashboards accumulate dependencies quietly — a date library imported for one format call, a chart library loaded on a route that shows no charts, an icon set imported wholesale. Dynamic-import anything below the fold or behind a tab, and check what a route actually ships before assuming it's fine.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Test on a mid-range Android over throttled 4G. A dashboard that feels instant on a MacBook can be several seconds to interactive on the device your users actually have.",
      },
    ],
  },
  {
    slug: "states-designers-dont-mock",
    title: "The Five States Your Figma File Doesn't Have",
    excerpt:
      "Every handoff shows the happy path with perfect data. Production shows everything else. The checklist I run before calling a screen done.",
    publishedAt: "2026-02-02T09:00:00.000Z",
    category: "Craft",
    tags: ["UI", "Figma", "Accessibility", "Frontend"],
    readingMinutes: 5,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "A Figma file shows a screen at its best: eight rows of clean data, names that fit, avatars that loaded. Production shows zero rows, four hundred rows, a name in Malayalam, and a 502 from the endpoint. The gap between those is most of the work.",
      },
      { type: "heading", level: 2, text: "1. Empty" },
      {
        type: "paragraph",
        text: "Not a blank area — a state that tells the user why it's empty and what to do next. There's a difference between 'no incidents reported yet' and 'no incidents match these filters', and the second one needs a button to clear the filters.",
      },
      { type: "heading", level: 2, text: "2. Loading" },
      {
        type: "paragraph",
        text: "Skeletons shaped like the content, not a centred spinner. A spinner tells you nothing about what's coming and guarantees layout shift when it's replaced. If the region takes the same space loading as loaded, nothing moves.",
      },
      { type: "heading", level: 2, text: "3. Error" },
      {
        type: "paragraph",
        text: "Errors need to be recoverable in place. A toast that vanishes leaves the user staring at a blank card with no idea what happened. Show what failed, keep whatever data you still have, and give them a retry that doesn't reload the page.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Never render a raw API error string. It leaks internals and means nothing to the person reading it.",
      },
      { type: "heading", level: 2, text: "4. Overflow" },
      {
        type: "paragraph",
        text: "Test every text node with content three times longer than the mock. Long names, long email addresses, a job title someone wrote a paragraph into. Decide per field whether it truncates with an accessible tooltip or wraps — but decide, rather than discovering it in a screenshot from a customer.",
      },
      { type: "heading", level: 2, text: "5. 320 pixels" },
      {
        type: "paragraph",
        text: "The narrowest viewport still in real use. Tables need a horizontal scroll container of their own so the page body never scrolls sideways. Modals need to survive a short viewport with a keyboard open. Touch targets need 44px whether or not the design gave them that.",
      },
      { type: "heading", level: 2, text: "The keyboard pass" },
      {
        type: "paragraph",
        text: "Before calling anything done: tab through it. Every interactive element reachable, focus visible at all times, focus trapped inside open modals and returned to the trigger on close, and Escape closing whatever's on top. It takes two minutes and catches more accessibility issues than any automated audit.",
      },
      {
        type: "paragraph",
        text: "None of this shows up in the mock. All of it shows up in support tickets.",
      },
    ],
  },
];

export const featuredPosts = posts.filter((post) => post.featured);

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const postCategories: string[] = Array.from(
  new Set(posts.map((post) => post.category))
).sort();
