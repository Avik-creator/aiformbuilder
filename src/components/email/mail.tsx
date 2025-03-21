import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(user: {
  email: string;
  name?: string | null;
}) {
  try {
    const { email, name } = user;
    
    await resend.emails.send({
      from: 'Welcome Onboard <onboarding@resend.dev>',
      to: email,
      subject: `Welcome to FormCraft AI, ${name || 'there'}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welcome to FormCraft AI</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                color: #333333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #000;
              }
              .content {
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
              }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #0070f3;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #666666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">FormCraft AI</div>
              </div>
              
              <div class="content">
                <h1>Welcome to FormCraft AI, ${name || 'there'}! 👋</h1>
                
                <p>We're excited to have you on board! Here are a few things you can do to get started:</p>
                
                <ul>
                  <li>Build your first form, using our service.</li>
                  <li>Explore all the features that we offer.</li>
                  <li>Get in touch with our support team if you need any help.</li>
                  <li>Share your feedback with on twitter by tagging @avikm744.</li>
                  <li>And much more...</li>
                </ul>
                
                <a href="https://formcraftai-delta.vercel.app" class="button">
                  Get Started
                </a>
                
                <p>
                  If you have any questions, feel free to reply to this email. We're here to help!
                </p>
                
                <p>Best regards,<br>The FormCraft AI Dev</p>
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} FormCraft AI. All rights reserved.</p>
                <p>
                  Our address: India
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
}

