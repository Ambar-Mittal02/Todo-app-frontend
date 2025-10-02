import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Plus, Search, Filter, AlertCircle } from 'lucide-react';
import TaskCard from '../TaskCard/TaskCard';
import TaskForm from '../TaskForm/TaskForm';
import StatsCards from '../StatsCards/StatsCards';
import Pagination from '../Pagination/Pagination';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Alert, AlertDescription } from '../ui/alert';
import { useToast } from '../../hooks/use-toast';
import taskService from '../../services/taskService';
import './Dashboard.css';

const Dashboard = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { toast } = useToast();

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await taskService.fetchTasks({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter,
      search: searchTerm
    });
    
    if (result.success) {
      setTasks(result.tasks);
      setTotalCount(result.totalCount);
    } else {
      setError(result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  }, [currentPage, itemsPerPage, statusFilter, searchTerm, toast]);

  // Load tasks on component mount and when dependencies change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, statusFilter]);

  // Calculate stats from current tasks
  const stats = useMemo(() => {
    if (tasks.length === 0) {
      return {
        totalTasks: totalCount,
        todoTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        dueTodayTasks: 0
      };
    }
    return taskService.getTaskStats(tasks);
  }, [tasks, totalCount]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setActionLoading(true);
    const result = await taskService.deleteTask(taskId);
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      fetchTasks(); // Refresh the task list
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setActionLoading(false);
  };

  const handleSaveTask = async (taskData) => {
    setActionLoading(true);
    let result;
    
    if (editingTask) {
      // Update existing task
      result = await taskService.updateTask(editingTask.id, taskData);
    } else {
      // Create new task
      result = await taskService.createTask(taskData);
    }
    
    if (result.success) {
      toast({
        title: "Success",
        description: editingTask ? "Task updated successfully" : "Task created successfully",
      });
      setShowTaskForm(false);
      setEditingTask(null);
      fetchTasks(); // Refresh the task list
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setActionLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Debounced search function
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value === 'all' ? '' : value);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle p-5">Manage your tasks efficiently</p>
        </div>
        <Button onClick={handleCreateTask} className="create-task-btn">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <StatsCards stats={stats} />

      <div className="dashboard-controls">
        <div className="search-filter-container">
          <div className="search-container">
            <Search className="search-icon" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
              disabled={loading}
            />
          </div>
          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={statusFilter || 'all'}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="filter-select"
              disabled={loading}
            >
              <option value="all">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Hold">Hold</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="error-alert">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button 
              variant="link" 
              size="sm" 
              onClick={fetchTasks}
              className="ml-2"
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="tasks-section">
        <h2 className="tasks-title">
          Tasks ({loading ? '...' : totalCount})
        </h2>
        
        {loading ? (
          <LoadingSpinner size="large" text="Loading tasks..." />
        ) : (
          <>
            <div className="tasks-grid">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  disabled={actionLoading}
                />
              ))}
            </div>
            
            {tasks.length === 0 && !loading && (
              <div className="empty-state">
                <p>
                  {searchTerm || statusFilter 
                    ? 'No tasks found matching your criteria.' 
                    : 'No tasks found. Create your first task!'
                  }
                </p>
              </div>
            )}
            
            {totalCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                loading={loading}
              />
            )}
          </>
        )}
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;