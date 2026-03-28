'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Box, TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Column from './components/Column';
import AddTaskModal from './components/AddTaskModal';
import { useTasks } from './hooks/useTasks';
import { useTaskStore } from './store/useTaskStore';
import { Task } from './types/task';

const queryClient = new QueryClient();

function KanbanBoard() {
  const { tasks, isLoading, addTask, updateTask, deleteTask } = useTasks();
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const taskId = Number(active.id);
      const newColumn = over.id as Task['column'];
      updateTask({ id: taskId, task: { column: newColumn } });
    }
  };

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ] as const;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#1f2937' }}>
          Kanban Board
        </Typography>
        
        <Box display="flex" gap={2} mb={3}>
          <TextField
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small"
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
            sx={{ 
              minWidth: 150,
              bgcolor: '#2563eb',
              '&:hover': {
                bgcolor: '#1d4ed8',
              }
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      <DndContext onDragEnd={handleDragEnd}>
        <Box display="flex" gap={2} overflow="auto">
          {columns.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              column={col.id}
              tasks={filteredTasks.filter((task: Task) => task.column === col.id)}
              onDelete={deleteTask}
            />
          ))}
        </Box>
      </DndContext>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTask}
      />
    </Container>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <KanbanBoard />
    </QueryClientProvider>
  );
}
