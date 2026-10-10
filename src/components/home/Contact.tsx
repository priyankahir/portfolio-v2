import { MapPin } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { currentPosition } from "@/data/experience";
import { profile } from "@/data/profile";

export function Contact() {
  const reachable = profile.socials.filter((social) => social.handle);

  return (
    <Section id="contact" tinted>
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Open to MERN stack and full stack roles. Send a message or reach me directly — I usually reply within a day."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-10">
        {/* Contact details render without a scroll fade: they are the first
            content on /contact and must be fully legible from the first frame.
            min-w-0: without it the grid track is forced to the contact list's
            min-content width and the page scrolls sideways at 320px. */}
        <div className="flex min-w-0 flex-col gap-4">
          <ul className="panel divide-y divide-line">
            {reachable.map((social) => (
              <li key={social.label} className="group flex items-center gap-3 p-4">
                <span className="icon-pop grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-primary-soft text-primary">
                  <SocialIcon icon={social.icon} className="h-4 w-4" />
                </span>

                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "me noopener noreferrer"
                      : undefined
                  }
                  className="min-w-0 flex-1"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-faint">
                    {social.label}
                  </span>
                  <span className="block truncate text-sm text-fg transition-colors hover:text-primary">
                    {social.handle}
                  </span>
                </a>

                {(social.icon === "mail" || social.icon === "whatsapp") && (
                  <CopyButton
                    value={social.icon === "mail" ? profile.email : profile.phone}
                    label={social.label}
                  />
                )}
              </li>
            ))}

            <li className="flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-primary-soft text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-faint">
                  Location
                </span>
                <span className="block truncate text-sm text-fg">
                  {profile.location}
                </span>
              </span>
            </li>
          </ul>

          <div className="panel flex items-start gap-3 p-5">
            <span className="relative mt-1 flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-fg">
                {profile.availability.label}.
              </span>{" "}
              Currently {currentPosition.title} at {currentPosition.company}.
            </p>
          </div>
        </div>

        <Reveal direction="left" delay={0.1} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
