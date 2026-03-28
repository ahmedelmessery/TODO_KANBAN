import { Paper, Typography, Box, Chip } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../types/task';
import TaskCard from './TaskCard';
import { useState } from 'react';

interface ColumnProps {
  title: string;
  column: Task['column'];
  tasks: Task[];
  onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

const COLUMN_COLORS = {
  backlog: {
    bg: '#f3f4f6',
    header: '#6b7280',
    accent: '#9ca3af',
  },
  in_progress: {
    bg: '#dbeafe',
    header: '#2563eb',
    accent: '#3b82f6',
  },
  review: {
    bg: '#fef3c7',
    header: '#d97706',
    accent: '#f59e0b',
  },
  done: {
    bg: '#d1fae5',
    header: '#059669',
    accent: '#10b981',
  },
};

export default function Column({ title, column, tasks, onDelete }: ColumnProps) {
  const [page, setPage] = useState(1);
  const { setNodeRef, isOver } = useDroppable({ id: column });

  const paginatedTasks = tasks.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = tasks.length > paginatedTasks.length;
  
  const colors = COLUMN_COLORS[column];

  return (
    <Paper 
      ref={setNodeRef}
      sx={{ 
        p: 2, 
        minHeight: { xs: 300, md: 400 },
        bgcolor: isOver ? colors.accent + '20' : colors.bg,
        width: { xs: '100%', md: 280 },
        border: isOver ? `2px dashed ${colors.accent}` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" sx={{ color: colors.header, fontWeight: 600 }}>
          {title}
        </Typography>
        <Chip 
          label={tasks.length} 
          size="small" 
          sx={{ 
            bgcolor: colors.header,
            color: 'white',
            fontWeight: 'bold',
          }} 
        />
      </Box>
      
      <Box>
        {paginatedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </Box>

      {hasMore && (
        <Typography 
          variant="body2" 
          sx={{ 
            cursor: 'pointer', 
            textAlign: 'center', 
            mt: 2,
            color: colors.header,
            fontWeight: 500,
            '&:hover': {
              color: colors.accent,
            }
          }}
          onClick={() => setPage(p => p + 1)}
        >
          Load more...
        </Typography>
      )}
    </Paper>
  );
}
