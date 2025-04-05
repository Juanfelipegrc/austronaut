# Austronaut

**Austronaut** is an artificial intelligence application designed as an alternative to ChatGPT, focused on offering a conversational chat experience without additional browsing or thought modes. Built with React and powered by Firebase for authentication and storage, Austronaut provides a modern and animated interface for interacting with an AI—perfect for users seeking simplicity and direct functionality.

## Features

- **Conversational chat:** Interact with an AI without complications, designed for fast and direct responses.
- **Firebase authentication:** Log in with Google or email to save your chats.
- **Animated interface:** Uses `framer-motion` for smooth transitions and an engaging visual experience.
- **Global state with Redux:** Robust state management with `@reduxjs/toolkit` and `react-redux`.
- **Markdown support:** Renders responses in Markdown format using `react-markdown` with table support via `remark-gfm`.
- **Form validation:** Secure and user-friendly forms with `formik` and `yup`.
- **Responsive design:** Styled with Tailwind CSS to adapt to various devices.

## Technologies

Austronaut is built with the following dependencies:

### Main Dependencies

- **React** (`^19.0.0`): Main library for building the user interface.
- **React DOM** (`^19.0.0`): DOM rendering for React.
- **Redux Toolkit** (`^2.5.1`) and **React Redux** (`^9.2.0`): Global state management.
- **Firebase** (`^11.3.1`): Authentication and real-time database.
- **Framer Motion** (`^12.4.2`): Smooth animations.
- **Tailwind CSS** (`^4.0.6`): Utility-first CSS framework.
- **Axios** (`^1.7.9`): HTTP requests (if integrated with an external API).
- **Formik** (`^2.4.6`) and **Yup** (`^1.6.1`): Form handling and validation.
- **React Router DOM** (`^7.1.5`): Routing and navigation.
- **React Markdown** (`^9.0.3`) and **Remark GFM** (`^4.0.1`): Markdown rendering with GFM support.
- **React Burger Menu** (`^3.1.0`): Responsive sidebar menu.
- **React Syntax Highlighter** (`^15.6.1`): Syntax highlighting for code in responses.
- **Animate.css** (`^4.1.1`): Predefined CSS animations.

### Development Dependencies

- **Vite** (`^6.1.0`): Fast build tool.
- **@vitejs/plugin-react** (`^4.3.4`): Plugin to use React with Vite.
- **ESLint** (`^9.19.0`) and related plugins: Code linting to maintain code quality.
- **@types/react** (`^19.0.8`) and **@types/react-dom** (`^19.0.3`): TypeScript definitions for React.

## Installation

Follow these steps to set up and run Austronaut on your local machine.

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **Yarn** (install it with `npm install -g yarn` if not already installed)
- A Firebase account for authentication and database (optional if you want full functionality)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/austronaut.git
   cd austronaut
