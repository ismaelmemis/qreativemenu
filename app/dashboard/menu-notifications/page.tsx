import { auth } from '@/auth';
import { db } from '@/lib/db';

import WaiterCallTable from '@/components/dashboard/tables/waiter-call-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate, formatTime } from '@/lib/dates';

const statusTR = {
  PENDING: 'Beklemede',
  IN_PROGRESS: 'Görüldü',
  RESOLVED: 'Tamamlandı',
  CANCELLED: 'İptal Edildi',
};

export default async function MenuManagement() {
  const session = await auth();
  const user = session?.user;

  const venue = await db.venue.findFirst({
    where: {
      userId: user?.id,
      isActive: true,
    },
    include: {
      waiterCall: {
        include: {
          table: true,
        },
      },
    },
  });

  const waiterCallContent = venue?.waiterCall.map((call) => {
    return {
      id: call.id,
      table: call.table.name,
      date: formatDate(call.createdAt.toString()),
      time: formatTime(call.createdAt.toString()),
      status: statusTR[`${call.status}`],
      balance: 1,
    };
  });

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Menü Bildirimleri</h2>
        </div>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="waitercall">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="waitercall"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                Garson Çağır
              </TabsTrigger>
              <TabsTrigger
                value="billingcall"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                Hesap İste
              </TabsTrigger>
            </TabsList>
            <TabsContent value="waitercall">
              <WaiterCallTable waiterCallData={waiterCallContent} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
