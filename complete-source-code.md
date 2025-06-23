
# Glam IQ - Complete Source Code

This is the complete source code for the Glam IQ application, an AI-powered beauty companion for personalized makeup analysis.

## Project Structure

```
src/
├── components/
│   ├── ui/                          # Shadcn UI components
│   ├── AnalysisLoading.tsx         # Loading component for analysis
│   ├── AnalysisSummary.tsx         # Analysis results summary
│   ├── AnalyzeTabContent.tsx       # Analyze tab content component
│   ├── AppHeader.tsx               # Main app header
│   ├── BackgroundElements.tsx      # Background decorative elements
│   ├── BeautyReport.tsx            # Beauty analysis report
│   ├── BrandSelector.tsx           # Brand selection component
│   ├── CameraCapture.tsx           # Camera capture functionality
│   ├── CommunityFeedback.tsx       # Community feedback features
│   ├── ContextAwareRecommendations.tsx # Context-based recommendations
│   ├── CustomTabsList.tsx          # Custom tabs navigation
│   ├── EnhancedMakeupAnalysis.tsx  # Enhanced analysis component
│   ├── FaceFramingGuide.tsx        # Face framing guide
│   ├── FacialLandmarkDetector.tsx  # Facial landmark detection
│   ├── GlowUpChallenge.tsx         # Glow up challenge component
│   ├── HeroSection.tsx             # Hero section component
│   ├── HowItWorks.tsx              # How it works explanation
│   ├── LoadingScreen.tsx           # App loading screen
│   ├── MakeupAnalysis.tsx          # Makeup analysis component
│   ├── MakeupSelector.tsx          # Makeup product selector
│   ├── OnboardingTutorial.tsx      # User onboarding tutorial
│   ├── PremiumFeatures.tsx         # Premium features showcase
│   ├── ProductCard.tsx             # Product display card
│   ├── ProductFilters.tsx          # Product filtering
│   ├── SavedLooks.tsx              # Saved looks management
│   ├── SavedTabContent.tsx         # Saved tab content component
│   ├── SkincareRecommendations.tsx # Skincare recommendations
│   ├── SocialSharing.tsx           # Social sharing features
│   └── VirtualTryOn.tsx            # Virtual try-on functionality
├── contexts/
│   └── AuthContext.tsx             # Authentication context
├── hooks/
│   ├── use-mobile.tsx              # Mobile detection hook
│   └── use-toast.ts                # Toast notifications hook
├── integrations/
│   └── supabase/                   # Supabase integration
├── lib/
│   └── utils.ts                    # Utility functions
├── pages/
│   ├── Auth.tsx                    # Authentication page
│   ├── Index.tsx                   # Main application page
│   └── NotFound.tsx                # 404 page
├── types/
│   └── index.ts                    # TypeScript type definitions
├── utils/
│   └── makeupOverlayUtils.ts       # Makeup overlay utilities
└── App.tsx                         # Root application component
```

## Key Features

### 1. AI-Powered Makeup Analysis
- Real-time facial analysis using advanced AI
- Skin tone and undertone detection
- Personalized product recommendations
- Face shape analysis

### 2. Virtual Try-On
- Live makeup application preview
- Multiple product combinations
- Real-time rendering

### 3. Brand Integration
- Support for multiple beauty brands
- Tier-based product filtering
- Price range selection

### 4. Social Features
- Save and share makeup looks
- Community feedback
- Social media integration

### 5. Context-Aware Recommendations
- Time-of-day appropriate looks
- Seasonal recommendations
- Occasion-based suggestions

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context + Hooks
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation

## Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for Supabase
4. Run development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build & Deployment

- Development: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

The application is fully responsive and optimized for both desktop and mobile devices.

## Key Components Overview

### Index.tsx (Main Page)
The main application page has been refactored into smaller components:
- Uses custom hooks for state management
- Implements tab-based navigation
- Handles user authentication flow
- Manages photo capture and analysis workflow

### Authentication
- Supabase-based authentication
- Support for email/password and social logins
- Protected routes for saved looks

### Makeup Analysis
- AI-powered facial feature detection
- Real-time skin tone analysis
- Personalized product recommendations
- Integration with virtual try-on

### Data Models

#### Product Interface
```typescript
interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  price: string;
  description: string;
}
```

#### SavedLook Interface
```typescript
interface SavedLook {
  id: string;
  name: string;
  date: string;
  products: Product[];
}
```

This application provides a comprehensive beauty analysis platform with modern web technologies and a focus on user experience and performance.
