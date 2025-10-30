# Feature Specifications

## Feature List

| Feature | Description | Priority |
|---------|-------------|----------|
| Conversational AI Onboarding | Natural language profile creation through chat interface | High |
| AI Weekly Plan Generator | Generate 5-7 personalized activities based on user profile | High |
| Feedback Learning Loop | Collect likes/skips/completions and improve recommendations | High |
| Voice Input Support | Browser Web Speech API for hands-free chat interaction | High |
| User Profile Management | View and edit health, interests, schedule preferences | High |
| Calendar Availability | Add commitments and low-energy days to guide scheduling | High |
| Calendar Integration | Sync activities to Google Calendar with .ics export fallback | Medium |
| Activity Database | Browse 100-150 curated Indianapolis activities | High |
| Authentication | WorkOS email/password and Google social login | High |

## Acceptance Criteria

### Conversational AI Onboarding
- AI asks 5-10 targeted questions about health, interests, social preferences
- Extracts structured data from natural language responses
- Completes onboarding in one conversation session
- Shows editable profile summary before finalizing
- Alternative: Traditional form available for users who prefer it

### AI Weekly Plan Generator
- Generates 5-7 activities based on user profile
- Filters by mobility level and health constraints
- Respects calendar blocks (existing commitments, low-energy days)
- Balances activity types (fitness, learning, social, volunteering, hobbies)
- Explains WHY each activity was chosen
- Includes mix of evergreen and dated activities
- Each activity shows: name, description, when/where, difficulty, link

### Feedback Learning Loop
- "Like" button boosts similar activities in future
- "Skip" button reduces similar recommendations
- "Mark Complete" option tracks engagement
- AI asks clarifying questions when patterns emerge
- Recommendations measurably improve over time (less skips, more likes)

### Voice Input Support
- Mic button converts speech to text using browser Web Speech API
- Visual feedback: pulsing icon, "Listening..." indicator
- Falls back to keyboard if voice fails
- Works on desktop, tablet, mobile (where supported)

### User Profile Management
- Profile sections: Basic info, Health/Mobility, Interests, Social preferences, Time preferences, Calendar blocks
- Editable at any time through form interface
- Changes immediately reflected in future recommendations

### Calendar Availability
- Add recurring commitments (e.g., "Golf every Thursday 9am-12pm")
- Add one-time blocks (e.g., "Traveling Nov 10-15")
- Mark specific days as "low-energy" for gentler activity suggestions
- Conversational or form-based input options
- Recommendation engine filters out activities during blocked times

### Calendar Integration
- Calendar view shows weekly plan with date/time
- Select which activities to add to personal calendar
- One-way sync to Google Calendar (RetireWell → Google)
- Export as .ics file if API sync unavailable

### Activity Database
- 100-150 curated Indianapolis activities
- Categories: fitness, arts/culture, volunteering, learning, social, hobbies
- Each includes: name, description, location, schedule, difficulty, health requirements, cost, social size
- Sources: Libraries, community centers, rec departments, volunteer organizations
- Data accurate through January 2026

### Authentication
- WorkOS AuthKit integration
- Email/password + Google social login
- Secure session management
- Profile data persists across sessions
- Password reset functionality
