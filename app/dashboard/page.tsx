import { auth, signOut } from '@/auth';

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
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
