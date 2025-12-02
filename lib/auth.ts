import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function isAuthenticated() {
  const session = await getSession();
  return session.isLoggedIn === true;
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME || 'Holiday Travel Admin';
  // Fallback to the known hash if env var fails to load
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$LoU9BZaL0TyoK1ZhxipE8etHvpon9VfJMOWHoh2tY7tul7Qwf80gG';

  console.log('--- Auth Debug ---');
  console.log('Received Username:', username);
  console.log('Expected Username:', adminUsername);
  console.log('Hash exists:', !!adminPasswordHash);
  console.log('Hash length:', adminPasswordHash?.length);

  if (!adminPasswordHash) {
    console.error('ADMIN_PASSWORD_HASH not set in environment variables');
    return false;
  }

  if (username !== adminUsername) {
    console.log('❌ Username mismatch');
    return false;
  }

  const match = await bcrypt.compare(password, adminPasswordHash);
  console.log('Password match result:', match);
  return match;
}

// Helper function to hash password (run this once to get the hash)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
