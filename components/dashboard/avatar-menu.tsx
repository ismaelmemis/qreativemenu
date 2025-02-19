import { auth } from '@/auth';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/lib/db';
import Link from 'next/link';
import { PiStorefront, PiUserCircle } from 'react-icons/pi';
import SignOutButton from './signout-button';
import { getInitials } from '@/lib/data';

export default async function AvatarMenu() {
  const session = await auth();

  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {user?.image ? (
              <AvatarImage src={`/uploads/${user.image}`} />
            ) : (
              <AvatarFallback className="bg-stone-200 p-1">
                {getInitials(user?.name) || ''}
              </AvatarFallback>
            )}
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-2.5 w-[220px]">
          <DropdownMenuLabel>
            <h2 className="font-medium">{user?.name}</h2>
            <p className="font-normal text-stone-700">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account/profile" className="flex items-center gap-2.5">
              <PiUserCircle /> Hesap Ayarları
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account/venue-settings" className="flex items-center gap-2.5">
              <PiStorefront /> Mekan Ayarları
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
