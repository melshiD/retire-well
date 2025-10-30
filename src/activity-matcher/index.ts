import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';

interface UserProfile {
  interests: string[]; // e.g., ['fitness', 'arts-culture', 'social']
  physicalCapability: number; // 1-5 (matches difficulty_level)
  socialPreference: 'solo' | 'small' | 'medium' | 'large' | 'any';
  costPreference: 'free' | 'low' | 'medium' | 'high' | 'any';
  unavailableTimes?: string[]; // e.g., ['Monday 9:00 AM', 'Friday 1:00 PM']
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

    // POST /api/recommend - Get personalized activity recommendations
    if (url.pathname === '/api/recommend' && request.method === 'POST') {
      return this.getRecommendations(request);
    }

    return new Response('Activity Matcher Service - Ready');
  }

  private async getRecommendations(request: Request): Promise<Response> {
    try {
      // Parse user profile from request
      const profile = await request.json() as UserProfile;

      // Validate profile
      if (!profile.interests || profile.interests.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: 'User profile must include at least one interest'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Fetch all activities from database
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

      // Parse activities
      const activities: Activity[] = JSON.parse(result.results);

      // Score each activity based on user profile
      const scoredActivities = activities
        .map(activity => this.scoreActivity(activity, profile))
        .sort((a, b) => b.score - a.score);

      // Get top recommendations with variety
      const recommendations = this.selectDiverseRecommendations(scoredActivities, 5);

      return new Response(JSON.stringify({
        success: true,
        recommendations,
        totalActivitiesConsidered: activities.length
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

    // 1. Interest Match (40 points max)
    if (profile.interests.includes(activity.category)) {
      score += 40;
      matchReasons.push(`Matches your interest in ${activity.category}`);
    }

    // 2. Physical Capability Match (25 points max)
    const difficultyDiff = Math.abs(activity.difficulty_level - profile.physicalCapability);
    if (difficultyDiff === 0) {
      score += 25;
      matchReasons.push('Perfect difficulty match for your fitness level');
    } else if (difficultyDiff === 1) {
      score += 15;
      matchReasons.push('Good difficulty match');
    } else if (difficultyDiff === 2) {
      score += 5;
    }
    // Penalize if too difficult
    if (activity.difficulty_level > profile.physicalCapability + 1) {
      score -= 10;
    }

    // 3. Social Size Match (20 points max)
    if (profile.socialPreference === 'any' || activity.social_size === profile.socialPreference) {
      score += 20;
      if (profile.socialPreference !== 'any') {
        matchReasons.push(`Matches your ${profile.socialPreference} group preference`);
      }
    }

    // 4. Cost Match (15 points max)
    if (profile.costPreference === 'any' || activity.cost === profile.costPreference) {
      score += 15;
      if (activity.cost === 'free') {
        matchReasons.push('Free activity');
      } else if (profile.costPreference !== 'any') {
        matchReasons.push(`Matches your ${profile.costPreference} cost preference`);
      }
    } else {
      // Penalize if outside cost preference
      const costOrder = ['free', 'low', 'medium', 'high'];
      const prefIndex = costOrder.indexOf(profile.costPreference);
      const activityIndex = costOrder.indexOf(activity.cost);
      if (activityIndex > prefIndex) {
        score -= 10;
      }
    }

    // 5. Schedule Conflict Check (bonus points for no conflicts)
    const hasConflict = this.hasScheduleConflict(activity.schedule_details, profile.unavailableTimes || []);
    if (!hasConflict) {
      score += 10;
    } else {
      score -= 20;
      matchReasons.push('⚠️ Potential schedule conflict');
    }

    return {
      ...activity,
      score,
      matchReasons
    };
  }

  private hasScheduleConflict(scheduleDetails: string, unavailableTimes: string[]): boolean {
    // Simple string matching for now
    // In production, would parse times more intelligently
    for (const unavailable of unavailableTimes) {
      if (scheduleDetails.toLowerCase().includes(unavailable.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  private selectDiverseRecommendations(
    scoredActivities: ScoredActivity[],
    count: number
  ): ScoredActivity[] {
    const selected: ScoredActivity[] = [];
    const categoriesUsed = new Set<string>();

    // First pass: select top activities with category diversity
    for (const activity of scoredActivities) {
      if (selected.length >= count) break;

      // Prefer diverse categories
      if (!categoriesUsed.has(activity.category) || selected.length >= count - 2) {
        selected.push(activity);
        categoriesUsed.add(activity.category);
      }
    }

    // Second pass: fill remaining slots with highest scores
    for (const activity of scoredActivities) {
      if (selected.length >= count) break;
      if (!selected.includes(activity)) {
        selected.push(activity);
      }
    }

    return selected;
  }
}
