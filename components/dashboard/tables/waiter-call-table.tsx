'use client';

import { cn } from '@/lib/utils';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleX,
  Columns3,
  Ellipsis,
  Filter,
  ListFilter,
  Trash,
} from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { PiCalendarDots, PiClock, PiPicnicTable, PiUserCircleDashed } from 'react-icons/pi';
import { io } from 'socket.io-client';
import { addWaiterCall, deleteWaiterCall, updateTableStatus } from '@/actions/menu';

type Item = {
  id: string;
  table: string;
  date: string;
  time: string;
  status: 'Beklemede' | 'Görüldü' | 'Tamamlandı' | 'İptal Edildi';
  balance: number;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.table} ${row.original.date}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Item> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const columns: ColumnDef<Item>[] = [
  {
    header: () => (
      <span className="flex items-center gap-1.5">
        <PiPicnicTable className="size-4" /> Masa
      </span>
    ),
    accessorKey: 'table',
    cell: ({ row }) => <div className="font-medium">{row.getValue('table')}</div>,
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: () => (
      <span className="flex items-center gap-2">
        <PiCalendarDots className="size-4" /> Tarih
      </span>
    ),
    accessorKey: 'date',
    size: 220,
  },
  {
    header: () => (
      <span className="flex items-center gap-2">
        <PiClock className="size-4" /> Saat
      </span>
    ),
    accessorKey: 'time',
    // cell: ({ row }) => (
    //   <div>
    //     <span className="text-lg leading-none">{row.original.flag}</span> {row.getValue('location')}
    //   </div>
    // ),
    size: 180,
  },
  {
    header: () => (
      <span className="flex items-center gap-2">
        <PiUserCircleDashed className="size-4" /> Durum
      </span>
    ),
    accessorKey: 'status',
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue('status') === 'Beklemede' && 'bg-red-500/80 text-primary-foreground',
          row.getValue('status') === 'Görüldü' && 'bg-amber-500/80 text-primary-foreground',
          row.getValue('status') === 'Tamamlandı' && 'bg-emerald-500/80 text-primary-foreground'
        )}
      >
        {row.getValue('status')}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
  },

  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

export default function WaiterCallTable({ waiterCallData }: { waiterCallData: Item[] }) {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [waiterCallIdNotification, setWaiterCallIdNotification] = useState<string | undefined>(
    undefined
  );
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleWaiterCallAdd(tableId: string, venueId: string) {
    const res = await addWaiterCall(tableId, venueId);
    setWaiterCallIdNotification(res?.id);
  }

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('waiterCall', (message) => {
      console.log('Message: ', message);
      handleWaiterCallAdd(message.tableId, message.venueId);
      setData((prevData) => {
        return [
          ...prevData,
          {
            id: waiterCallIdNotification?.toString(),
            table: message.table,
            date: new Date().toLocaleDateString('tr-TR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            time: new Date().toLocaleTimeString('tr-TR'),
            flag: 'N/A',
            status: 'Beklemede',
            balance: 0,
          },
        ];
      });
    });

    return () => {
      socket.off('waiterCall');
      socket.disconnect();
    };
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  const [data, setData] = useState<Item[]>(waiterCallData);

  useEffect(() => {
    setData(waiterCallData);
  }, [waiterCallData]);

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.table === item.table)
    );
    setData(updatedData);
    table.resetRowSelection();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn('status');

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn('status')?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn('status')?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn('status')?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn('status')?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                'peer min-w-64 ps-9 h-10 bg-white',
                Boolean(table.getColumn('table')?.getFilterValue()) && 'pe-9'
              )}
              value={(table.getColumn('table')?.getFilterValue() ?? '') as string}
              onChange={(e) => table.getColumn('table')?.setFilterValue(e.target.value)}
              placeholder="Masaya veya tarihe göre sırala"
              type="text"
              aria-label="Masaya veya tarihe göre sırala"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <ListFilter className="text-stone-600" size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn('table')?.getFilterValue()) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn('table')?.setFilterValue('');
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleX size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-stone-300">
                <Filter
                  className="-ms-1 me-2 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Durum
                {selectedStatuses.length > 0 && (
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-stone-300 bg-none px-1 font-[inherit] text-[0.625rem] font-medium text-stone-500">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-xs font-medium text-stone-700">Filtrele</div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal text-stone-700"
                      >
                        {value}{' '}
                        <span className="ms-2 text-xs text-stone-600">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-stone-300">
                <Columns3
                  className="-ms-1 me-2 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Görüntüle
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-stone-700">Sütünları Değiştir</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-stone-600 hover:bg-stone-200"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <Trash
                    className="-ms-1 me-2 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-stone-50 bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/90">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{' '}
                      {table.getSelectedRowModel().rows.length} selected{' '}
                      {table.getSelectedRowModel().rows.length === 1 ? 'row' : 'rows'}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Add user button */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-stone-100 bg-background shadow-sm">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11 text-stone-700 text-[15px] font-medium"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer select-none items-center justify-between gap-2'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Bildirim Yok
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Sayfa başına Sütun
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap bg-white">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>

            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2 bg-white">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()} className="">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page number information */}
        <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
          <p className="whitespace-nowrap text-sm text-stone-500" aria-live="polite">
            <span className="text-stone-600">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                table.getState().pagination.pageSize}
            </span>{' '}
            of <span className="text-stone-600">{table.getRowCount().toString()}</span>
          </p>
        </div>
        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50 border-stone-100"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RowActions({ row }: { row: Row<Item> }) {
  async function handleWaiterCallStatus(tableId: string, status: string) {
    await updateTableStatus(row.original.id, status);
  }

  async function handleWaiterCallDelete(callId: string) {
    deleteWaiterCall(callId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" className="shadow-none" aria-label="Edit item">
            <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleWaiterCallStatus(row.original.id, 'IN_PROGRESS')}>
            <span>Görüldü</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleWaiterCallStatus(row.original.id, 'RESOLVED')}>
            <span>Tamamlandı</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleWaiterCallStatus(row.original.id, 'CANCELLED')}>
            <span>İptal Et</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleWaiterCallDelete(row.original.id)}
          className="text-destructive focus:text-destructive"
        >
          <span>Bildirim Sil</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
