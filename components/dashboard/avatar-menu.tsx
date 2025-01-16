import { signOut, auth } from '@/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarImage } from '@radix-ui/react-avatar';
import { PiSignOut, PiStorefront, PiUserCircle } from 'react-icons/pi';

export default async function AvatarMenu() {
  const session = await auth();

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-2.5 w-[220px]">
          <DropdownMenuLabel>
            <h2 className="font-medium">Bamboo Cafe</h2>
            <p className="font-normal text-stone-700">{session?.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <PiUserCircle /> Hesap Ayarları
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PiStorefront /> Mağaza Ayarları
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
              }}
            >
              <button className="flex items-center gap-2.5">
                <PiSignOut className="text-red-600" />{' '}
                <span className="text-red-600">Çıkış Yap</span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
