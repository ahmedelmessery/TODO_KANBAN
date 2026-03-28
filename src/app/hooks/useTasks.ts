import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';
import { Task } from '../types/task';
import { useState } from 'react';

// Mock data for Assessment Live Link 
const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "API Integration",
    description: "Connect frontend with backend services",
    column: "backlog"
  },
  {
    id: 2,
    title: "Fix login bug",
    description: "issue with authentication flow",
    column: "in_progress"
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Add setup instructions for new developers",
    column: "done"
  },
  {
    id: 4,
    title: "Database migration",
    description: "Migrate user data to new schema",
    column: "review"
  }
];

export const useTasks = () => {
  const queryClient = useQueryClient();
  const [localTasks, setLocalTasks] = useState<Task[]>(MOCK_TASKS);
  const isProduction = !process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL.includes('localhost');

  // Use mock data in production, real API in development
  const { data: tasks = localTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: isProduction ? async () => localTasks : getTasks,
    enabled: !isProduction,
  });

  const addMutation = useMutation({
    mutationFn: isProduction 
      ? async (task: Omit<Task, 'id'>) => {
          const newTask = { ...task, id: Date.now() };
          setLocalTasks(prev => [...prev, newTask]);
          return newTask;
        }
      : addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: isProduction
      ? async ({ id, task }: { id: number; task: Partial<Task> }) => {
          setLocalTasks(prev => 
            prev.map(t => t.id === id ? { ...t, ...task } : t)
          );
          return { id, ...task } as Task;
        }
      : ({ id, task }: { id: number; task: Partial<Task> }) => updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: isProduction
      ? async (id: number) => {
          setLocalTasks(prev => prev.filter(t => t.id !== id));
        }
      : deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks: isProduction ? localTasks : tasks,
    isLoading: isProduction ? false : isLoading,
    addTask: addMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
  };
};
