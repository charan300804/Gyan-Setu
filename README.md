# GyanSetu - Digital Learning Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Framework-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&style=for-the-badge)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)




GyanSetu is a web application designed to bridge the digital divide in rural education. It provides an interactive learning platform for students, with tools for teachers and principals to manage and track student progress. The application is built with a modern tech stack and features AI-powered tools to offer personalized learning experiences.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (with Google AI)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

---

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### 1. Prerequisites

Before you begin, ensure you have the following software installed on your system. These are essential for running the application.

- **[Node.js](https://nodejs.org/)**: (v18 or later recommended). Node.js is the JavaScript runtime environment that executes the application's code on the server.
- **[npm](https://www.npmjs.com/)** (or yarn): This is the Node Package Manager, used for installing and managing project dependencies. It comes bundled with Node.js.

### 2. Firebase Setup

This application is tightly integrated with Firebase for its database and authentication services.

**Using the Default Project:**

The project is pre-configured with a sample Firebase project to allow you to run it out-of-the-box for demonstration purposes. The configuration is located in `src/lib/firebase.ts`. You can run the application using this default setup without any changes.

**Using Your Own Firebase Project (Recommended for Development):**

For a real-world deployment or more advanced testing, you should create and configure your own Firebase project. This gives you full control over the data and services.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.
3.  **Create a Web App**: Once your project is created, navigate to **Project Settings** (the gear icon near the top-left) > **General**. Under the "Your apps" section, click the web icon (`</>`) to create a new Web App.
4.  **Get Firebase Config**: After creating the app, Firebase will provide you with a `firebaseConfig` object. This object contains the unique keys that connect your frontend application to your specific Firebase project.
5.  **Update the Code**: Copy the entire `firebaseConfig` object and paste it into the `src/lib/firebase.ts` file, replacing the existing configuration.
6.  **Enable Authentication**: In the Firebase Console, go to the **Authentication** section from the left-hand menu. Click "Get started," and then under the "Sign-in method" tab, enable the **Email/Password** provider. This is necessary for the login and registration system to work.
7.  **Create Firestore Database**: Go to the **Firestore Database** section from the left-hand menu. Click "Create database" and start in **test mode**. This mode allows open read/write access, which is convenient for initial development.
    *   **Important**: For a production application, you must configure [Security Rules](https://firebase.google.com/docs/firestore/security/get-started) to protect your data from unauthorized access.

### 3. Environment Variables for Genkit (AI Features)

The AI features in this app (like personalized learning paths and student summaries) are powered by Genkit, which uses the Google AI SDK. You need an API key from Google AI Studio to use these features.

1.  **Get an API Key**: Visit [Google AI Studio](https://aistudio.google.com/) and click "Get API key". Create a new API key in an existing or new project.
2.  **Create `.env` file**: In the root directory of this project, create a new file named `.env`. This file is used to store secret keys securely.
3.  **Add the Key**: Add your API key to the `.env` file in the following format:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    The application is configured to automatically load this key.

### 4. Installation

Clone the repository to your local machine and install all the required dependencies.

```bash
# 1. Clone the repository (or download the source code)
git clone <repository_url>
cd <project_directory>

# 2. Install all project dependencies defined in package.json
npm install
```

### 5. Running the Application

This project requires **two separate development servers** to be running simultaneously: one for the Next.js frontend and another for the Genkit AI flows.

**Terminal 1: Run the Next.js Frontend**

This command starts the main web application. This server is responsible for rendering the UI and handling user interactions.

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

**Terminal 2: Run the Genkit AI Server**

This command starts the local server that runs the AI flows (e.g., personalized learning paths, student summaries). The Next.js application communicates with this server via API calls when AI features are used.

```bash
npm run genkit:dev
```

The Genkit server will typically run on port `3400`. You will see its status and logs in this terminal window. The AI-powered features will not work unless this server is running.

### 6. Using the Application

Once both servers are running, you can access `http://localhost:9002` in your browser.

- **Student Registration**: New students can register for an account using the registration form. This will create a user in Firebase Authentication and a corresponding student document in your Firestore `users` collection.

- **Login Details**:
  - **Students**: Use the email and password created during registration. You must also select your class from the dropdown.
  - **Parents/Guardians**: Use the **child's credentials** to log in through the student login form. The app will direct you to the parent dashboard.
  - **Teachers/Principal**: For demonstration, you can use any email/password combination for these roles (e.g., `principal@gyansetu.com` with password `password`). The app will grant access based on the role selected on the login page.

- **AI Features**:
  - To test the **Personalized Learning Path**, navigate to a student's dashboard and click the "Generate My Path" button.
  - To test the **AI-Generated Summary**, navigate to a student's detailed report page (from the teacher dashboard) and click the "Generate Summary" button.
  - These features will only work if the Genkit server is running and your `.env` file is correctly configured.
```