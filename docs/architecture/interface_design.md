# Interface Design

## HTTP Endpoints

| Endpoint | Method | Path | Auth Required |
|----------|--------|------|---------------|
| Landing Page | GET | / | No |
| Auth Callback | GET | /auth/callback | No |
| Dashboard | GET | /dashboard | Yes |
| Profile | GET | /profile | Yes |
| Calendar View | GET | /calendar | Yes |
| Chat API | POST | /api/chat | Yes |
| Generate Weekly Plan | POST | /api/generate-plan | Yes |
| Activity Feedback | POST | /api/activity/feedback | Yes |
| Update Profile | PUT | /api/profile | Yes |
| Get Activities | GET | /api/activities | Yes |
| Calendar Sync | POST | /api/calendar/sync | Yes |

## Authentication

- **Type**: WorkOS AuthKit
- **Methods**: Email/password, Google OAuth
- **Scope**: User profile, calendar access (Google Calendar API)
- **Sessions**: HTTP-only secure cookies

## Error Response Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side failure |
| 503 | Service Unavailable - Temporary outage |
