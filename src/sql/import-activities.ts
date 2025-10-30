/**
 * Import script for populating activity-db with seed data
 * Run this after deployment to populate the database
 */

import { activities } from './activity-seed-data';

/**
 * Generate batch INSERT statement for all activities
 */
export function generateBatchInsert(): string {
  const values = activities.map(a => {
    // Escape single quotes in strings for SQL
    const escape = (str: string) => str.replace(/'/g, "''");

    return `(
      '${a.id}',
      '${escape(a.name)}',
      '${escape(a.description)}',
      '${a.category}',
      '${escape(a.location)}',
      '${escape(a.venue)}',
      '${a.schedule_type}',
      '${escape(a.schedule_details)}',
      ${a.difficulty_level},
      '${a.social_size}',
      '${a.cost}',
      '${escape(a.health_requirements)}',
      '${escape(a.data_source)}'
    )`;
  }).join(',\n    ');

  return `INSERT INTO activities (
    id, name, description, category, location, venue,
    schedule_type, schedule_details, difficulty_level,
    social_size, cost, health_requirements, data_source
  ) VALUES
    ${values};`;
}

/**
 * Generate individual INSERT statements (useful for debugging)
 */
export function generateIndividualInserts(): string[] {
  return activities.map(a => {
    const escape = (str: string) => str.replace(/'/g, "''");

    return `INSERT INTO activities (
      id, name, description, category, location, venue,
      schedule_type, schedule_details, difficulty_level,
      social_size, cost, health_requirements, data_source
    ) VALUES (
      '${a.id}',
      '${escape(a.name)}',
      '${escape(a.description)}',
      '${a.category}',
      '${escape(a.location)}',
      '${escape(a.venue)}',
      '${a.schedule_type}',
      '${escape(a.schedule_details)}',
      ${a.difficulty_level},
      '${a.social_size}',
      '${a.cost}',
      '${escape(a.health_requirements)}',
      '${escape(a.data_source)}'
    );`;
  });
}

// If run directly, output the SQL
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('-- Activity Database Seed Data');
  console.log(`-- ${activities.length} activities`);
  console.log('');
  console.log(generateBatchInsert());
}
