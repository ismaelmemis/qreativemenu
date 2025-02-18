import { PiLockKey, PiSparkleFill } from 'react-icons/pi';

export default function Analytics() {
  return (
    <div className="relative h-screen w-full">
      {/* <div className="absolute bg-stone-50 w-screen h-screen -left-6 blur-sm"></div> */}
      <div className="py-8 flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Raporlar</h2>
          </div>
        </div>
        <div className="flex justify-center mt-40">
          <div className="flex flex-col items-center gap-2 w-[500px] pt-6 rounded-xl bg-white shadow-sm">
            <div className="mb-2 flex flex-col">
              <div className="flex text-red-500 items-center gap-2 font-medium text-[18px]">
                <div className="rounded-full bg-red-100 w-8 h-8 flex items-center justify-center">
                  <PiLockKey />
                </div>
                Yetkiniz bulunmamaktadır
              </div>
            </div>
            <div className="text-center text-[14px]">
              Detaylı Raporlama görüntüleyebilmek için paketinizi yükseltin veya
              destek@qreativemenu.com iletişime geçin
            </div>
            <div className="mr-4 mb-6 mt-2 shadow-sm px-3.5 py-2 rounded-lg border border-stone-200/50 cursor-pointer">
              <p className="font-semibold flex gap-1.5 items-center">
                <PiSparkleFill className=" text-blue-600" />{' '}
                <span className="text-[14px] tracking-normal bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent">
                  Premium Pakete Yükselt
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
