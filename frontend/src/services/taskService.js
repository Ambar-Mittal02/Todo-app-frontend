import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api/v1/tasks`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task Service Class
class TaskService {
  // Fetch tasks with pagination, filtering, and search
  async fetchTasks({ page = 1, limit = 10, status = '', search = '' } = {}) {
    try {
      const skip = (page - 1) * limit;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      
      if (status && status !== '') {
        params.append('status', status);
      }
      
      if (search && search.trim() !== '') {
        params.append('search', search.trim());
      }

      const response = await api.get(`/?${params.toString()}`);
      
      return {
        tasks: response.data.data || [],
        totalCount: response.data.total_count || 0,
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return {
        tasks: [],
        totalCount: 0,
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to fetch tasks'
      };
    }
  }

  // Create new task
  async createTask(taskData) {
    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date
      };

      const response = await api.post('/', payload);
      
      return {
        task: response.data,
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error creating task:', error);
      return {
        task: null,
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to create task'
      };
    }
  }

  // Update existing task
  async updateTask(taskId, taskData) {
    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.task_status,
        due_date: taskData.due_date
      };

      const response = await api.put(`/${taskId}`, payload);
      
      return {
        task: response.data,
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error updating task:', error);
      return {
        task: null,
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to update task'
      };
    }
  }

  // Delete task
  async deleteTask(taskId) {
    try {
      await api.delete(`/${taskId}`);
      
      return {
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error deleting task:', error);
      return {
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to delete task'
      };
    }
  }

  // Get task statistics
  getTaskStats(tasks) {
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
  }
}

// Export singleton instance
const taskService = new TaskService();
export default taskService;