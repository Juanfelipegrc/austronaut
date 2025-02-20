# Austronaut

**Austronaut** es una aplicación de inteligencia artificial diseñada como una alternativa a ChatGPT, enfocada en ofrecer una experiencia de chat conversacional sin los modos de búsqueda o pensamiento adicionales. Construida con React y potenciada por Firebase para la autenticación y almacenamiento, Austronaut proporciona una interfaz moderna y animada para interactuar con una IA, ideal para usuarios que buscan simplicidad y funcionalidad directa.

## Características

- **Chat conversacional:** Interactúa con una IA sin complicaciones, diseñada para respuestas rápidas y directas.
- **Autenticación con Firebase:** Inicia sesión con Google o correo electrónico para guardar tus chats.
- **Interfaz animada:** Usa `framer-motion` para transiciones suaves y una experiencia visual atractiva.
- **Estado global con Redux:** Manejo robusto del estado con `@reduxjs/toolkit` y `react-redux`.
- **Soporte para Markdown:** Renderiza respuestas en formato Markdown con `react-markdown` y soporte para tablas con `remark-gfm`.
- **Validación de formularios:** Formularios seguros y fáciles de usar con `formik` y `yup`.
- **Diseño responsivo:** Estilizado con Tailwind CSS para adaptarse a diferentes dispositivos.

## Tecnologías

Austronaut está construido con las siguientes dependencias:

### Dependencias principales

- **React** (`^19.0.0`): Biblioteca principal para la interfaz de usuario.
- **React DOM** (`^19.0.0`): Renderizado en el DOM.
- **Redux Toolkit** (`^2.5.1`) y **React Redux** (`^9.2.0`): Gestión del estado global.
- **Firebase** (`^11.3.1`): Autenticación y base de datos en tiempo real.
- **Framer Motion** (`^12.4.2`): Animaciones fluidas.
- **Tailwind CSS** (`^4.0.6`): Estilos utilitarios.
- **Axios** (`^1.7.9`): Solicitudes HTTP (si se integra con una API externa).
- **Formik** (`^2.4.6`) y **Yup** (`^1.6.1`): Gestión y validación de formularios.
- **React Router DOM** (`^7.1.5`): Navegación entre rutas.
- **React Markdown** (`^9.0.3`) y **Remark GFM** (`^4.0.1`): Renderizado de Markdown.
- **React Modal** (`^3.16.3`): Modales personalizados.
- **React Burger Menu** (`^3.1.0`): Menú lateral responsivo.
- **React Syntax Highlighter** (`^15.6.1`): Resaltado de código en respuestas.
- **Animate.css** (`^4.1.1`): Animaciones CSS predefinidas.

### Dependencias de desarrollo

- **Vite** (`^6.1.0`): Herramienta de construcción rápida.
- **@vitejs/plugin-react** (`^4.3.4`): Plugin para React en Vite.
- **ESLint** (`^9.19.0`) y plugins relacionados: Linting para mantener la calidad del código.
- **@types/react** (`^19.0.8`) y **@types/react-dom** (`^19.0.3`): Tipos para TypeScript.

## Instalación

Sigue estos pasos para configurar y ejecutar Austronaut en tu máquina local.

### Prerrequisitos

- **Node.js** (versión 18 o superior recomendada).
- **Yarn** (instálalo con `npm install -g yarn` si no lo tienes).
- Una cuenta de Firebase para la autenticación y base de datos (opcional si deseas usar las funcionalidades completas).

### Pasos

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/austronaut.git
   cd austronaut