import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { taskStatusOptions } from '../../mock/mockData';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, disabled = false }) => {
  const getStatusStyle = (status) => {
    const statusOption = taskStatusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    const now = new Date();
    const dueDate = new Date(task.due_date);
    return dueDate < now && task.task_status !== 'Done';
  };

  return (
    <Card className={`task-card ${isOverdue() ? 'overdue' : ''}`}>
      <CardHeader className="task-card-header">
        <div className="task-header-top">
          <CardTitle className="task-title" title={task.title}>
            {task.title}
          </CardTitle>
          <Badge className={`status-badge ${getStatusStyle(task.task_status)}`}>
            {task.task_status}
          </Badge>
        </div>
        <div className="task-id">
          ID: {task.id}
        </div>
      </CardHeader>
      
      <CardContent className="task-card-content">
        <p className="task-description" title={task.description}>
          {task.description}
        </p>
        
        <div className="task-dates">
          <div className="date-item">
            <Calendar className="date-icon" />
            <span className="date-label">Due:</span>
            <span className={`date-value ${isOverdue() ? 'overdue-text' : ''}`}>
              {formatDate(task.due_date)} at {formatTime(task.due_date)}
            </span>
          </div>
          
          <div className="date-item">
            <Clock className="date-icon" />
            <span className="date-label">Updated:</span>
            <span className="date-value">
              {formatDate(task.updated_at)}
            </span>
          </div>
        </div>
        
        <div className="task-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="edit-btn"
            disabled={disabled}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="delete-btn"
            disabled={disabled}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;