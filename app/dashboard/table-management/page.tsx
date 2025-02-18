import { db } from '@/lib/db';
import { auth } from '@/auth';

import CreateTable from '@/components/dashboard/tables/create-table';
import CreateTableArea from '@/components/dashboard/tables/create-table-area';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Plus } from 'lucide-react';
import { PiChair, PiPicnicTable } from 'react-icons/pi';
import { Badge } from '@/components/ui/badge';
import DeleteTable from '@/components/dashboard/tables/delete-table';
import UpdateTable from '@/components/dashboard/tables/update-table';
import { Venue } from '@prisma/client';
import TableDropdown from '@/components/dashboard/tables/table-dropdown';

export default async function TableManagement() {
  const session = await auth();
  const user = session?.user;

  const venue = await db.venue.findFirst({
    where: {
      userId: user?.id,
      isActive: true,
    },
    include: {
      tableAreas: {
        include: {
          table: true,
        },
      },
    },
  });

  const tableAreaData =
    venue?.tableAreas.map((area) => {
      return {
        id: area.id,
        name: area.name,
      };
    }) || [];

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Masa Yönetimi</h2>
        </div>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <div className="flex gap-2 mb-6">
            <CreateTableArea venueId={venue?.id ?? ''} />
            <CreateTable tableAreas={tableAreaData} venue={venue as Venue} />
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full -space-y-px flex flex-col gap-1"
              defaultValue={venue?.tableAreas[0].id}
            >
              {venue?.tableAreas.map((area) => {
                return (
                  <AccordionItem
                    key={area.id}
                    className="border border-stone-200 shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] bg-background first:rounded-t-lg last:rounded-b-lg"
                    value={area.id}
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between p-4 border-b text-left text-[15px] text-stone-800 font-medium leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                        <div className="flex gap-2.5">
                          {area.name}{' '}
                          <Badge
                            variant="secondary"
                            className="gap-1 px-2 py-0.5 bg-stone-100 border border-stone-300"
                          >
                            <PiPicnicTable /> {area.table.length} Masa
                          </Badge>
                        </div>
                        <Plus
                          size={16}
                          strokeWidth={2}
                          className="shrink-0 opacity-60 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="p-4 text-muted-foreground flex flex-col gap-2">
                      {area.table.map((table) => {
                        return (
                          <div
                            key={table.id}
                            className="items-center justify-between border border-stone-200 rounded-lg p-4 shadow-sm flex gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-600/20 flex items-center justify-center rounded-full p-2">
                                <PiPicnicTable className="size-5 text-orange-700" />
                              </div>
                              <h3 className="text-stone-700 text-[15px] font-medium">
                                {table.name}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="gap-1 px-2 py-0.5 bg-stone-100 border border-stone-200"
                              >
                                <PiChair />{' '}
                                <span className="text-stone-700 text-xs">
                                  {table.capacity} Kişilik
                                </span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="cursor-pointer">
                                <UpdateTable
                                  tableAreas={tableAreaData}
                                  tableData={table}
                                  tableId={table?.id}
                                />
                              </div>
                              <div className="cursor-pointer">
                                <DeleteTable itemId={table.id} />
                              </div>
                              <div>
                                <TableDropdown table={table} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
