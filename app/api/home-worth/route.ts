import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, address, city, message } = await req.json();

    if (!name || !email || !address || !city) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Pay It Forward Realty <noreply@payitforwardrealtybrant.ca>',
      to: 'info@payitforwardrealty.ca',
      replyTo: email,
      subject: `Home Evaluation Request — ${address}, ${city}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 24px; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #58b3e5; padding-bottom: 12px;">
            New Home Evaluation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: bold;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #e0e0e0;">
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase;">Email</td>
              <td style="padding: 10px 0; color: #1a1a1a;"><a href="mailto:${email}" style="color: #58b3e5;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #e0e0e0;">
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase;">Phone</td>
              <td style="padding: 10px 0; color: #1a1a1a;">${phone || '—'}</td>
            </tr>
            <tr style="border-top: 1px solid #e0e0e0;">
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase;">Property</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: bold;">${address}, ${city}</td>
            </tr>
            ${message ? `
            <tr style="border-top: 1px solid #e0e0e0;">
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase; vertical-align: top;">Notes</td>
              <td style="padding: 10px 0; color: #1a1a1a;">${message}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #58b3e5; border-radius: 4px; text-align: center;">
            <a href="mailto:${email}" style="color: #fff; font-weight: bold; text-decoration: none; font-size: 15px;">
              Reply to ${name} →
            </a>
          </div>

          <p style="margin-top: 20px; color: #aaa; font-size: 12px; text-align: center;">
            Submitted via payitforwardrealtybrant.ca — Home Worth page
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
