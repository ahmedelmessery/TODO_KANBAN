import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Task } from '../types/task';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
}

export default function AddTaskModal({ open, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({
        title,
        description,
        column: 'backlog',
      });
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={false}
      sx={{
        '& .MuiDialog-paper': {
          m: { xs: 2, sm: 3 },
          width: { xs: 'calc(100% - 32px)', sm: '100%' },
        }
      }}
    >
      <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        Add New Task
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, mt: 1 }}
          size="small"
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
        />
      </DialogContent>
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <Button onClick={onClose} size="medium">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="medium">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
