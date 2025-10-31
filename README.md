# RetireWell

AI-powered weekly activity planner for retirees in Indianapolis, helping combat social isolation through personalized activity recommendations.

## 🏆 Hackathon Project

**Built for:** [Devpost AI Championship 2025](https://liquidmetal.devpost.com/)
**Sponsor:** LiquidMetal.AI

This project leverages the Raindrop framework to demonstrate how AI can address real-world challenges in social isolation among retirees. RetireWell combines conversational AI, personalized recommendation algorithms, and smart data infrastructure to create a comprehensive activity planning platform.

**Key Innovation:** Multi-layered memory system that learns user preferences over time, providing increasingly personalized recommendations while maintaining contextual awareness across conversations.

## Current Status

**Infrastructure: ✅ DEPLOYED**
**Features: 🚧 STUB IMPLEMENTATION**

All Raindrop Smart Components are deployed and running, but services currently return placeholder responses. Ready for feature implementation.

## Deployed Application

**Live URL:** https://svc-01k8r81ngamv5ny0gerqayh5dh.01k8eade5c6qxmxhttgr2hn2nz.lmapp.run/

**Deployed Modules (10):**
- `web-app` - Public web service
- `conversational-ai` - Private AI chat service
- `activity-matcher` - Private matching algorithm service
- `user-db` - SmartSQL user database
- `activity-db` - SmartSQL activities database
- `conversation-memory` - SmartMemory for chat history
- `activity-media` - SmartBucket for media storage
- Plus 3 supporting modules (_mem, annotation-bucket, annotation-service)

## Architecture

**Services:**
- **web-app**: Frontend + API endpoints (public)
- **conversational-ai**: AI chat interface for users (private)
- **activity-matcher**: Personalized activity recommendation engine (private)

**Smart Components:**
- **user-db**: User profiles, preferences, calendar blocks, recommendations, conversation logs
- **activity-db**: Curated Indianapolis activities with metadata
- **conversation-memory**: Multi-layer memory for contextual AI conversations
- **activity-media**: Media storage for activity images/documents

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Raindrop CLI installed

### Important: WSL Users

This project **must** be run from the native Linux filesystem in WSL, not from `/mnt/c/`. The esbuild bundler has platform-specific binaries that conflict when using the Windows filesystem.

### Installation

```bash
# Clone and install
git clone https://github.com/melshiD/retire-well.git
cd retire-well
pnpm install
```

### Build & Test

```bash
# Type check and build
pnpm run build

# Run tests
pnpm test

# Lint
pnpm run lint

# Validate deployment locally
raindrop build validate
```

### Deployment

```bash
# Check current status
raindrop build status

# Deploy (amend existing deployment)
raindrop build deploy --amend --start

# Watch deployment progress
raindrop build status
```

## Project Structure

```
retire-well/
├── src/
│   ├── web-app/           # Public web service
│   ├── conversational-ai/  # AI chat service
│   ├── activity-matcher/   # Recommendation engine
│   ├── sql/                # Database schemas
│   │   ├── user-db.ts
│   │   └── activity-db.ts
│   ├── _app/               # Shared utilities (auth, cors)
│   └── shared/             # Shared types/utilities
├── planning/
│   └── PRD-retirewell.md  # Comprehensive product requirements
├── raindrop.manifest       # Infrastructure configuration
└── package.json
```

## Next Steps

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for the detailed implementation roadmap.

## Documentation

- **Full PRD**: `planning/PRD-retirewell.md` - Complete product requirements and architecture
- **Implementation Roadmap**: `IMPLEMENTATION.md` - Current status and next steps
- **Architecture Docs**: `docs/` - Detailed architecture and specifications

## Key Technologies

- **Runtime**: V8 edge runtime (Cloudflare Workers)
- **Framework**: Raindrop (LiquidMetal.AI)
- **Auth**: WorkOS AuthKit
- **AI**: SmartInference (Cerebral models via Raindrop)
- **Database**: SmartSQL (Cloudflare D1)
- **Memory**: SmartMemory (multi-layer memory system)
- **Storage**: SmartBucket (R2 with semantic search)

## License

MIT
