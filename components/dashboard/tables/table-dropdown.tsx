import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/lib/db';
import { PiDotsThreeVertical } from 'react-icons/pi';
import QRDownloader from '../qr/qr-downloader';

export default async function TableDropdown({ table }: { table: { id: string } }) {
  console.log(table);

  const qrCode = await db.qRCode.findFirst({
    where: {
      tableId: table.id,
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <PiDotsThreeVertical className="size-5 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1.5 w-[180px] mr-2.5">
        <DropdownMenuItem>
          <QRDownloader qrCode={qrCode} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
