# Database Design

## user-db Schema

```sql
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
  health_constraints TEXT, -- JSON: knee issues, heart conditions, etc.
  interests TEXT NOT NULL, -- JSON array: woodworking, history, fitness, etc.
  social_preference TEXT CHECK(social_preference IN ('small-groups', 'large-groups', 'one-on-one', 'solo')),
  time_preferences TEXT, -- JSON: morning/afternoon/evening preferences
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
  recurrence_pattern TEXT, -- JSON for "every Tuesday morning" patterns
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

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_calendar_blocks_user_id ON calendar_blocks(user_id);
CREATE INDEX idx_calendar_blocks_dates ON calendar_blocks(start_date, end_date);
CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_feedback ON recommendations(feedback);
CREATE INDEX idx_conversation_logs_user_id ON conversation_logs(user_id);
```

## activity-db Schema

```sql
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK(category IN ('fitness', 'arts-culture', 'volunteering', 'learning', 'social', 'hobbies')) NOT NULL,
  location TEXT NOT NULL,
  venue TEXT,
  schedule_type TEXT CHECK(schedule_type IN ('evergreen', 'dated')) NOT NULL,
  schedule_details TEXT, -- JSON: days, times, or specific dates
  difficulty_level INTEGER CHECK(difficulty_level BETWEEN 1 AND 5),
  social_size TEXT CHECK(social_size IN ('solo', 'small', 'medium', 'large')),
  cost TEXT CHECK(cost IN ('free', 'low', 'medium', 'high')),
  health_requirements TEXT, -- JSON: mobility_level, constraints
  data_source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_difficulty ON activities(difficulty_level);
CREATE INDEX idx_activities_schedule_type ON activities(schedule_type);
CREATE INDEX idx_activities_cost ON activities(cost);
```

## Foreign Key Relationships

- profiles.user_id → users.id (CASCADE DELETE)
- calendar_blocks.user_id → users.id (CASCADE DELETE)
- recommendations.user_id → users.id (CASCADE DELETE)
- conversation_logs.user_id → users.id (CASCADE DELETE)
