# Component Design

## Component Inventory

| Name | Type | Visibility | Purpose |
|------|------|------------|---------|
| web-app | service | public | Next.js web application frontend and API routes |
| conversational-ai | service | private | AI conversation handling, profile building, recommendations |
| activity-matcher | service | private | Recommendation engine for matching users to activities |
| user-db | smartsql | - | User profiles, preferences, feedback, calendar blocks |
| activity-db | smartsql | - | Curated Indianapolis activities database |
| conversation-memory | smartmemory | - | Conversation context and user preference learning |
| activity-media | smartbucket | - | Activity promotional images and content |

## Component Responsibilities

### web-app (service, public)
Next.js application serving frontend UI and API routes. Handles authentication via WorkOS, renders pages, provides REST API endpoints for chat, activity generation, feedback, and profile management.

### conversational-ai (service, private)
Manages AI conversations using SmartInference for natural language understanding. Extracts structured profile data from conversations, maintains conversation context via SmartMemory, handles voice input transcription processing.

### activity-matcher (service, private)
Recommendation engine that matches user profiles to activities. Filters by health constraints and calendar availability, balances activity types, generates explanations for recommendations, learns from user feedback patterns.

### user-db (smartsql)
Stores user profiles (health, interests, social preferences), calendar blocks (commitments, low-energy days), activity feedback (likes, skips, completions), conversation logs for debugging.

### activity-db (smartsql)
Contains curated Indianapolis activities with categories, locations, schedules, difficulty levels, health requirements, social size, cost information.

### conversation-memory (smartmemory)
Working memory for active conversation sessions, episodic memory of past interactions, semantic memory of user preferences and patterns, procedural memory for conversation templates.

### activity-media (smartbuckets)
Stores activity promotional images with semantic search capabilities, enables image-based activity discovery, supports content retrieval for activity cards.

## Inter-Component Communication

- web-app → env.CONVERSATIONAL_AI.handleChat()
- web-app → env.ACTIVITY_MATCHER.generateWeeklyPlan()
- conversational-ai → env.CONVERSATION_MEMORY.putMemory()
- conversational-ai → env.USER_DB.executeQuery()
- activity-matcher → env.ACTIVITY_DB.executeQuery()
- activity-matcher → env.USER_DB.executeQuery()
- activity-matcher → env.CONVERSATION_MEMORY.searchMemory()
- web-app → env.ACTIVITY_MEDIA.search()

## File Structure Per Component

### web-app (Next.js structure)
- app/layout.tsx
- app/page.tsx (landing)
- app/dashboard/page.tsx
- app/profile/page.tsx
- app/calendar/page.tsx
- app/api/chat/route.ts
- app/api/generate-plan/route.ts
- app/api/activity/feedback/route.ts
- app/api/profile/route.ts
- components/ChatInterface.tsx
- components/ActivityCard.tsx
- components/CalendarView.tsx
- lib/workos.ts
- lib/types.ts

### conversational-ai
- index.ts (entry point, fetch handler)
- interfaces.ts (type definitions, schemas)
- utils.ts (AI prompts, data extraction)

### activity-matcher
- index.ts (entry point, fetch handler)
- interfaces.ts (type definitions, schemas)
- utils.ts (matching algorithm, filtering logic)
