# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React Mini E-Commerce Application

## Features

- Product search with debouncing
- Category-based filtering
- Price sorting (Low to High / High to Low)
- Shopping cart functionality:
  - Add items to cart
  - Increment and decrement item quantity
  - Remove items from cart
- Cart state persistence using localStorage
- Derived cart statistics
- Styling implemented with Tailwind CSS

---

Tech Stack:
- React
- JavaScript
- Tailwind CSS
- Custom React Hooks
- LocalStorage API

---

## Core React Concepts Applied

### Custom Hooks
Application logic is extracted into reusable custom hooks to keep components focused on rendering:

- `useFetch` – Handles product data fetching
- `useLocalStorage` – Manages persisted search state with debouncing
- `usePersistCart` – Synchronizes cart state with localStorage

This improves separation of concerns and reusability.

---

### Derived State
Computed values such as filtered product lists, sorted results, and cart statistics are derived from existing state instead of being stored separately. This avoids redundant state and reduces the risk of inconsistencies.

---

### Re-render Optimization
- `useCallback` is used for event handlers passed to child components where referential stability matters
- Functional state updates ensure predictable behavior
- Avoids unnecessary re-renders while keeping the codebase simple and readable

---

### State Management Approach
- Single source of truth for cart state
- Immutable updates using array methods (`map`, `filter`, `reduce`)
- Clear separation between stateful logic and presentational components

---

## Project Structure

src/
├── components/
│ ├── Search.jsx
│ ├── FilterList.jsx
│ ├── Cart.jsx
│ ├──├── CartItem.jsx
│ └── Stats.jsx
├── hooks/
│ ├── useFetch.js
│ ├── useLocalStorage.js
│ └── usePersistCart.js
├── App.jsx
└── index.js

