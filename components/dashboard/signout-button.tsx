'use client';

import { signOut } from 'next-auth/react';
import { PiSignOut } from 'react-icons/pi';

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        console.log('Signing out...');
        await signOut({ callbackUrl: '/login' });
      }}
      className="flex items-center gap-2.5"
    >
      <PiSignOut className="text-red-600" />
      <span className="text-red-600">Çıkış Yap</span>
    </button>
  );
}
