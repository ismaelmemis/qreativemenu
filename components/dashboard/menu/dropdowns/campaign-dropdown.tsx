import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PiArchive, PiDotsThreeVertical } from 'react-icons/pi';

export default function CampaignDropdown() {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <PiDotsThreeVertical className="size-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1.5 w-[180px] mr-2.5">
          <DropdownMenuItem>
            <PiArchive className="text-red-600" /> <span className="text-red-600">Arşivle</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
