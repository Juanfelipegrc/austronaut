# Austronaut

**Austronaut** is an artificial intelligence chat application inspired by ChatGPT, focused on delivering a clean and dynamic conversation experience. Built with React, styled using Tailwind CSS, and powered by Firebase, it provides authentication, state persistence, and markdown-rendered responses using Prism-based syntax highlighting.

## Features

- Conversational AI: Simple and responsive chat interface powered by AI.
- Firebase Authentication: Secure login using Google or email.
- Live Markdown Rendering: Responses are formatted using `@uiw/react-markdown-preview` with Prism.js highlighting.
- Animated UI: Smooth transitions and motion using `framer-motion` and `animate.css`.
- Redux Global State: App-wide state management using `@reduxjs/toolkit` and `react-redux`.
- Responsive UI: Styled with Tailwind CSS and built mobile-first.
- Form Handling: Easy and validated form flows using `formik` and `yup`.
- Sidebar Navigation: Responsive burger menu for mobile/desktop.

## Technologies

### Main Dependencies

- React (`^19.0.0`)
- React DOM (`^19.0.0`)
- @reduxjs/toolkit (`^2.5.1`)
- React Redux (`^9.2.0`)
- Firebase (`^11.3.1`)
- Framer Motion (`^12.4.2`)
- Tailwind CSS (`^4.0.6`)
- @uiw/react-markdown-preview (`^5.1.4`) – for Markdown rendering with Prism.js highlighting
- Formik (`^2.4.6`)
- Yup (`^1.6.1`)
- Axios (`^1.7.9`)
- React Router DOM (`^7.1.5`)
- React Burger Menu (`^3.1.0`)
- Animate.css (`^4.1.1`)

### Development Dependencies

- Vite (`^6.1.0`)
- @vitejs/plugin-react (`^4.3.4`)
- ESLint (`^9.19.0`)
- @eslint/js (`^9.19.0`)
- eslint-plugin-react, react-hooks, react-refresh
- @types/react (`^19.0.8`)
- @types/react-dom (`^19.0.3`)
- Globals (`^15.14.0`)

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- Yarn (Install: `npm install -g yarn`)
- Optional: A Firebase project if you want full auth/database integration

### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/juanfelipegrc/austronaut.git
   cd austronaut
