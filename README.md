# Full-Stack Project with Next.js and Nest.js

This project is a full-stack application consisting of two parts:
- **Frontend** built with **Next.js** (version 15)
- **Backend** built with **Nest.js**

The project assumes that both frontend and backend servers run separately but work together to provide a fully integrated solution.


## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) version 16 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies


## Installation and Setup

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <repository_folder>
```

### Step 2: Set Up Frontend (Next.js)

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install    # or 'yarn install' if using Yarn
```

### Step 3: Set Up Backend (Nest.js)

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install    # or 'yarn install' if using Yarn
```

### Step 4: Running the Backend (Nest.js)

Go to the backend folder and run the Nest.js server:

```bash
cd backend
npm run start:dev   # This will start the Nest.js server in development mode
```
Your backend should now be running on http://localhost:3000.

### Step 5: Running the Frontend (Next.js)

Go to the frontend folder and run the Next.js server:

```bash
cd ../frontend
npm run dev    # This will start the Next.js server in development mode
```
Your frontend should now be running on http://localhost:3200.


### Step 7: Accessing the Application

Once both servers are running, you can access the full-stack application by visiting:

- **Frontend**: [http://localhost:3200](http://localhost:3200)
- **Backend**: [http://localhost:3000](http://localhost:3000) (for API requests)

The frontend will interact with the backend through the API endpoints you defined.
