/**
 * Activity Database Schema
 *
 * Stores curated Indianapolis activities with comprehensive metadata.
 */

export const ACTIVITY_DB_SCHEMA = `
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK(category IN ('fitness', 'arts-culture', 'volunteering', 'learning', 'social', 'hobbies')) NOT NULL,
  location TEXT NOT NULL,
  venue TEXT,
  schedule_type TEXT CHECK(schedule_type IN ('evergreen', 'dated')) NOT NULL,
  schedule_details TEXT,
  difficulty_level INTEGER CHECK(difficulty_level BETWEEN 1 AND 5),
  social_size TEXT CHECK(social_size IN ('solo', 'small', 'medium', 'large')),
  cost TEXT CHECK(cost IN ('free', 'low', 'medium', 'high')),
  health_requirements TEXT,
  data_source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_difficulty ON activities(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_activities_schedule_type ON activities(schedule_type);
CREATE INDEX IF NOT EXISTS idx_activities_cost ON activities(cost);
`;

export const ACTIVITY_DB_TABLES = [
  'activities'
];
