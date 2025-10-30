/**
 * User Database Schema
 *
 * Stores user profiles, preferences, calendar blocks, recommendations, and conversation logs.
 */

export const USER_DB_SCHEMA = `
CREATE TABLE IF NOT EXISTS magic_tokens (
  email TEXT NOT NULL,
  token TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  health_mobility TEXT CHECK(health_mobility IN ('high', 'medium', 'low')),
  health_constraints TEXT,
  interests TEXT NOT NULL,
  social_preference TEXT CHECK(social_preference IN ('small-groups', 'large-groups', 'one-on-one', 'solo')),
  time_preferences TEXT,
  existing_routines TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calendar_blocks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  block_type TEXT CHECK(block_type IN ('commitment', 'low-energy-day', 'travel', 'busy-time')) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATETIME,
  end_date DATETIME,
  recurrence_pattern TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recommendations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  recommended_date DATE,
  reasoning TEXT NOT NULL,
  feedback TEXT CHECK(feedback IN ('liked', 'skipped', 'completed', NULL)),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  feedback_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conversation_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  sender TEXT CHECK(sender IN ('user', 'ai')) NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_blocks_user_id ON calendar_blocks(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_blocks_dates ON calendar_blocks(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_feedback ON recommendations(feedback);
CREATE INDEX IF NOT EXISTS idx_conversation_logs_user_id ON conversation_logs(user_id);
`;

export const USER_DB_TABLES = [
  'magic_tokens',
  'users',
  'profiles',
  'calendar_blocks',
  'recommendations',
  'conversation_logs'
];
