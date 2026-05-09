import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, recipientEmail } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Alla fält är obligatoriska' }),
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to info@techpilots.se
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: email,
      subject: `Nytt kontaktmeddelande: ${subject}`,
      html: `
        <h2>Nytt kontaktmeddelande från webbplatsen</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Ämne:</strong> ${subject}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Meddelandet skickades framgångsrikt' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Ett fel uppstod när meddelandet skulle skickas' }),
      { status: 500 }
    );
  }
}
