import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types/task';
import React from 'react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
}

const TASK_COLORS = {
  backlog: '#e5e7eb',
  in_progress: '#bfdbfe',
  review: '#fde68a',
  done: '#a7f3d0',
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  const handleDelete = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      sx={{ 
        mb: 2, 
        cursor: 'grab', 
        '&:active': { cursor: 'grabbing' },
        touchAction: 'none',
        bgcolor: TASK_COLORS[task.column],
        borderLeft: `4px solid`,
        borderLeftColor: task.column === 'backlog' ? '#6b7280' :
        task.column === 'in_progress' ? '#2563eb' :
        task.column === 'review' ? '#d97706' : '#059669',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        }
      }}
    >
      <CardContent 
        {...listeners}
        {...attributes}
        sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="start" gap={1}>
          <Box flex={1} minWidth={0}>
            <Typography 
              variant="h6" 
              component="div" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' }, 
                fontWeight: 600,
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                wordBreak: 'break-word',
              }}
            >
              {task.description}
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={handleDelete}
            onTouchEnd={handleDelete}
            color="error"
            sx={{
              flexShrink: 0,
              pointerEvents: 'auto',
              touchAction: 'auto',
              '&:hover': {
                bgcolor: 'error.light',
                color: 'white',
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
