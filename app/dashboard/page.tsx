import { signOut } from '@/auth';

export default function Dashboard() {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
}
