# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Nox Neon Lights** is a React-based cyberpunk-themed neon lighting e-commerce website built with modern web technologies. The application features a dark, futuristic aesthetic with neon glows, animations, and immersive cyberpunk styling.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Testing Individual Components
- Test single component: `npm run dev` then navigate to the specific route
- Routes available: `/` (Home), `/collection`, `/about`, `/cart`, `/product/:id`

## Technology Stack & Architecture

### Core Technologies
- **React 19.1.1** with modern hooks and functional components
- **Vite 7.1.2** for fast development and optimized builds
- **React Router 6.30.1** for client-side routing with page transitions
- **Framer Motion 12.23.12** for animations and page transitions
- **Tailwind CSS 4.1.13** with extensive cyberpunk-themed customizations

### Styling Architecture
The application uses a comprehensive cyberpunk design system:

#### Custom Tailwind Configuration
- **Neon Colors**: `neon-orange` (#ff6600), `neon-red` (#ff0044), `neon-yellow` (#ffcc00), `neon-cyan` (#00ffff)
- **Fonts**: Orbitron (primary), Audiowide (headers) - both loaded from Google Fonts
- **Custom Utilities**: `.text-neon`, `.text-neon-sm`, `.text-neon-lg` for glow effects
- **Animations**: `glow-pulse`, `pulse-neon` for dynamic neon lighting effects
- **Shadow System**: `shadow-neon`, `shadow-neon-sm`, `shadow-neon-lg` for consistent glow shadows

#### Key CSS Classes
- `.cyberpunk-bg` - Gradient background for the dark theme
- `.cyberpunk-card` - Glass-morphism cards with neon borders
- `.neon-border` - Glowing borders that match text color

### Component Architecture

#### Core Structure
```
src/
├── App.jsx              # Main app with routing and page transitions
├── main.jsx            # React 19 StrictMode entry point
├── index.css           # Global styles and Tailwind imports
├── components/
│   ├── Navbar.jsx      # Fixed navigation with mobile responsiveness
│   └── PageTransition.jsx # Framer Motion page transitions
└── pages/
    ├── Home.jsx        # Hero section with animated neon elements
    ├── Collection.jsx  # Product grid with filtering
    ├── Product.jsx     # Individual product details
    ├── About.jsx       # Company information
    └── Cart.jsx        # Shopping cart functionality
```

#### Page Transition System
All page navigation uses Framer Motion's `AnimatePresence` with consistent fade/slide transitions. The `PageTransition` component wraps all routes and is controlled by React Router's location changes.

#### Animation Patterns
- **Hero animations**: Scale/fade effects with stagger delays
- **Scroll animations**: `whileInView` with `viewport={{ once: true }}`
- **Hover effects**: Scale transforms and glow intensification
- **Background elements**: Floating neon bars with infinite animation loops

## Development Guidelines

### Component Development
- All components use functional React with hooks
- Motion components from Framer Motion for animations
- Consistent use of the neon color system
- Mobile-first responsive design approach

### Styling Guidelines
- Use Tailwind's neon color classes: `text-neon-cyan`, `bg-neon-orange`, etc.
- Apply glow effects with `text-neon` utilities and `shadow-neon` classes
- Maintain cyberpunk aesthetic with dark backgrounds and neon accents
- Use `font-orbitron` for body text, `font-audiowide` for headers

### Animation Guidelines
- Page transitions are handled automatically by the routing system
- Use `motion.div` for scroll animations with `whileInView`
- Implement stagger animations for lists using `staggerChildren`
- Floating elements should use infinite loops with `ease: "easeInOut"`

### File Organization
- Components: Reusable UI elements in `src/components/`
- Pages: Route-level components in `src/pages/`
- Each page handles its own animations and state management
- Global styles and utilities in `src/index.css`

## Key Features to Maintain

### Responsive Design
- Mobile-first approach with hamburger menu for small screens
- Consistent neon theming across all breakpoints
- Touch-friendly interactions on mobile devices

### Performance Considerations
- Vite handles asset optimization and code splitting
- Framer Motion animations are GPU-accelerated
- Images use placeholder API endpoints (`/api/placeholder/400/300`)

### ESLint Configuration
- Modern ESLint 9.33.0 with React-specific rules
- React Hooks and React Refresh plugins enabled
- Custom rule: unused vars ignored if they match capital letter pattern (for constants)

When working with this codebase, maintain the cyberpunk aesthetic, ensure all new components follow the established animation patterns, and use the custom Tailwind utilities for consistent neon effects throughout the application.
