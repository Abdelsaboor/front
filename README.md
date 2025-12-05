# Voice of Silence - Cinematic 3D Product Launch

> A flagship-quality, scroll-driven product launch experience showcasing gesture recognition technology through cinematic 3D storytelling.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.181-000000)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02)](https://greensock.com/gsap/)

## 🎯 Project Vision

This project delivers an **Apple Vision Pro-quality** web experience that transforms gesture recognition technology into a compelling narrative through:

- **Cinematic 3D storytelling** with scroll-driven camera movements
- **Premium visual polish** with three-point lighting and post-processing
- **Performance-first architecture** with WebGL capability detection
- **Production-ready codebase** built for scale and maintainability

**Target Audience:** Flagship product launches, high-fidelity marketing experiences, creative technology showcases.

---

## 🏗️ Architecture Overview

### High-Level Structure

```
src/
├── 3d/                    # 3D rendering system (isolated from UI)
│   ├── controllers/       # Camera, animation controllers
│   ├── systems/          # Lighting, WebGL detection, performance
│   ├── models/           # 3D model loaders and configurations
│   └── materials/        # Material definitions and shaders
├── scenes/               # Scroll-driven scene components
├── components/           # UI overlays (nav, footer, text)
├── hooks/                # Reusable React hooks
├── utils/                # Helper functions, easing curves
├── types/                # TypeScript type definitions
├── config/               # Scene configuration, constants
└── styles/               # Global styles, CSS modules
```

### Core Principles

1. **Separation of Concerns**: 3D logic ≠ UI logic
2. **Declarative Configuration**: Scenes defined in `config/scenes.config.ts`
3. **Type Safety**: Strict TypeScript, zero `any` types
4. **Performance First**: WebGL detection, lazy loading, optimized assets
5. **Maintainability**: Documented decisions, modular architecture

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Modern browser** with WebGL 2 support
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd front

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies

### Core Framework
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server

### 3D Rendering
- **Three.js 0.181** - WebGL rendering engine
- **@react-three/fiber 9.4** - React renderer for Three.js
- **@react-three/drei 10.7** - Useful Three.js helpers
- **@react-three/postprocessing 3.0** - Post-processing effects

### Animation
- **GSAP 3.13** - Professional animation library
- **@gsap/react 2.1** - React integration for GSAP

### State & Utilities
- **Zustand 5.0** - Lightweight state management
- **Leva 0.10** - Development controls (dev only)

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 🎨 Adding 3D Assets

### GLB Model Workflow

1. **Prepare Model**
   - Export from Blender/Maya as `.glb` (binary GLTF)
   - Target: <5MB file size, <50k polygons
   - Include only necessary materials

2. **Optimize**
   ```bash
   # Use gltf-pipeline for compression
   npx gltf-pipeline -i model.glb -o model-optimized.glb -d
   ```

3. **Add to Project**
   ```
   public/
   └── models/
       └── your-model.glb
   ```

4. **Load in Code**
   ```typescript
   import { useGLTF } from '@react-three/drei';
   
   const model = useGLTF('/models/your-model.glb');
   ```

### Texture Guidelines

- **Format**: WebP or compressed JPEG
- **Size**: Power of 2 (512, 1024, 2048)
- **Compression**: Use tools like Squoosh or TinyPNG
- **Location**: `public/textures/`

---

## 📐 Coding Conventions

### TypeScript

- **Strict mode enabled** - No `any` types
- **Explicit return types** for public functions
- **Interface over type** for object shapes
- **Path aliases** - Use `@/` instead of `../../`

### React

- **Functional components** with hooks
- **Named exports** for components
- **Props interfaces** defined inline or separately
- **Memo** for expensive components only

### 3D Code

- **Separate concerns** - Controllers vs. rendering
- **Document decisions** - Why, not just what
- **Named constants** - No magic numbers
- **Performance comments** - Explain optimizations

### File Naming

- **Components**: `PascalCase.tsx`
- **Hooks**: `use*.ts`
- **Utils**: `camelCase.ts`
- **Types**: `*.types.ts`
- **Config**: `*.config.ts`

### Code Style

```bash
# Format all files
npm run format

# Lint and fix
npm run lint:fix
```

---

## 🤝 Contribution Guidelines

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Code improvements

### Pull Request Process

1. **Create feature branch** from `develop`
2. **Write descriptive commits** (conventional commits preferred)
3. **Test locally** - Ensure no errors
4. **Run linting** - `npm run lint`
5. **Update documentation** if needed
6. **Submit PR** with clear description

### Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] Performance impact considered
- [ ] Documentation updated
- [ ] Follows coding conventions
- [ ] Tested on multiple browsers

---

## 🎬 Scene System

### How Scenes Work

Scenes are defined declaratively in `src/config/scenes.config.ts`:

```typescript
{
  id: 'hero',
  scrollStart: 0,      // 0% scroll
  scrollEnd: 0.2,      // 20% scroll
  camera: {
    start: { position: [0, 0, 5], rotation: [0, 0, 0] },
    end: { position: [0, 0, 5], rotation: [0, 0, 0] }
  },
  easing: 'power1.inOut',
  description: 'Static establishing shot'
}
```

### Adding a New Scene

1. **Define in config** - Add to `SCENE_TIMELINE`
2. **Create scene component** - `src/scenes/YourScene.tsx`
3. **Add to scroll container** - Import in `App.tsx`
4. **Test scroll ranges** - Verify transitions

---

## 🔧 Development Tools

### Leva Controls (Dev Only)

Development controls are available in the top-right corner:

- Camera position/rotation
- Lighting intensity
- Animation speed
- Scene debugging

### Performance Monitoring

```typescript
import { Perf } from 'r3f-perf';

// Add to Canvas in development
{process.env.NODE_ENV === 'development' && <Perf />}
```

---

## 🌐 Browser Support

### Recommended

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 15+

### Fallback Behavior

- **No WebGL 2**: Simplified 3D or static fallback
- **Low-end GPU**: Reduced quality settings
- **Mobile**: Optimized experience with fewer effects

---

## 📊 Performance Targets

- **Desktop**: 60 FPS sustained
- **Tablet**: 30-60 FPS
- **Mobile**: 30 FPS minimum
- **Initial Load**: <3s on 3G
- **Bundle Size**: <500KB (gzipped)

---

## 📝 License

[Your License Here]

---

## 🙏 Acknowledgments

- **Three.js** community for excellent documentation
- **GSAP** for professional animation tools
- **React Three Fiber** for React integration
- Design inspiration from Apple, Stripe, and Vercel

---

**Built with ❤️ for flagship product experiences**

For questions or issues, please open a GitHub issue or contact the maintainers.
