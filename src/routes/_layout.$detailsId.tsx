import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$detailsId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello Master Detail View!</div>;
}
