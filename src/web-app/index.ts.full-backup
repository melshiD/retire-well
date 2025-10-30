/**
 * RetireWell API Service
 * Clean API-only backend for Solid.js frontend
 */
import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';
import { activities } from '../sql/activity-seed-data';
import { USER_DB_SCHEMA } from '../sql/user-db';
import {
  generateToken,
  createSession,
  createSessionCookie,
  getSessionFromRequest,
  clearSessionCookie,
  sendEmail,
  generateMagicLinkEmail
} from './auth';

interface UserProfile {
  interests: string[];
  physicalCapability: number;
  socialPreference: 'solo' | 'small' | 'medium' | 'large' | 'any';
  costPreference: 'free' | 'low' | 'medium' | 'high' | 'any';
  unavailableTimes?: string[];
}

interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  venue: string;
  schedule_type: string;
  schedule_details: string;
  difficulty_level: number;
  social_size: string;
  cost: string;
  health_requirements: string;
  data_source: string;
}

interface ScoredActivity extends Activity {
  score: number;
  matchReasons: string[];
}

export default class extends Service<Env> {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Authentication endpoints
    if (url.pathname === '/auth/send-magic-link' && request.method === 'POST') {
      return this.sendMagicLink(request);
    }

    if (url.pathname === '/auth/verify' && request.method === 'GET') {
      return this.verifyMagicLink(request);
    }

    if (url.pathname === '/auth/logout' && request.method === 'POST') {
      return this.logout(request);
    }

    // Profile API
    if (url.pathname === '/api/profile' && request.method === 'GET') {
      return this.getProfile(request);
    }

    if (url.pathname === '/api/profile' && request.method === 'PUT') {
      return this.updateProfile(request);
    }

    // Admin/Setup endpoints
    if (url.pathname === '/seed-activities' && request.method === 'POST') {
      return this.seedActivities();
    }

    if (url.pathname === '/create-schema' && request.method === 'POST') {
      return this.createSchema();
    }

    if (url.pathname === '/init-user-db' && request.method === 'POST') {
      return this.initUserDatabase();
    }

    // Activity endpoints
    if (url.pathname === '/api/activities' && request.method === 'GET') {
      return this.getActivities();
    }

    if (url.pathname === '/api/test-recommendations' && request.method === 'POST') {
      return this.testRecommendations(request);
    }

    // Default response
    return new Response(JSON.stringify({
      name: 'RetireWell API',
      version: '1.0.0',
      endpoints: [
        'POST /auth/send-magic-link',
        'GET /auth/verify?token=...',
        'POST /auth/logout',
        'GET /api/profile',
        'PUT /api/profile',
        'GET /api/activities',
        'POST /api/test-recommendations'
      ]
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Authentication
  private async sendMagicLink(request: Request): Promise<Response> {
    try {
      const { email } = await request.json() as { email: string };

      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Valid email required'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const token = generateToken();
      const expiresAt = Date.now() + (15 * 60 * 1000);

      await this.env.USER_DB.executeQuery({
        sqlQuery: `INSERT OR REPLACE INTO magic_tokens (email, token, expires_at, created_at)
                   VALUES ('${email}', '${token}', ${expiresAt}, ${Date.now()})`
      });

      const baseUrl = new URL(request.url).origin;
      const resendApiKey = 're_KivjUso8_DXQcTkp8CagZUw3zFYRpvrT7';

      const emailHtml = generateMagicLinkEmail(email, token, baseUrl);
      const emailResult = await sendEmail({
        to: email,
        subject: 'Sign in to RetireWell',
        html: emailHtml
      }, resendApiKey);

      if (!emailResult.success) {
        return new Response(JSON.stringify({
          success: false,
          error: `Failed to send email: ${emailResult.error || 'Unknown error'}`
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Magic link sent! Check your email.'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async verifyMagicLink(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const token = url.searchParams.get('token');

      if (!token) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const result = await this.env.USER_DB.executeQuery({
        sqlQuery: `SELECT * FROM magic_tokens WHERE token = '${token}' AND expires_at > ${Date.now()} LIMIT 1`
      });

      if (result.status !== 200 || !result.results) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid or expired magic link' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const tokens = JSON.parse(result.results);
      if (tokens.length === 0) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid or expired magic link' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { email } = tokens[0];

      const userResult = await this.env.USER_DB.executeQuery({
        sqlQuery: `SELECT * FROM users WHERE email = '${email}' LIMIT 1`
      });

      let userId: string;
      let name: string;

      if (userResult.status === 200 && userResult.results) {
        const users = JSON.parse(userResult.results);
        if (users.length > 0) {
          userId = users[0].id;
          name = users[0].name;
        } else {
          userId = generateToken();
          name = email.split('@')[0];
          await this.env.USER_DB.executeQuery({
            sqlQuery: `INSERT INTO users (id, email, name, created_at, updated_at)
                       VALUES ('${userId}', '${email}', '${name}', ${Date.now()}, ${Date.now()})`
          });
        }
      } else {
        return new Response(JSON.stringify({ success: false, error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      await this.env.USER_DB.executeQuery({
        sqlQuery: `DELETE FROM magic_tokens WHERE token = '${token}'`
      });

      const session = createSession(userId, email, name);
      const sessionCookie = createSessionCookie(session);

      // Redirect to frontend dashboard
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/dashboard',
          'Set-Cookie': sessionCookie
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async logout(request: Request): Promise<Response> {
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': clearSessionCookie()
      }
    });
  }

  // Profile Management
  private async getProfile(request: Request): Promise<Response> {
    const session = getSessionFromRequest(request);

    if (!session) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Not authenticated'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const userResult = await this.env.USER_DB.executeQuery({
        sqlQuery: `SELECT * FROM users WHERE id = '${session.userId}' LIMIT 1`
      });

      if (userResult.status !== 200 || !userResult.results) {
        return new Response(JSON.stringify({
          success: false,
          error: 'User not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const users = JSON.parse(userResult.results);
      const user = users[0];

      const profileResult = await this.env.USER_DB.executeQuery({
        sqlQuery: `SELECT * FROM profiles WHERE user_id = '${session.userId}' LIMIT 1`
      });

      let profile = null;
      if (profileResult.status === 200 && profileResult.results) {
        const profiles = JSON.parse(profileResult.results);
        if (profiles.length > 0) {
          profile = profiles[0];
        }
      }

      return new Response(JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          location: user.location
        },
        profile: profile ? {
          health_mobility: profile.health_mobility,
          health_constraints: profile.health_constraints,
          interests: profile.interests,
          social_preference: profile.social_preference,
          time_preferences: profile.time_preferences,
          existing_routines: profile.existing_routines
        } : null
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async updateProfile(request: Request): Promise<Response> {
    const session = getSessionFromRequest(request);

    if (!session) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Not authenticated'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const data = await request.json() as any;

      if (data.name || data.age || data.location) {
        const updates = [];
        if (data.name) updates.push(`name = '${data.name.replace(/'/g, "''")}'`);
        if (data.age) updates.push(`age = ${data.age}`);
        if (data.location) updates.push(`location = '${data.location.replace(/'/g, "''")}'`);
        updates.push(`updated_at = ${Date.now()}`);

        await this.env.USER_DB.executeQuery({
          sqlQuery: `UPDATE users SET ${updates.join(', ')} WHERE id = '${session.userId}'`
        });
      }

      if (data.profile) {
        const p = data.profile;
        const profileId = generateToken();

        const checkResult = await this.env.USER_DB.executeQuery({
          sqlQuery: `SELECT id FROM profiles WHERE user_id = '${session.userId}' LIMIT 1`
        });

        const profileExists = checkResult.status === 200 &&
                             checkResult.results &&
                             JSON.parse(checkResult.results).length > 0;

        if (profileExists) {
          const updates = [];
          if (p.health_mobility) updates.push(`health_mobility = '${p.health_mobility}'`);
          if (p.health_constraints) updates.push(`health_constraints = '${p.health_constraints.replace(/'/g, "''")}'`);
          if (p.interests) updates.push(`interests = '${p.interests.replace(/'/g, "''")}'`);
          if (p.social_preference) updates.push(`social_preference = '${p.social_preference}'`);
          if (p.time_preferences) updates.push(`time_preferences = '${p.time_preferences.replace(/'/g, "''")}'`);
          if (p.existing_routines) updates.push(`existing_routines = '${p.existing_routines.replace(/'/g, "''")}'`);
          updates.push(`updated_at = ${Date.now()}`);

          await this.env.USER_DB.executeQuery({
            sqlQuery: `UPDATE profiles SET ${updates.join(', ')} WHERE user_id = '${session.userId}'`
          });
        } else {
          await this.env.USER_DB.executeQuery({
            sqlQuery: `INSERT INTO profiles (
              id, user_id, health_mobility, health_constraints, interests,
              social_preference, time_preferences, existing_routines, created_at, updated_at
            ) VALUES (
              '${profileId}',
              '${session.userId}',
              '${p.health_mobility || 'medium'}',
              '${(p.health_constraints || '').replace(/'/g, "''")}',
              '${(p.interests || '').replace(/'/g, "''")}',
              '${p.social_preference || 'small-groups'}',
              '${(p.time_preferences || '').replace(/'/g, "''")}',
              '${(p.existing_routines || '').replace(/'/g, "''")}',
              ${Date.now()},
              ${Date.now()}
            )`
          });
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Profile updated successfully'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Database setup
  private async initUserDatabase(): Promise<Response> {
    try {
      const statements = USER_DB_SCHEMA
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const results = [];
      for (const statement of statements) {
        const result = await this.env.USER_DB.executeQuery({
          sqlQuery: statement
        });
        results.push({
          statement: statement.substring(0, 50) + '...',
          status: result.status,
          message: result.message
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'User database initialized',
        results
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async createSchema(): Promise<Response> {
    try {
      const schema = `CREATE TABLE IF NOT EXISTS activities (
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
      )`;

      const result = await this.env.ACTIVITY_DB.executeQuery({
        sqlQuery: schema
      });

      return new Response(JSON.stringify({
        success: true,
        result
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async getActivities(): Promise<Response> {
    try {
      const result = await this.env.ACTIVITY_DB.executeQuery({
        sqlQuery: 'SELECT * FROM activities LIMIT 10'
      });

      return new Response(JSON.stringify({
        success: true,
        result
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private async testRecommendations(request: Request): Promise<Response> {
    try {
      const profile = await request.json() as UserProfile;

      if (!profile.interests || profile.interests.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: 'User profile must include at least one interest'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const result = await this.env.ACTIVITY_DB.executeQuery({
        sqlQuery: 'SELECT * FROM activities'
      });

      if (result.status !== 200 || !result.results) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to fetch activities from database'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const dbActivities: Activity[] = JSON.parse(result.results);

      const scoredActivities = dbActivities
        .map(activity => this.scoreActivity(activity, profile))
        .sort((a, b) => b.score - a.score);

      const recommendations = this.selectDiverseRecommendations(scoredActivities, 5);

      return new Response(JSON.stringify({
        success: true,
        recommendations,
        totalActivitiesConsidered: dbActivities.length
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  private scoreActivity(activity: Activity, profile: UserProfile): ScoredActivity {
    let score = 0;
    const matchReasons: string[] = [];

    if (profile.interests.includes(activity.category)) {
      score += 40;
      matchReasons.push(`Matches your interest in ${activity.category}`);
    }

    const difficultyDiff = Math.abs(activity.difficulty_level - profile.physicalCapability);
    if (difficultyDiff === 0) {
      score += 25;
      matchReasons.push('Perfect difficulty match');
    } else if (difficultyDiff === 1) {
      score += 15;
      matchReasons.push('Good difficulty match');
    } else if (difficultyDiff === 2) {
      score += 5;
    }
    if (activity.difficulty_level > profile.physicalCapability + 1) {
      score -= 10;
    }

    if (profile.socialPreference === 'any' || activity.social_size === profile.socialPreference) {
      score += 20;
      if (profile.socialPreference !== 'any') {
        matchReasons.push(`Matches your ${profile.socialPreference} group preference`);
      }
    }

    if (profile.costPreference === 'any' || activity.cost === profile.costPreference) {
      score += 15;
      if (activity.cost === 'free') {
        matchReasons.push('Free activity');
      }
    } else {
      const costOrder = ['free', 'low', 'medium', 'high'];
      const prefIndex = costOrder.indexOf(profile.costPreference);
      const activityIndex = costOrder.indexOf(activity.cost);
      if (activityIndex > prefIndex) {
        score -= 10;
      }
    }

    const hasConflict = this.hasScheduleConflict(activity.schedule_details, profile.unavailableTimes || []);
    if (!hasConflict) {
      score += 10;
    } else {
      score -= 20;
      matchReasons.push('⚠️ Potential schedule conflict');
    }

    return { ...activity, score, matchReasons };
  }

  private hasScheduleConflict(scheduleDetails: string, unavailableTimes: string[]): boolean {
    for (const unavailable of unavailableTimes) {
      if (scheduleDetails.toLowerCase().includes(unavailable.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  private selectDiverseRecommendations(scoredActivities: ScoredActivity[], count: number): ScoredActivity[] {
    const selected: ScoredActivity[] = [];
    const categoriesUsed = new Set<string>();

    for (const activity of scoredActivities) {
      if (selected.length >= count) break;
      if (!categoriesUsed.has(activity.category) || selected.length >= count - 2) {
        selected.push(activity);
        categoriesUsed.add(activity.category);
      }
    }

    for (const activity of scoredActivities) {
      if (selected.length >= count) break;
      if (!selected.includes(activity)) {
        selected.push(activity);
      }
    }

    return selected;
  }

  private async seedActivities(): Promise<Response> {
    try {
      await this.env.ACTIVITY_DB.executeQuery({
        sqlQuery: 'DELETE FROM activities'
      });

      let inserted = 0;
      const errors: string[] = [];
      for (const activity of activities) {
        try {
          const result = await this.env.ACTIVITY_DB.executeQuery({
            sqlQuery: `INSERT INTO activities (
              id, name, description, category, location, venue,
              schedule_type, schedule_details, difficulty_level,
              social_size, cost, health_requirements, data_source
            ) VALUES (
              '${activity.id}',
              '${activity.name.replace(/'/g, "''")}',
              '${activity.description.replace(/'/g, "''")}',
              '${activity.category}',
              '${activity.location.replace(/'/g, "''")}',
              '${activity.venue.replace(/'/g, "''")}',
              '${activity.schedule_type}',
              '${activity.schedule_details.replace(/'/g, "''")}',
              ${activity.difficulty_level},
              '${activity.social_size}',
              '${activity.cost}',
              '${activity.health_requirements.replace(/'/g, "''")}',
              '${activity.data_source.replace(/'/g, "''")}'
            )`
          });
          if (result.status === 200) {
            inserted++;
          } else {
            errors.push(`${activity.id}: status ${result.status} - ${result.message}`);
          }
        } catch (err) {
          errors.push(`${activity.id}: ${err instanceof Error ? err.message : 'unknown error'}`);
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: `Successfully seeded ${inserted} activities`,
        total: activities.length,
        errors: errors.length > 0 ? errors : undefined
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
