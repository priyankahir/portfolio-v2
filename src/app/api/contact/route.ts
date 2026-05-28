import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'priyankahir333@gmail.com',
      replyTo: email,
      subject: `[PB.OS INQUIRY] New message from ${name}`,
      text: `
--- SYSTEM_ENCRYPTED_MESSAGE ---

[SOURCE_NAME]: ${name}
[SOURCE_EMAIL]: ${email}
[TIMESTAMP]: ${new Date().toISOString()}

[PAYLOAD]:

${message}

--- END_MESSAGE ---
      `,
      html: `
        <div style="font-family: monospace; background-color: #050505; color: #00ff41; padding: 20px; border-radius: 8px;">
          <h2 style="border-bottom: 1px solid #00ff41; padding-bottom: 10px;">--- SYSTEM_ENCRYPTED_MESSAGE ---</h2>
          <p><strong>[SOURCE_NAME]:</strong> ${name}</p>
          <p><strong>[SOURCE_EMAIL]:</strong> ${email}</p>
          <p><strong>[TIMESTAMP]:</strong> ${new Date().toISOString()}</p>
          <br />
          <h3>[PAYLOAD]:</h3>
          <div style="background-color: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          <br />
          <p style="border-top: 1px solid #00ff41; padding-top: 10px;">--- END_MESSAGE ---</p>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
