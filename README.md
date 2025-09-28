# GyanSetu - Digital Learning Platform

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

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (or yarn)

### 2. Firebase Setup

This application is tightly integrated with Firebase for its database and authentication services.

**Using the Default Project:**

The project is pre-configured with a sample Firebase project. The configuration can be found in `src/lib/firebase.ts`. You can run the application using this default setup for demonstration purposes.

**Using Your Own Firebase Project:**

For a real-world deployment or more advanced testing, you should create your own Firebase project.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Firebase project.
3.  Navigate to **Project Settings** > **General**.
4.  Under "Your apps," create a new Web App (`</>`).
5.  After creating the app, Firebase will provide you with a `firebaseConfig` object.
6.  Copy this object and replace the existing one in `src/lib/firebase.ts`.
7.  In the Firebase Console, go to the **Authentication** section and enable the **Email/Password** sign-in provider.
8.  Go to the **Firestore Database** section and create a new database. Start in **test mode** for easy development (this allows open read/write access). For production, you will need to set up [Security Rules](https://firebase.google.com/docs/firestore/security/get-started).

### 3. Environment Variables for Genkit

The AI features in this app are powered by Genkit, which uses the Google AI SDK. You need an API key from Google AI Studio to use these features.

1.  Visit [Google AI Studio](https://aistudio.google.com/) and create a new API key.
2.  In the root directory of this project, create a new file named `.env`.
3.  Add your API key to the `.env` file like this:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 4. Installation

Clone the repository and install the necessary dependencies.

```bash
# Clone the repository
git clone <repository_url>
cd <project_directory>

# Install dependencies
npm install
```

### 5. Running the Application

This project requires two separate development servers to be running simultaneously: one for the Next.js frontend and another for the Genkit AI flows.

**Terminal 1: Run the Next.js Frontend**

This command starts the main web application.

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

**Terminal 2: Run the Genkit AI Server**

This command starts the local server that runs the AI flows (e.g., personalized learning paths, student summaries). The Next.js application communicates with this server.

```bash
npm run genkit:dev
```

The Genkit server will typically run on port `3400` and you will see its status in the terminal.

### 6. Using the Application

Once both servers are running, you can access `http://localhost:9002` in your browser.

- **Student Registration**: New students can register for an account using the registration form. This will create a user in Firebase Authentication and a corresponding student document in Firestore.
- **Login**:
  - **Students/Parents**: Use the credentials created during registration.
  - **Teachers/Principal**: For demonstration, you can use any email/password combination for teacher and principal roles. These accounts are not created via a registration form but can be added directly in your Firestore `users` collection or via the "Add New Teacher" feature in the Principal's dashboard.
- **AI Features**: Navigate to a student's dashboard to try the "Personal Learning Path" or to a student's report page to use the "AI-Generated Summary." These features will only work if the Genkit server is running and your `.env` file is correctly configured.
```