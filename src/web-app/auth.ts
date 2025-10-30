/**
 * Authentication utilities for RetireWell
 * Uses magic link email verification with Resend
 */

// Session management
export interface Session {
  userId: string;
  email: string;
  name: string;
  createdAt: number;
  expiresAt: number;
}

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function createSession(userId: string, email: string, name: string): Session {
  const now = Date.now();
  return {
    userId,
    email,
    name,
    createdAt: now,
    expiresAt: now + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
}

export function serializeSession(session: Session): string {
  return btoa(JSON.stringify(session));
}

export function deserializeSession(sessionStr: string): Session | null {
  try {
    const session = JSON.parse(atob(sessionStr));
    if (session.expiresAt < Date.now()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function createSessionCookie(session: Session): string {
  const serialized = serializeSession(session);
  return `session=${serialized}; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`;
}

export function getSessionFromRequest(request: Request): Session | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('session='));
  if (!sessionCookie) return null;

  const parts = sessionCookie.split('=');
  if (parts.length < 2) return null;

  const sessionValue = parts[1];
  if (!sessionValue) return null;

  return deserializeSession(sessionValue);
}

export function clearSessionCookie(): string {
  return 'session=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/';
}

// Email sending via Resend
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions, resendApiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'RetireWell <onboarding@resend.dev>',
        to: options.to,
        subject: options.subject,
        html: options.html
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send email:', errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending email:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

export function generateMagicLinkEmail(email: string, token: string, baseUrl: string): string {
  const magicLink = `${baseUrl}/auth/verify?token=${token}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #666;
    }
    .link {
      color: #667eea;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">RetireWell</div>
    <h2>Welcome to RetireWell!</h2>
    <p>Click the button below to sign in to your account. This link will expire in 15 minutes.</p>

    <a href="${magicLink}" class="button">Sign In to RetireWell</a>

    <p>Or copy and paste this link into your browser:</p>
    <p class="link">${magicLink}</p>

    <div class="footer">
      <p>If you didn't request this email, you can safely ignore it.</p>
      <p>This magic link will expire in 15 minutes for security.</p>
    </div>
  </div>
</body>
</html>
  `;
}
