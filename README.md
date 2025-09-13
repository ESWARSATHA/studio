# Artisan AI Platform

Welcome to the Artisan AI Platform, an educational web application designed to empower Indian artisans with the skills and tools needed to succeed in the digital marketplace. This platform uses generative AI to teach artisans how to create compelling product listings, develop marketing strategies, and understand business analytics, all within a safe, simulated e-commerce environment.

## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Internationalization (i18n):** JSON-based localization for multi-language support.

## Key Features

The platform is divided into several key modules, each designed to teach a specific aspect of online business and marketing.

### 1. AI-Powered Content Creation
- **Create Showcase (`/dashboard/products/new`):** A hands-on workshop where artisans can practice creating product listings.
  - **AI Description & Tags:** Upload a product photo to get an AI-generated description and relevant tags.
  - **AI Storyteller:** Dictate or type a product's story, and the AI refines it into a captivating narrative.
  - **AI Price Suggestions:** Get data-driven price suggestions based on a product's details to understand market value.
  - **AI Image Generation:** Describe a product, and the AI generates a professional-quality studio photograph.

### 2. AI-Driven Business Strategy
- **AI Marketing Hub (`/dashboard/marketing`):** Generate a complete marketing plan for a selected product, including target audience profiles, social media ads, email copy, and platform-specific selling tips.
- **AI Idea Hub (`/dashboard/suggestions`):** Spark innovation by generating suggestions for product variations, new design concepts, and strategies to reach new audiences.
- **AI Mentor (`/dashboard/support`):** An interactive chatbot that provides expert advice on business, marketing, and using the platform's tools.

### 3. Analytics & Community
- **Analytics Dashboard (`/dashboard/analytics`):** A simulated analytics page that shows how to track product views, ratings, and AI-powered insights.
- **Community Hub (`/dashboard/community`):** A page to connect with other artisans, fostering a sense of community and shared learning.
- **Live Studio (`/dashboard/livestudio`):** A feature for verified artisans to host live-streaming sessions to demonstrate their craft and engage with a virtual audience.

### 4. Learning & Development
- **Artisan Academy (`/dashboard/academy`):** A library of video tutorials covering advanced craft techniques, business negotiation, and digital marketing.

## Project Structure

The project follows a standard Next.js App Router structure.

```
.
├── src/
│   ├── app/                    # Main application routes
│   │   ├── dashboard/          # All authenticated user-facing pages
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── globals.css         # Global styles and ShadCN theme
│   │   └── layout.tsx          # Root layout
│   │
│   ├── ai/                     # Genkit configuration and flows
│   │   ├── flows/              # All Genkit AI flows
│   │   └── genkit.ts           # Genkit initialization
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Auto-generated ShadCN components
│   │   └── icons.tsx           # Custom SVG icons
│   │
│   ├── hooks/                  # Custom React hooks
│   │
│   └── lib/                    # Shared libraries and utilities
│       ├── locales/            # JSON files for internationalization
│       ├── placeholder-images.json # Centralized placeholder image data
│       ├── utils.ts            # Utility functions (e.g., `cn`)
│       └── firebase.ts         # Firebase configuration
│
├── public/                     # Static assets (images, fonts, etc.)
│
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

To run this project locally, follow these steps:

1.  **Install Dependencies:**
    Make sure you have Node.js and npm installed. Then, run the following command in the project's root directory:
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    Once the dependencies are installed, you can start the Next.js development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Run the Genkit Developer UI:**
    To test and debug the AI flows, you can run the Genkit Developer UI in a separate terminal. This allows you to interact with the flows directly without going through the application UI.
    ```bash
    npm run genkit:watch
    ```
    The Genkit UI will be available at `http://localhost:4000`.

## Internationalization (i18n)

The application supports multiple languages.
- Language files are stored as JSON in `src/lib/locales`.
- The `LanguageProvider` in `src/lib/locales/language-context.tsx` manages the current language state and provides translations to all components via the `useLanguage` hook.
- The user's selected language is persisted in `localStorage`.

## Styling

- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **ShadCN UI:** A collection of beautifully designed, accessible components that can be copied and pasted into the project.
- **Theming:** The color scheme and overall theme are defined using CSS variables in `src/app/globals.css`. This makes it easy to customize the look and feel of the application, including support for a dark mode.
