'use client';

import { deleteItem } from '@/actions/menu';
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
import { PiCheckCircle, PiTrash, PiWarningOctagon } from 'react-icons/pi';
import { toast } from 'sonner';

export default function DeleteItem({
  itemId,
  menuId,
}: {
  itemId: string;
  menuId: string | number;
}) {
  function handleDeleteSubmit() {
    deleteItem(itemId, menuId.toString());

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Kategoriniz Güncellendi
        </span>
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PiTrash className="size-4 text-orange-400" />
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
              Ürünü silmek istediğinizden emin misiniz? Ürünle ilgili tüm veriler kaldırılacaktır.
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
