# Plant Website

A modern e-commerce platform for plant enthusiasts, built with React, TypeScript, and Vite.

## Features

- Responsive design using Tailwind CSS
- Product browsing and filtering
- Shopping cart functionality
- Category-based navigation
- About and contact pages

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS
- Context API for state management

## Project Structure

```
src/
├── assets/       # Images and static resources
├── components/   # Reusable UI components
├── context/      # React Context for state management
├── pages/        # Main application pages
├── services/     # API services and utilities
└── App.tsx       # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd plantwebsite
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run tailwind` - Process Tailwind CSS

## License

[MIT](LICENSE)
