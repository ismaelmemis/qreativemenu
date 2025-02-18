'use client';

import { useRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PiArchive, PiDotsThreeVertical, PiWarningOctagon } from 'react-icons/pi';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { archiveCampaignHandler } from '@/actions/menu';

export default function CampaignDropdown({
  campaignId,
  archivedItem,
}: {
  campaignId: string;
  archivedItem: boolean;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  async function handleArchiveCampaign() {
    await archiveCampaignHandler(campaignId, !archivedItem);
    triggerRef.current?.focus();
  }

  const handleAlertDialogOpenChange = (open: boolean) => {
    if (!open) {
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-white" size="icon" ref={triggerRef}>
            <PiDotsThreeVertical className="size-8 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1.5 w-[180px] mr-2.5">
          <AlertDialog onOpenChange={handleAlertDialogOpenChange}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <PiArchive className="text-stone-600 size-4" />
                {archivedItem ? (
                  <span className="text-stone-600">Arşivden Çıkart</span>
                ) : (
                  <span className="text-stone-600">Arşivle</span>
                )}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full "
                  aria-hidden="true"
                >
                  <PiWarningOctagon
                    className="opacity-80 text-red-600 mb-1"
                    size={28}
                    strokeWidth={2}
                  />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-medium text-[21px]">
                    Emin misin?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-stone-700 w-[360px] text-[15px]">
                    Arşivlemek istediğinizden emin misiniz?
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button type="button" variant="ghost">
                    İptal Et
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleArchiveCampaign} asChild>
                  <Button variant="destructive">Onayla</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
