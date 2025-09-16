# Artisan AI Platform: Presentation

---

## Slide 1: Title

**Artisan AI Platform**

*Empowering Indian Artisans with Generative AI*

---

## Slide 2: Project Vision & Mission

**Our Mission:** To create an educational web application that empowers Indian artisans with the skills and tools needed to succeed in the digital marketplace.

**The Problem:** Many traditional artisans lack the digital literacy, marketing skills, and business knowledge to sell their products effectively online.

**Our Solution:** A safe, simulated e-commerce environment where artisans can learn and practice:
*   Creating compelling product listings.
*   Developing effective marketing strategies.
*   Understanding business analytics and pricing.

All powered by intuitive, generative AI tools.

---

## Slide 3: Technology Stack

Our platform is built on a modern, robust, and scalable tech stack:

*   **Framework:** **Next.js 15** (App Router) for a fast, server-rendered React application.
*   **UI Library:** **React** with **TypeScript** for building interactive and type-safe components.
*   **Styling:** **Tailwind CSS** for a utility-first approach to styling.
*   **UI Components:** **ShadCN UI** for a set of beautifully designed, accessible components.
*   **Generative AI:** **Google's Genkit (v1.x)** for creating powerful AI flows and agents.
*   **Internationalization (i18n):** JSON-based localization for multi-language support.

---

## Slide 4: Key Feature: AI-Powered Content Creation

**Location:** `/dashboard/products/new`

This is a hands-on workshop where artisans practice creating product listings from scratch.

*   **AI Description & Tags:** Upload a product photo to get an AI-generated description and relevant search tags. Teaches artisans what makes a good description.
*   **AI Storyteller:** Dictate or type a product's story, and the AI refines it into a captivating narrative. Teaches the importance of storytelling in marketing.
*   **AI Price Suggestions:** Get data-driven price suggestions based on a product's details to understand market value.
*   **AI Image Generation:** Describe a product, and the AI generates a professional-quality studio photograph, teaching the importance of high-quality visuals.

---

## Slide 5: Key Feature: AI-Driven Business Strategy

*   **AI Marketing Hub (`/dashboard/marketing`):**
    *   Generates a complete marketing plan for a selected product.
    *   Includes target audience profiles, social media ads, email copy, and platform-specific selling tips.
    *   Teaches artisans how to think like a marketer.

*   **AI Idea Hub (`/dashboard/suggestions`):**
    *   Sparks innovation by generating suggestions for product variations, new design concepts, and strategies to reach new audiences.
    *   Helps artisans blend tradition with modern trends.

*   **AI Mentor (`/dashboard/support`):**
    *   An interactive chatbot that provides expert advice on business, marketing, and using the platform's tools.
    *   Acts as a free, 24/7 business coach.

---

## Slide 6: Key Feature: Analytics, Community & Learning

*   **Analytics Dashboard (`/dashboard/analytics`):** A simulated analytics page that shows how to track product views, ratings, and AI-powered insights. Teaches data literacy.
*   **Community Hub (`/dashboard/community`):** A page to connect with other artisans, fostering a sense of community and shared learning.
*   **Live Studio (`/dashboard/livestudio`):** A feature for verified artisans to host live-streaming sessions to demonstrate their craft and engage with a virtual audience.
*   **Artisan Academy (`/dashboard/academy`):** A library of video tutorials covering advanced craft techniques, business negotiation, and digital marketing.

---

## Slide 7: AI Agents (Genkit Flows)

Our AI capabilities are powered by a suite of specialized agents built with Genkit.

| Agent                             | File Path                               | Purpose                                                                                |
| --------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| **`generateProductDescription`**  | `generate-product-description.ts`       | Analyzes a product image to create a description and tags.                               |
| **`refineProductStory`**          | `refine-product-story.ts`               | Polishes a raw, dictated story into an engaging narrative.                             |
| **`suggestPrice`**                | `suggest-price.ts`                      | Suggests a fair market price range based on product details.                           |
| **`generateProductImage`**        | `generate-product-image.ts`             | Generates a studio-quality product image from a text description.                      |
| **`generateMarketingCopy`**       | `generate-marketing-copy.ts`            | Creates a full marketing plan, including ad copy, emails, and target audience.         |
| **`generateProductSuggestions`**  | `generate-product-suggestions.ts`       | Provides innovative ideas for product variations and new designs.                      |
| **`customerSupport` (`AI Mentor`)**| `customer-support.ts`                   | Answers user questions on business and marketing, acting as an expert mentor.          |
| **`analyzeFeedback`**             | `analyze-feedback.ts`                   | (Not yet implemented in UI) Analyzes customer feedback for sentiment and categorization. |

---

## Slide 8: Package Deep-Dive: Core Dependencies

*   **`next`**: The core framework for building the application.
*   **`react` & `react-dom`**: The UI library for building components.
*   **`typescript`**: Provides static typing for improved code quality and developer experience.
*   **`tailwindcss`**: A utility-first CSS framework for styling.
*   **`firebase`**: The client-side SDK for interacting with Firebase services like Auth and Firestore.

---

## Slide 9: Package Deep-Dive: AI & Forms

*   **`genkit` & `@genkit-ai/googleai`**: The core packages for creating and running AI flows with Google's generative models.
*   **`zod`**: Used extensively in Genkit flows to define structured input and output schemas, ensuring AI-generated data is predictable and type-safe.
*   **`react-hook-form` & `@hookform/resolvers`**: Manages all form state and validation, integrating with `zod` schemas for robust error handling.

---

## Slide 10: Package Deep-Dive: UI Components & Utilities

*   **`lucide-react`**: Provides a beautiful and extensive library of icons.
*   **`shadcn-ui` (various `@radix-ui/*` packages)**: The foundation for our UI components (Buttons, Cards, Forms, etc.). These are highly accessible and customizable.
*   **`class-variance-authority` & `clsx`**: Utilities for creating dynamic and conditional class names for components.
*   **`tailwind-merge`**: Prevents conflicting Tailwind CSS classes.
*   **`recharts`**: A composable charting library used for the Analytics dashboard.
*   **`embla-carousel-react`**: Powers the carousels on the dashboard.

---

## Slide 11: Project Structure Overview

```
.
├── src/
│   ├── app/            # Main application routes (Next.js App Router)
│   │   ├── dashboard/  # All authenticated user-facing pages
│   │   └── ...
│   │
│   ├── ai/             # Genkit configuration and flows
│   │   ├── flows/      # All Genkit AI agents are defined here
│   │   └── genkit.ts   # Genkit initialization
│   │
│   ├── components/     # Reusable React components
│   │   └── ui/         # ShadCN UI components
│   │
│   ├── hooks/          # Custom React hooks (e.g., use-toast)
│   │
│   └── lib/            # Shared libraries and utilities
│       ├── locales/    # JSON files for internationalization
│       └── firebase.ts # Firebase client configuration
│
├── public/             # Static assets (images, fonts)
│
└── package.json        # Project dependencies
```

---

## Slide 12: Q&A / Thank You

**Thank You!**

Any Questions?
