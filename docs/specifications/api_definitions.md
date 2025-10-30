# API Definitions

## POST /api/chat

### Request
```json
{
  "message": "I enjoy woodworking and history",
  "sessionId": "sess-abc123"
}
```

### Response
```json
{
  "reply": "That's great! Woodworking and history are wonderful interests. How would you describe your current mobility? For example, can you stand for long periods, or do you prefer activities that are less physically demanding?",
  "sessionId": "sess-abc123",
  "extractedData": {
    "interests": ["woodworking", "history"]
  }
}
```

### Validation
- message: required, string, max 2000 characters
- sessionId: optional, string, UUID format

## POST /api/generate-plan

### Request
```json
{
  "userId": "user-123",
  "startDate": "2025-11-01",
  "endDate": "2025-11-07"
}
```

### Response
```json
{
  "weeklyPlan": [
    {
      "activityId": "act-456",
      "name": "Woodshop Open Hours",
      "description": "Drop-in woodworking with tools provided",
      "when": "Tuesday, Nov 5, 10am-12pm",
      "where": "Central Library, Maker Lab",
      "difficulty": 2,
      "reasoning": "Based on your interest in woodworking and preference for hands-on activities",
      "category": "hobbies",
      "mapLink": "https://maps.google.com/?q=..."
    }
  ],
  "totalActivities": 6
}
```

### Validation
- userId: required, string, valid user ID
- startDate: required, ISO date string
- endDate: required, ISO date string
- Date range must be 7 days or less

## POST /api/activity/feedback

### Request
```json
{
  "recommendationId": "rec-789",
  "feedback": "liked",
  "notes": "Really enjoyed this activity"
}
```

### Response
```json
{
  "success": true,
  "message": "Feedback recorded"
}
```

### Validation
- recommendationId: required, string
- feedback: required, enum ("liked", "skipped", "completed")
- notes: optional, string, max 500 characters

## PUT /api/profile

### Request
```json
{
  "userId": "user-123",
  "updates": {
    "healthMobility": "medium",
    "interests": ["woodworking", "history", "volunteering"],
    "socialPreference": "small-groups"
  }
}
```

### Response
```json
{
  "success": true,
  "updatedProfile": {
    "userId": "user-123",
    "healthMobility": "medium",
    "interests": ["woodworking", "history", "volunteering"],
    "socialPreference": "small-groups"
  }
}
```

### Validation
- userId: required, string
- updates: required, object with at least one field
- healthMobility: optional, enum ("high", "medium", "low")
- interests: optional, array of strings
- socialPreference: optional, enum ("small-groups", "large-groups", "one-on-one", "solo")

## POST /api/calendar/sync

### Request
```json
{
  "userId": "user-123",
  "activityIds": ["act-456", "act-789"]
}
```

### Response
```json
{
  "success": true,
  "syncedCount": 2,
  "calendarEvents": [
    {
      "activityId": "act-456",
      "calendarEventId": "evt-google-123"
    }
  ]
}
```

### Validation
- userId: required, string
- activityIds: required, array of strings, max 20 items
