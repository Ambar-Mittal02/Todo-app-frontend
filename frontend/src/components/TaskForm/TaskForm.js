import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { taskStatusOptions } from '../../mock/mockData';
import './TaskForm.css';

const TaskForm = ({ task, onSave, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    task_status: 'To Do',
    due_date: new Date()
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        task_status: task.task_status || 'To Do',
        due_date: task.due_date ? new Date(task.due_date) : new Date()
      });
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const taskData = {
        ...formData,
        due_date: formData.due_date.toISOString()
      };
      onSave(taskData);
    }
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.due_date;

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="task-form-dialog">
        <DialogHeader className="task-form-header">
          <div className="header-content">
            <DialogTitle className="form-title">
              {task ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="close-btn"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <Label htmlFor="title" className="form-label">
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <Label htmlFor="description" className="form-label">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              rows={4}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="status" className="form-label">
                Status
              </Label>
              <Select
                value={formData.task_status}
                onValueChange={(value) => handleInputChange('task_status', value)}
              >
                <SelectTrigger className="form-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taskStatusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={`status-option ${option.color}`}>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label className="form-label">
                Due Date *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`date-picker-btn ${errors.due_date ? 'error' : ''}`}
                  >
                    <CalendarIcon className="calendar-icon" />
                    {formData.due_date ? (
                      format(formData.due_date, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="date-picker-content" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.due_date}
                    onSelect={(date) => handleInputChange('due_date', date)}
                    disabled={(date) => date < new Date(new Date().toDateString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.due_date && <span className="error-message">{errors.due_date}</span>}
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="save-btn"
            >
              {loading ? (
                <>
                  <div className="btn-spinner">
                    <div className="spinner-circle"></div>
                  </div>
                  {task ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                task ? 'Update Task' : 'Create Task'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;