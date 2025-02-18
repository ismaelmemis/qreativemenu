'use client';

import { deleteTable } from '@/actions/menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PiTrash, PiWarningOctagon } from 'react-icons/pi';

export default function DeleteTable({ itemId }: { itemId: string }) {
  function handleDeleteSubmit() {
    console.log('Deleted...');
    deleteTable(itemId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PiTrash className="size-4 text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full "
            aria-hidden="true"
          >
            <PiWarningOctagon className="opacity-80 text-red-600 mb-1" size={28} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-semibold text-[21px]">Emin misin?</AlertDialogTitle>
            <AlertDialogDescription className="text-stone-700 w-80 text-[15px]">
              Masayı Silmek istediğinizden emin misiniz? Masaylaa ilgili tüm veriler
              kaldırılacaktır.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button type="submit" variant={'ghost'}>
              İptal Et
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSubmit}>
            <Button variant={'destructive'}>Onayla</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
