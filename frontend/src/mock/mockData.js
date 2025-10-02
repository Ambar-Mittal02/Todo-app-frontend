// Mock data for todo application
export const mockTasks = [
  {
    id: 1,
    title: "Complete Design for New Website",
    description: "Finish the UI design for the new website project, ensuring that all pages are responsive and user-friendly.",
    due_date: "2025-01-15T09:00:00",
    task_status: "To Do",
    created_at: "2025-01-10T10:04:49.566628",
    updated_at: "2025-01-10T10:04:49.566628"
  },
  {
    id: 2,
    title: "Setup Database Schema",
    description: "Create and configure the database schema for the new application with proper indexing and relationships.",
    due_date: "2025-01-12T14:00:00",
    task_status: "In Progress",
    created_at: "2025-01-09T08:30:00.000000",
    updated_at: "2025-01-11T16:20:00.000000"
  },
  {
    id: 3,
    title: "Write API Documentation",
    description: "Document all API endpoints with examples and proper error handling for the development team.",
    due_date: "2025-01-20T17:00:00",
    task_status: "Hold",
    created_at: "2025-01-08T11:15:00.000000",
    updated_at: "2025-01-10T09:45:00.000000"
  },
  {
    id: 4,
    title: "Code Review Session",
    description: "Conduct thorough code review for the authentication module and provide feedback to the team.",
    due_date: "2025-01-08T10:00:00",
    task_status: "Done",
    created_at: "2025-01-05T14:20:00.000000",
    updated_at: "2025-01-08T11:30:00.000000"
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Optimize application performance by analyzing bottlenecks and implementing caching strategies.",
    due_date: "2025-01-25T12:00:00",
    task_status: "To Do",
    created_at: "2025-01-11T09:10:00.000000",
    updated_at: "2025-01-11T09:10:00.000000"
  }
];

export const taskStatusOptions = [
  { value: "To Do", label: "To Do", color: "bg-slate-100 text-slate-800" },
  { value: "In Progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { value: "Hold", label: "Hold", color: "bg-amber-100 text-amber-800" },
  { value: "Done", label: "Done", color: "bg-emerald-100 text-emerald-800" }
];

export const getTaskStats = (tasks) => {
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(task => task.task_status === "To Do").length;
  const inProgressTasks = tasks.filter(task => task.task_status === "In Progress").length;
  const completedTasks = tasks.filter(task => task.task_status === "Done").length;
  
  const today = new Date().toISOString().split('T')[0];
  const dueTodayTasks = tasks.filter(task => 
    task.due_date.split('T')[0] === today
  ).length;

  return {
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    dueTodayTasks
  };
};