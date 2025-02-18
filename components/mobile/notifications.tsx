'use client';

import { io } from 'socket.io-client';

import { PiBellSimpleRingingBold, PiCaretRightBold, PiWalletBold } from 'react-icons/pi';

export default function Notifications({
  tableId,
  tableName,
  venueId,
  menuTheme,
}: {
  tableId?: string;
  tableName?: string;
  venueId?: string;
  menuTheme?: string;
}) {
  const theme = menuTheme;

  const sendWaiterCallNotification = () => {
    if (tableId && tableName) {
      const socket = io('http://localhost:3000');
      socket.emit('waiterCall', {
        type: 'hesap isteme',
        table: tableName,
        tableId: tableId,
        venueId: venueId,
      });
      console.log('sent');
    }
  };

  return (
    <div
      onClick={() => sendWaiterCallNotification()}
      className="p-3 xs:p-5 flex flex-col gap-1 xs:gap-2"
    >
      <div
        className={`flex items-center justify-between rounded-xl xs:rounded-3xl p-2.5 xs:p-5 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] cursor-pointer border-2 border-stone-600/10 bg-gradient-to-br  ${
          theme === 'dark' ? 'from-stone-600/20 to-stone-600/30' : 'from-white to-stone-50'
        }`}
      >
        <div className="flex flex-row gap-4 xs:gap-8 items-center">
          <div className="rounded-full p-1.5 xs:p-3 border-2 xs:border-4 border-stone-600/10 bg-white shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)]">
            <PiBellSimpleRingingBold className="size-4 xs:size-6 text-stone-500" />
          </div>
          <div>
            <h2
              className={`text-[14px] xs:text-[22px] font-medium ${
                theme === 'dark' ? 'text-white' : 'text-stone-700'
              } `}
            >
              Garson Çağır
            </h2>
          </div>
        </div>

        <div>
          <div className="rounded-full p-0.5 xs:p-2 border-2 xs:border-4 border-stone-600/10 border-stone-100 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)]">
            <PiCaretRightBold
              className={`size-2.5 xs:size-4  ${
                theme === 'dark' ? 'text-white' : 'text-stone-600'
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-between rounded-xl xs:rounded-3xl p-2 xs:p-5 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] cursor-pointer border-2 border-stone-600/10 bg-gradient-to-br  ${
          theme === 'dark' ? 'from-stone-600/20 to-stone-600/30' : 'from-white to-stone-50'
        }`}
      >
        <div className="flex flex-row gap-4 xs:gap-8 items-center ">
          <div className="rounded-full p-1.5 xs:p-3 border-2 xs:border-4 border-stone-600/10 bg-white shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.1)]">
            <PiWalletBold className="size-4 xs:size-6 text-stone-500" />
          </div>
          <div>
            <h2
              className={`text-[14px] xs:text-[22px] font-medium ${
                theme === 'dark' ? 'text-white' : 'text-stone-700'
              } `}
            >
              Hesap İste
            </h2>
          </div>
        </div>

        <div>
          <div className="rounded-full p-0.5 xs:p-2 border-2 xs:border-4 border-stone-600/10 border-stone-100 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.1)]">
            <PiCaretRightBold
              className={`size-2.5 xs:size-4  ${
                theme === 'dark' ? 'text-white' : 'text-stone-600'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
