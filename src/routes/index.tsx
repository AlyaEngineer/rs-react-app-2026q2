import HomePage from '@/pages/home/ui/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <HomePage />,
});
