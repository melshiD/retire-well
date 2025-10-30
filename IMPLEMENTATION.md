# RetireWell - Implementation Roadmap

## Current Status

**Phase: Infrastructure Complete** ✅
**Date: October 29, 2025**

All Raindrop infrastructure deployed and verified:
- 3 services running (web-app, conversational-ai, activity-matcher)
- 2 SmartSQL databases initialized with schemas (user-db, activity-db)
- 1 SmartMemory system (conversation-memory)
- 1 SmartBucket (activity-media)

All services currently return stub responses: "Request received"

## Implementation Phases

### Phase 1: Core Backend Services (NEXT)

#### 1.1 Authentication & User Management
**Location:** `src/web-app/`

- [ ] Implement WorkOS AuthKit integration
  - [ ] OAuth flow (Google)
  - [ ] Email/password auth
  - [ ] Session management with HTTP-only cookies
  - [ ] Auth middleware for protected routes
- [ ] User profile endpoints
  - [ ] GET /api/profile - Fetch user profile
  - [ ] PUT /api/profile - Update profile (age, location, interests, physical_limitations)
  - [ ] POST /api/calendar/sync - Sync Google Calendar blocks

**Dependencies:**
- WorkOS credentials (need to set up in WorkOS dashboard)
- Google Calendar API credentials

#### 1.2 Activity Database Population
**Location:** `src/sql/activity-db.ts` (schema exists)

- [ ] Curate initial Indianapolis activities dataset
  - [ ] Fitness activities (gyms, walking groups, tai chi classes)
  - [ ] Arts & culture (museums, theaters, galleries)
  - [ ] Volunteering opportunities
  - [ ] Learning (community college, workshops)
  - [ ] Social groups
  - [ ] Hobbies & crafts
- [ ] Create data import script
- [ ] Add activity metadata (difficulty, cost, social_size, schedule)

**Goal:** 50-100 curated activities for MVP

### Phase 2: AI-Powered Features

#### 2.1 Activity Matcher Service
**Location:** `src/activity-matcher/index.ts`

- [ ] Implement recommendation algorithm
  - [ ] Query user profile and preferences from user-db
  - [ ] Query available activities from activity-db
  - [ ] Match based on: interests, physical limitations, schedule, social preferences
  - [ ] Use SmartSQL natural language queries for semantic matching
- [ ] POST /api/generate-plan endpoint
  - [ ] Generate personalized weekly activity schedule
  - [ ] Avoid calendar conflicts
  - [ ] Balance activity types (fitness/social/learning)
  - [ ] Store recommendations in user-db

#### 2.2 Conversational AI Service
**Location:** `src/conversational-ai/index.ts`

- [ ] Implement chat interface
  - [ ] SmartInference integration (Cerebral models)
  - [ ] SmartMemory integration for conversation context
  - [ ] System prompt with RetireWell persona
- [ ] POST /api/chat endpoint
  - [ ] Accept user messages
  - [ ] Maintain conversation history in conversation-memory
  - [ ] Query user profile and current recommendations for context
  - [ ] Generate helpful, empathetic responses
  - [ ] Suggest activities based on conversation

### Phase 3: Frontend Web Application

#### 3.1 Landing & Auth Pages
**Location:** `src/web-app/` (Next.js pages)

- [ ] Landing page (GET /)
  - [ ] Value proposition
  - [ ] Features overview
  - [ ] CTA to sign up
- [ ] Auth callback (GET /auth/callback)
  - [ ] Handle WorkOS OAuth redirect
  - [ ] Create user session
  - [ ] Redirect to dashboard

#### 3.2 User Dashboard
**Location:** `src/web-app/`

- [ ] Dashboard (GET /dashboard)
  - [ ] Display current week's activity plan
  - [ ] Activity cards with details (name, location, time, description)
  - [ ] Mark activities as completed
  - [ ] Request new recommendations
- [ ] Calendar view (GET /calendar)
  - [ ] Weekly/monthly calendar visualization
  - [ ] Show scheduled activities
  - [ ] Show blocked calendar times
  - [ ] Drag-and-drop to reschedule

#### 3.3 Profile & Settings
- [ ] Profile page (GET /profile)
  - [ ] Edit personal info (age, location)
  - [ ] Select interests/hobbies
  - [ ] Set physical limitations
  - [ ] Configure social preferences
  - [ ] Manage calendar sync
- [ ] Activity feedback (POST /api/activity/feedback)
  - [ ] Rate completed activities
  - [ ] Improve future recommendations

#### 3.4 AI Chat Interface
- [ ] Chat widget/page
  - [ ] Real-time messaging UI
  - [ ] Display conversation history from SmartMemory
  - [ ] Typing indicators
  - [ ] Activity suggestions inline

### Phase 4: Enhancements

#### 4.1 Activity Media
**Location:** `activity-media` SmartBucket

- [ ] Upload activity photos
- [ ] Semantic search for activities by description/image
- [ ] Display activity images in UI

#### 4.2 Social Features
- [ ] Friend connections
- [ ] Group activity recommendations
- [ ] Activity attendance lists
- [ ] Social feed of completed activities

#### 4.3 Analytics & Insights
- [ ] User engagement dashboard
- [ ] Activity participation tracking
- [ ] Recommendation accuracy metrics
- [ ] Weekly summary emails

## Technical Implementation Notes

### Authentication Flow
1. User clicks "Sign In" on landing page
2. Redirect to WorkOS AuthKit
3. User authenticates (Google OAuth or email/password)
4. WorkOS redirects to /auth/callback?code=...
5. Exchange code for user profile + access token
6. Create session, store in cookie
7. Create/update user in user-db
8. Redirect to /dashboard

### Recommendation Algorithm
1. Fetch user profile (interests, limitations, social preferences)
2. Fetch user's calendar blocks from user-db
3. Query activity-db for matching activities
4. Score activities based on:
   - Interest alignment (vector similarity if using embeddings)
   - Difficulty vs. physical capability
   - Social size preference
   - Schedule availability
   - Variety (don't over-recommend same category)
5. Generate balanced weekly schedule (2-3 activities)
6. Save to recommendations table with explanation

### Conversation Memory
- **Working Memory**: Current conversation session
- **Episodic Memory**: Past conversations, activity feedback
- **Semantic Memory**: User preferences, patterns learned over time

Use SmartMemory search to retrieve relevant context for each message.

## Environment Variables Needed

```bash
# WorkOS
WORKOS_API_KEY=
WORKOS_CLIENT_ID=

# Google Calendar API
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# App Config
APP_URL=https://svc-01k8r81ngamv5ny0gerqayh5dh.01k8eade5c6qxmxhttgr2hn2nz.lmapp.run
SESSION_SECRET=
```

## Testing Strategy

### Unit Tests
- User profile CRUD operations
- Activity matching algorithm
- Calendar conflict detection

### Integration Tests
- Auth flow end-to-end
- Recommendation generation with real DB
- AI chat with SmartInference

### Manual Testing
- Create test user accounts
- Test with various user profiles (different interests, limitations)
- Verify activity recommendations are appropriate
- Test calendar sync

## Deployment Process

1. Implement features in local environment
2. Test with `pnpm test`
3. Validate build with `raindrop build validate`
4. Deploy with `raindrop build deploy --amend --start`
5. Verify endpoints with curl/browser
6. Monitor logs with Raindrop CLI

## Success Metrics

**MVP Success:**
- User can sign up, create profile, and view dashboard
- System generates 2-3 personalized activity recommendations per week
- User can chat with AI and receive activity suggestions
- At least 5 beta users trying the system

**Full Launch:**
- 100+ active users in Indianapolis area
- 50+ activities in database across all categories
- 70%+ user satisfaction with recommendations
- Average 2+ activities completed per user per week

## Resources

- **Architecture Details**: `~/.raindrop/01k8nsy3r9e1fmqf02dnhn2nyt/architecture/`
- **API Specs**: `~/.raindrop/01k8nsy3r9e1fmqf02dnhn2nyt/specifications/api_definitions.md`
- **Full PRD**: `planning/PRD-retirewell.md`
- **Raindrop Docs**: https://docs.liquidmetal.ai

## Questions / Blockers

- [ ] Need WorkOS account setup
- [ ] Need Google Calendar API credentials
- [ ] Need to curate Indianapolis activities dataset
- [ ] Clarify AI model preferences for SmartInference

---

**Last Updated:** October 29, 2025
**Next Session:** Continue with Phase 1.1 - Authentication & User Management
