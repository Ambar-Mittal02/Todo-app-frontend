## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Core Features

- **CRUD Operations**: Allows users to **Create**, **Read**, **Update**, and **Delete tasks**.
- **Pagination Support**: Task lists are paginated with navigation controls.
- **Real-Time Search**: Tasks can be filtered in real-time with search functionality.
- **Task Status Management**: Tasks are categorized into statuses — **To Do**, **In Progress**, **Hold**, **Done**.
- **Responsive UI**: The UI is fully responsive and works across devices with a mobile-first design.
  
---

## Technical Implementation

- **Frontend Framework**: Built using **React.js** for building the user interface.
- **Styling**: The application uses **Tailwind CSS** for utility-first styling and layout.
- **API Calls**: Uses **axios** to interact with the FastAPI backend for performing CRUD operations.
- **State Management**: Uses React state hooks (`useState`, `useEffect`) to manage local state and loading states.
- **Form Handling & Validation**: Handles task creation and editing with form validation and date pickers.
- **Toast Notifications**: Provides feedback to users using toast notifications for task actions (success/error).

---

## User Experience

- **Dashboard**: A visually appealing dashboard that displays **live statistics** of tasks.
- **Task Cards**: Intuitive cards for each task with options to **edit** or **delete** tasks.
- **Task Creation/Editing**: Forms are used to add/edit tasks, with **date pickers** and validation in place to ensure correct data entry.
- **Notifications**: Displays **toast notifications** for success and error feedback to users after performing actions like adding or editing tasks.
- **Responsive Design**: The app is fully responsive, providing a smooth user experience across various screen sizes from mobile to desktop.

---

## Project Setup

Follow these steps to set up and run the frontend application on your local machine.

You need to install the project dependencies using npm
run `npm install`

## Start the development server
`npm run start`
