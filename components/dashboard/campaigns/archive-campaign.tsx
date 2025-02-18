'use client';

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
import { PiArchive, PiWarningOctagon } from 'react-icons/pi';

export default function ArchiveCampaign() {
  function handleDeleteSubmit() {}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PiArchive className="text-red-600" />
        <span className="text-red-600">Arşivle</span>
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
            <AlertDialogTitle className="font-medium text-[21px]">Emin misin?</AlertDialogTitle>
            <AlertDialogDescription className="text-stone-700 w-[360px] text-[15px]">
              Kampanyayı arşivlemek istediğinizden emin misiniz?
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
