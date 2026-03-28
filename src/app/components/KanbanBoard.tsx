'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Column from './Column';
import AddTaskModal from './AddTaskModal';
import { useTasks } from '../hooks/useTasks';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/task';

const columns = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
] as const;

export default function KanbanBoard() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      updateTask({ id: Number(active.id), task: { column: over.id as Task['column'] } });
    }
  };

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 }, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1f2937' }}>
          Kanban Board
        </Typography>

        <Box display="flex" gap={2} mb={3} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
            sx={{
              minWidth: { xs: '100%', sm: 150 },
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
            alignItems: 'start',
          }}
        >
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
