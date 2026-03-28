'use client';

import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CircularProgress, Box } from '@mui/material';

const queryClient = new QueryClient();

// منع الـ SSR خالص عشان dnd-kit بيعمل hydration mismatch
const KanbanBoard = dynamic(() => import('./components/KanbanBoard'), {
  ssr: false,
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  ),
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <KanbanBoard />
    </QueryClientProvider>
  );
}
