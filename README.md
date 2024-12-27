# FormCraft AI - AI-Powered Google Form Generator

FormCraft AI is a web application built with Next.js that leverages the power of AI to generate Google Forms. It allows users to create complex and intelligent forms quickly and easily, saving valuable time and effort.

## Features

- **AI-Powered Form Generation:** Describe your form requirements, and let AI handle the structure, question types, and more.
- **Google Forms Integration:** Seamlessly create and update Google Forms directly from the app using the Google Forms API.
- **User Authentication:** Securely manage forms with Google OAuth 2.0 based authentication.
- **Form Management Dashboard:** View and access all created forms from your personalized dashboard.
- **Easy Editing and Sharing:** Direct links to edit and view generated forms within your Google Forms account.
- **Responsive Design:** Enjoy a consistent user experience across all devices.
- **Dark Mode Support:**  Toggle between light and dark themes to suit your preference.
- **Data Persistence**: All the forms you have generated are saved in our database for later retrieval.
- **Privacy Focused**: We value your privacy, and we make sure to store your data in secure PostgreSQL databases


## Demo:

[X Link for the Video](https://x.com/avikm744/status/1871920601927151662)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [bun](https://bun.sh/)
-   A Google Cloud Platform project with the Google Forms API enabled.
-   A Postgres database setup and ready to be connected with the env variables.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Avik-creator/aiformbuilder.git
    cd aiformbuilder
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

    Using pnpm:

    ```bash
    pnpm install
    ```

    Using bun:

    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add the following environment variables. You'll need to obtain these from your Google Cloud Platform project. Please make sure the names are exactly as shown here.

    ```env
    DATABASE_URL="YOUR_POSTGRES_CONNECTION_STRING"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    NEXTAUTH_URL="YOUR_NEXTAUTH_URL"
    GOOGLE_VERIFICATION_ID="YOUR_GOOGLE_SITE_VERIFICATION_ID"
    GROQ_API_KEY="YOUR_GROQ_API_KEY"
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"
    ```

    - `DATABASE_URL`: Your Postgres database connection string.
    - `GOOGLE_CLIENT_ID`: The client ID for your Google application.
    - `GOOGLE_CLIENT_SECRET`: The client secret for your Google application.
    - `NEXTAUTH_SECRET`: A secret key for NextAuth.js
    - `NEXTAUTH_URL`: The URL of your deployed app (for local development set it to `http://localhost:3000`).
    - `GOOGLE_VERIFICATION_ID`: Your google site verification ID, used for better seo
    - `GROQ_API_KEY`: Your Groq API key, used for the AI generation
    - `NEXT_PUBLIC_BASE_URL`: The base url of your deployed app. For local development, set it to `http://localhost:3000`


4.  **Run migrations:**

    ```bash
    npx/bunx drizzle-kit generate
    npx/bunx drizzle-kit migrate
    npx/bunx drizzle-kit push
    ```
   This will create the needed database tables.

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Project Structure

- **`src/app`**: Contains the Next.js application logic, pages, layouts and routing.
    -   `actions`: Server actions for form generation and data handling.
    -   `api`: Next.js API routes for authentication and AI interaction.
    -  `form-generation`: The page for generating the forms
    -  `forms`: The page to view and manage all the generated forms.
    -  `signin`: The page to sign in using google account
    -   `globals.css`: Global stylesheet
-   **`src/auth.ts`**: Configuration for NextAuth.js
-   **`src/components`**: Reusable UI components, including form elements, layouts, and theme handling.
-   **`src/hooks`**: Custom React hooks for managing application state.
-   **`src/lib`**: Utility files, database schema, and type definitions.
-   **`drizzle`**: Database migration files
-   **`public`**: Static assets (images, icons)
-   **`tailwind.config.ts`**: Tailwind CSS configuration file.
-   **`tsconfig.json`**: TypeScript configuration file.
-   **`vercel.json`**: Vercel configuration file

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for building web applications.
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript for type safety.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [ShadCN UI](https://ui.shadcn.com/): Reusable Component Based Library
- [Drizzle ORM](https://orm.drizzle.team/): TypeScript ORM for database interactions.
- [PostgreSQL](https://www.postgresql.org/): Database used for storing data
- [NextAuth.js](https://next-auth.js.org/): Authentication library for Next.js.
- [Framer Motion](https://www.framer.com/motion/): Animation library for React.
- [Lucide Icons](https://lucide.dev/): A collection of beautiful icons.
- [Groq AI API](https://groq.com/): AI API used for form generation.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to submit a pull request.

## License and Contributions

This project is licensed under a **Custom License**.  

- **Contributions are Welcome!** Please submit a pull request or open an issue to discuss potential changes.  
- **Restrictions:** Copying, redistribution, or commercial use of this project, in whole or in part, is strictly prohibited without prior written permission from the author.  

For licensing inquiries, contact: [avikm744@gmail.com].
