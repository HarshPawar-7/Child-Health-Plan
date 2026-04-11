# Poshan AI - Child Health & Nutrition Assistant

> A comprehensive full-stack healthcare application designed to assess child nutrition status and generate personalized, culturally-appropriate health improvement plans for underserved communities.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.0-90c53f?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql)](https://www.postgresql.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

Poshan AI is a full-stack healthcare platform built with modern web technologies that helps NGOs, healthcare workers, and families assess child nutrition status and receive actionable, culturally-sensitive health recommendations.

**Key Features:**
- 📋 **Comprehensive Assessment Form** - Collect child health metrics (age, weight, height, meals, vaccination status, socioeconomic factors)
- 🎯 **Risk Assessment Engine** - Classify nutrition risk levels (Low, Moderate, High) based on health parameters
- 🍽️ **Personalized Diet Plans** - Generate culturally appropriate meal recommendations in local languages
- 🏥 **Government Scheme Guidance** - Connect families to available support programs (POSHAN Abhiyaan, Anganwadi Services)
- 📊 **Health Tracking** - Monitor child development with periodic weight and height check-ups
- 🔐 **Type-Safe Architecture** - End-to-end TypeScript for robust, maintainable code

## 🏗️ Architecture

This is a **monorepo** with clear separation of concerns:

```
Child-Health-Plan/
├── client/              # React frontend application
│   └── src/
│       ├── components/ui/   # 60+ Radix UI based components
│       ├── pages/           # Page-level components
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utilities, query client
│       └── assets/          # Images and static files
├── server/              # Express backend API
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database abstraction layer
│   ├── index.ts         # Server entry point
│   └── services/        # Business logic (to be implemented)
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle ORM definitions + Zod validation
└── script/              # Build and deployment scripts
```

## 🛠️ Technology Stack

### Frontend
- **React 19.2** - UI framework with latest features
- **TypeScript 5.6** - Type-safe development
- **Vite 5.0** - Lightning-fast build tool with HMR
- **TailwindCSS 4.1** - Utility-first styling
- **Radix UI** - Unstyled, accessible component primitives
- **React Hook Form 7.66** - Performant form state management
- **Zod 3.25** - Runtime schema validation
- **TanStack React Query 5.60** - Server state management
- **Wouter** - Lightweight client-side routing
- **Lucide React** - 500+ customizable icons

### Backend
- **Express 5.0** - Minimal web framework
- **PostgreSQL** - Relational database
- **Drizzle ORM 0.39** - Type-safe database queries
- **Passport.js 0.7** - Authentication strategies
- **Express Session 1.18** - Session management
- **WebSocket (ws)** - Real-time communication

### DevTools
- **TypeScript** - Strict type checking
- **esbuild** - Fast server bundling
- **tsx** - TypeScript execution for Node.js
- **Drizzle Kit** - Database migrations

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn** package manager
- **PostgreSQL** 14+ (for production)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Child-Health-Plan.git
   cd Child-Health-Plan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/child_health
   NODE_ENV=development
   PORT=5000
   ```

4. **Set up database** (if using PostgreSQL)
   ```bash
   npm run db:push
   npm run db:seed  # Optional: load sample data
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Building for Production

```bash
# Build both client and server
npm run build

# Preview production build
npm run preview

# Start production server
npm run start
```

## 📁 Project Structure Details

### Client `client/src/`

#### Components (`components/ui/`)
Rich library of accessible Radix UI based components:
- Form components: `Input`, `Select`, `Checkbox`, `RadioGroup`, `Field`
- Layout: `Card`, `Sheet`, `Dialog`, `Drawer`, `Sidebar`
- Data display: `Table`, `Pagination`, `Carousel`, `Tabs`
- Feedback: `Alert`, `Toast`, `Spinner`, `Progress`
- Navigation: `Breadcrumb`, `NavigationMenu`, `Menubar`
- **Total: 60+ production-ready components**

#### Pages
- `Home.tsx` - Main assessment form and results display
- `not-found.tsx` - 404 error page

#### Hooks
- `use-mobile.tsx` - Detect mobile device
- `use-toast.ts` - Toast notification system

#### Utilities (`lib/`)
- `queryClient.ts` - TanStack React Query configuration
- `utils.ts` - Helper functions (e.g., `cn()` for Tailwind class merging)

### Server `server/`

- **`index.ts`** - Express app setup, middleware, logging
- **`routes.ts`** - API endpoint definitions (currently empty - ready for implementation)
- **`storage.ts`** - Abstract `IStorage` interface with `MemStorage` implementation
- **`vite.ts`** - Vite dev server integration
- **`static.ts`** - Static file serving configuration

### Shared `shared/`

- **`schema.ts`** - Drizzle ORM table definitions + Zod validation schemas
  - `users` table - User authentication
  - `insertUserSchema` - Zod schema for user creation

## 🔄 Data Flow

```
User Input Form (React)
        ↓
[Zod Client-Side Validation]
        ↓
API Request (React Query)
        ↓
Express Route Handler
        ↓
Business Logic (Risk Calculation, Diet Plan Generation)
        ↓
Database Query (Drizzle ORM)
        ↓
JSON Response
        ↓
Display Results (React Component)
```

## 📋 Key Features Explained

### 1. Health Assessment
Users input child's health metrics across multiple dimensions:
- **Biometric Data**: Age, weight, height (calculates BMI)
- **Nutrition**: Daily meal frequency, meal quality
- **Socioeconomic**: Household income level
- **Vaccination**: Immunization status

### 2. Risk Assessment Engine
Evaluates nutrition status through heuristic scoring:
```
Risk Level = function(weight, age, meals, income)
├── Low Risk: Child within healthy growth range
├── Moderate Risk: Mild undernutrition detected
└── High Risk: Severe undernutrition requiring intervention
```

### 3. Personalized Recommendations

Based on risk level, generates:
- **Diet Plans**: 4 culturally-appropriate meals per day with local foods
- **Health Steps**: Practical nutrition improvements
- **Scheme Access**: Links to government support programs
- **Hygiene Guidance**: Preventive health practices
- **Monitoring Schedule**: Check-up frequency and targets

### 4. Culturally Sensitive Content
- Recommendations use local Indian foods (Khichdi, Dalia, Ragi, etc.)
- Respects dietary preferences and availability
- Includes government nutrition programs (POSHAN, Anganwadi)
- Written in supportive, encouraging tone

## 🔐 Security & Type Safety

- **Strict TypeScript**: No `any` types, strict mode enabled
- **Runtime Validation**: Zod schemas for all user inputs
- **Prepared Statements**: Drizzle ORM prevents SQL injection
- **CORS Protection**: Configured at server level
- **Session Management**: Encrypted session cookies
- **Input Sanitization**: All form inputs validated before processing

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend Form | ✅ Complete | Assessment form fully functional |
| Database Schema | ✅ Complete | Drizzle ORM setup, migrations ready |
| Storage Layer | ✅ Complete | Abstract interface, in-memory implementation |
| API Routes | 🟡 Skeleton | Ready for endpoint implementation |
| Business Logic | 🟡 Client-side | Health calculation needs migration to server |
| Authentication | 🟡 Configured | Passport setup, routes pending |
| Error Handling | ❌ Incomplete | Error boundaries, validation needed |
| Testing | ❌ Not Started | Unit & E2E tests needed |
| Database Integration | 🟡 Pending | ORM ready, actual DB connection needed |

## 🚧 Roadmap

### Phase 1: MVP (Weeks 1-2)
- [ ] Implement core API routes (`/api/assessment`)
- [ ] Connect frontend form to backend API
- [ ] Replace mock calculations with server-side logic
- [ ] Add error handling and validation

### Phase 2: Enhancement (Weeks 3-4)
- [ ] Database integration with PostgreSQL
- [ ] User authentication (Passport + sessions)
- [ ] Assessment history tracking
- [ ] Admin dashboard for data insights

### Phase 3: Production (Weeks 5-6)
- [ ] Comprehensive test coverage (unit + E2E)
- [ ] Performance optimization
- [ ] Deployment setup (Docker, CI/CD)
- [ ] Monitoring and logging

### Phase 4: Advanced Features (Future)
- [ ] ML-based risk prediction
- [ ] Multi-language support
- [ ] Offline-first PWA capabilities
- [ ] Mobile app (React Native)
- [ ] Community/NGO collaboration features

## 👥 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Add Zod schemas for new data structures
- Write tests for business logic
- Use Tailwind CSS for styling
- Keep components focused and reusable

## 🐛 Known Issues & Limitations

1. **Server Routes Empty** - Core API endpoints need implementation
2. **Mock Async Operations** - Form submission simulates 2.5s delay
3. **In-Memory Storage** - Using `MemStorage`, no database persistence
4. **No Error Boundaries** - Missing error fallbacks in React
5. **Client-Side Calculations** - Risk assessment should move to server
6. **No Authentication Flow** - Login/registration not implemented

See [CLEAN_CODE_ANALYSIS.md](./CLEAN_CODE_ANALYSIS.md) for detailed code quality review and refactoring recommendations.

## 📚 Documentation

- [Clean Code Analysis](./CLEAN_CODE_ANALYSIS.md) - Code quality review with improvement recommendations
- [Component Library Guide](./components.json) - UI component documentation
- [API Documentation](./docs/API.md) - *(To be created)* API endpoint specifications
- [Database Schema](./drizzle.config.ts) - ORM configuration and table definitions

## 🎓 Learning Resources

This project demonstrates:
- ✅ React 19 with Hooks best practices
- ✅ Type-safe full-stack TypeScript development
- ✅ Monorepo organization patterns
- ✅ Zod schema validation at runtime
- ✅ Drizzle ORM type inference
- ✅ TanStack React Query patterns
- ✅ Component composition with Radix UI
- ✅ Express middleware and routing

Perfect for learning modern web development architecture!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For questions or support:
- 📧 Email: support@poshanai.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/Child-Health-Plan/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/Child-Health-Plan/discussions)

## 🙏 Acknowledgments

- **Radix UI** - For excellent accessible component primitives
- **TanStack** - For React Query and community tools
- **Drizzle Team** - For type-safe ORM experience
- **NGO Partners** - For healthcare domain expertise and feedback
- **Community Contributors** - For improvements and bug reports

---

**Built with ❤️ for child health and nutrition**

Last Updated: April 11, 2026
Repository: [GitHub Link](https://github.com/yourusername/Child-Health-Plan)
