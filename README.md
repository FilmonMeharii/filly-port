# Filly Portfolio

A modern, responsive personal portfolio website built with React. Showcasing projects, skills, experience, and providing direct contact options through integrated social links and contact form.

## Features

### 🎯 Core Sections
- **Header/Navigation** - Hero introduction with profile photo, TryHackMe badge, LinkedIn integration, and smooth navigation
- **About** - Professional overview with terminal-style design and call-to-action buttons
- **Projects** - Interactive project showcase with lightbox gallery for (AI, Business, Cyber, Thesis projects)
- **Skills** - Unified skills section highlighting Cybersecurity & Cloud, and Software & AI competencies
- **Timeline** - Professional experience and education history with visible date tracking
- **Contact** - Direct messaging form with chatbot integration
- **Footer** - Quick links and social connections

### 🎨 Design & Accessibility
- Light/Dark mode toggle with persistent theme preference
- Responsive design optimized for mobile, tablet, and desktop
- Cross-browser compatibility (Chrome, Safari, Firefox)
- Smooth hash-link navigation with scroll-to-top functionality
- Accessible color contrast in both themes

### 🔧 Technical Features
- Component-based React architecture
- Modularized CSS with organized styling structure
- Interactive skill chips with project filtering
- Modal project viewer with image gallery
- Theme system using CSS custom properties
- FontAwesome icon integration

## Technology Stack

- **Frontend**: React 18+
- **Styling**: CSS3 (Grid, Flexbox, Custom Properties)
- **Navigation**: React Router Hash Link
- **Icons**: FontAwesome
- **Build**: React Scripts / Webpack
- **Testing**: Jest

## Project Structure

```
filly-port/
├── src/
│   ├── components/
│   │   ├── Header.js              # Navigation & hero section
│   │   ├── About.js               # Professional overview
│   │   ├── Projects/              # Project showcase (modular)
│   │   ├── Skills.js              # Unified skills display
│   │   ├── Timeline.js            # Experience & education
│   │   ├── Contact.js             # Contact form
│   │   ├── Chatbot.js             # Chat integration
│   │   ├── Footer.js              # Footer links
│   │   └── CSS/                   # Modular stylesheets
│   ├── assets/                    # Project images & media
│   ├── App.js                     # Main app component
│   └── index.css                  # Global styles
├── public/                        # Static files
└── build/                         # Production build output
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
The page will reload when you make changes.

### Production Build
```bash
npm run build
```
Builds the app for production to the `build` folder.
Optimized and minified for deployment.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

### Deployment
```bash
npm run deploy
```
Deploys the production build to your hosting service.

## Recent Updates

### Header Restructuring
- Modularized Header.css into focused components (base, navigation, responsive)
- Enhanced navbar with right-aligned tabs and improved typography
- Added LinkedIn button integration
- Repositioned "Explore My Work" CTA with visual navigation cue
- Added Home navigation tab with anchor linking

### Skills Unification
- Consolidated multiple skill sections into a single unified container
- Maintained internal structure while ensuring visual consistency
- Improved responsive behavior on smaller screens

### Cross-Browser Compatibility
- Resolved all CSS compatibility warnings
- Ensured support for Chrome < 111, Safari < 15.4, and iOS browsers
- Optimized color and layout rendering across browsers

### Theme & Visibility
- Fixed text visibility issues in light mode
- Enhanced color contrast and readability
- Ensured proper theme-aware color transitions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Safari iOS 13+
- Edge 90+

## License

This project is a personal portfolio. All rights reserved.
