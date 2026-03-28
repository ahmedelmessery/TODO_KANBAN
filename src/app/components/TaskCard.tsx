import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types/task';

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

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
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
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box flex={1}>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            color="error"
            sx={{
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
