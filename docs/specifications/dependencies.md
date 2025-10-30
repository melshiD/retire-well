# Dependencies

## External Packages

| Package/Service | Version | Purpose |
|----------------|---------|---------|
| next | ^14.x | React framework for web application |
| react | ^18.x | UI library |
| tailwindcss | ^3.x | CSS utility framework |
| @workos-inc/authkit-nextjs | latest | WorkOS authentication integration |
| googleapis | ^118.x | Google Calendar API client |
| zod | ^3.x | Schema validation |
| @liquidmetal-ai/raindrop-framework | latest | Raindrop framework core |

## Raindrop Components

| Component | Purpose |
|-----------|---------|
| SmartInference (via AI) | Conversational AI, recommendation reasoning |
| SmartMemory | Conversation context, preference learning |
| SmartSQL | Database with natural language query support |
| SmartBuckets | Activity image storage with semantic search |

## External Services

| Service | Purpose |
|---------|---------|
| WorkOS | Authentication and user management |
| Google Calendar API | Calendar sync integration |
| Web Speech API | Browser-based voice input |

## Required Credentials

- WORKOS_API_KEY: WorkOS authentication
- WORKOS_CLIENT_ID: WorkOS application identifier
- GOOGLE_CALENDAR_CLIENT_ID: Google Calendar OAuth
- GOOGLE_CALENDAR_CLIENT_SECRET: Google Calendar OAuth secret
- SESSION_SECRET: Session encryption key
