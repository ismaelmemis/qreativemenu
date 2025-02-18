'use client';

import { switchMenuArchiveStatus } from '@/actions/menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { PiArchive, PiDotsThreeVertical, PiGearSix } from 'react-icons/pi';

export default function MenuDropdown({ menuId, archived }: { menuId: string; archived: boolean }) {
  async function archiveHandler() {
    await switchMenuArchiveStatus(archived, menuId);
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <PiDotsThreeVertical className="size-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1.5 w-[180px] mr-2.5">
          <DropdownMenuItem onClick={() => archiveHandler()}>
            <PiArchive className="text-red-600" /> <span className="text-red-600">Arşivle</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/menu-management/${menuId}`}>
              <PiGearSix /> Menü Ayarları
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
