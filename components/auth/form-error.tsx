import { TriangleAlert } from 'lucide-react';

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-destructive">
      <TriangleAlert className="size-4" />
      <p>{message}</p>
    </div>
  );
}
