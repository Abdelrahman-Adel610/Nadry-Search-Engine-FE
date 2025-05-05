# Nadry+ Search Engine 🔎

<p align="center">
  <img src="src/assets/logo_dark_blue.png" alt="Nadry+ Logo"> <!-- Wrapped in centered paragraph -->
</p>

**Nadry+** is a modern, feature-rich search engine frontend built with React, TypeScript, and Vite. It provides a clean, responsive interface for searching information, inspired by contemporary search engine designs.

---

## ✨ Features

- **🔍 Instant Search:** Real-time search results fetched as you type (debounced).
- **💡 Search Suggestions:** Autocomplete suggestions based on user input.
- **🕒 Recent Searches:** Keeps track of your recent search queries using `localStorage`.
- **🔗 Related Searches:** Sidebar suggestions for related topics.
- **📑 Tabbed Results:** Filter results by categories (All, Docs, GitHub, Tools).
- **⇅ Sorting Options:** Sort results by Relevance or Date.
- **📄 Pagination:** Navigate through multiple pages of search results.
- **⭐ Featured Results:** Highlights important results at the top.
- **💰 Sponsored Results:** Displays sponsored links (currently mocked).
- **🌓 Dark/Light Mode:** Toggle between dark and light themes, respecting system preference.
- **🎨 Theme Colors:** Switch between multiple color themes (Blue, Orange, Default). Theme preference is saved and reflected in the URL hash.
- **📱 Responsive Design:** Adapts seamlessly to different screen sizes (desktop, tablet, mobile).
- **💀 Loading Skeletons:** Provides visual feedback while data is being fetched.
- **❗ Error Handling:** Displays user-friendly error pages for search failures or invalid routes.
- **🤷 No Results Page:** Offers helpful suggestions when a search yields no results.
- **🚀 Fast & Modern:** Built with Vite for quick development and optimized builds.

---

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) (v19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Routing:** [React Router](https://reactrouter.com/) (v7)
- **Data Fetching/State Management:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Linting:** [ESLint](https://eslint.org/), [TypeScript ESLint](https://typescript-eslint.io/)
- **Icons:** Emojis (used throughout the UI)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation & Running

1.  **Clone the repository:**

    ```bash
    git clone "https://github.com/Abdelrahman-Adel610/Nadry-Search-Engine"
    cd Nadry-Search-Engine
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the Vite development server, typically at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```
    This creates an optimized production build in the `dist` folder.

### Backend API

This frontend requires a backend API to function correctly (for search, suggestions, etc.). Ensure the backend server is running and accessible at the base URL configured in `src/Api/client.ts` (currently `http://localhost:3000/api`).

---

## 📁 Project Structure

```
Nadry-Search-Engine/
├── public/             # Static assets
├── src/
│   ├── Api/            # API client and service definitions
│   ├── assets/         # Images, logos
│   ├── context/        # React context (e.g., ThemeContext)
│   ├── data/           # Mock data, constants
│   ├── features/       # Feature-specific components (Home, SearchPage)
│   ├── Hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── ui/             # Reusable UI components (Button, Logo, SearchBar)
│   ├── utils/          # Utility functions (styling, localStorage)
│   ├── App.tsx         # Main application component, routing setup
│   ├── AppLayout.tsx   # Main layout component
│   ├── index.css       # Global styles and Tailwind directives
│   └── main.tsx        # Application entry point
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── README.md           # This file
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration (root)
├── tsconfig.app.json   # TypeScript configuration (app-specific)
├── tsconfig.node.json  # TypeScript configuration (node-specific)
└── vite.config.ts      # Vite configuration
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
