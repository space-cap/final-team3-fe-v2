# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React + Vite application with TailwindCSS for styling. The project is named "final-team3-fe-v2" and appears to be a frontend project for a team collaboration. It uses React 19 with modern tooling.

## Development Commands
- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production using Vite
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Technology Stack
- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.6
- **Styling**: TailwindCSS 4.1.13 with Vite plugin
- **Linting**: ESLint 9.35.0 with React hooks and refresh plugins
- **Language**: JavaScript (JSX)

## Project Structure
```
src/
├── main.jsx          # Application entry point
├── App.jsx           # Main App component
├── App.css           # Component-specific styles
├── index.css         # Global styles with TailwindCSS import
└── assets/           # Static assets
```

## Code Conventions
- Uses modern ESLint configuration with React hooks and refresh plugins
- Custom rule: `no-unused-vars` with pattern `^[A-Z_]` for constants
- Follows React 19 patterns with StrictMode enabled
- TailwindCSS utility classes for styling
- Korean comments in CSS indicate international team

## Key Configuration Details
- **Vite Config**: Uses React plugin and TailwindCSS Vite plugin
- **ESLint**: Configured for modern JavaScript/JSX with browser globals
- **TailwindCSS**: Imported via CSS with custom global styles for Inter font
- **Entry Point**: `src/main.jsx` renders App component into `#root` div

## Current State
The application displays "Tailwind is working!" message, indicating it's in initial setup phase with TailwindCSS properly configured and functional.