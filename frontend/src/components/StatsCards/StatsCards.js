import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, Clock, Pause, Target, Calendar } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: Target,
      gradient: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      title: 'To Do',
      value: stats.todoTasks,
      icon: Clock,
      gradient: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700'
    },
    {
      title: 'In Progress',
      value: stats.inProgressTasks,
      icon: Clock,
      gradient: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      gradient: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Due Today',
      value: stats.dueTodayTasks,
      icon: Calendar,
      gradient: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="stats-container">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="stats-card">
            <CardHeader className="stats-card-header">
              <div className={`stats-icon ${stat.bgColor}`}>
                <IconComponent className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent className="stats-card-content">
              <div className={`stats-value bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <CardTitle className="stats-title">{stat.title}</CardTitle>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;