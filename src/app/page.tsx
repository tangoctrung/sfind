import { Metadata } from "next";
import DropdownAccount from "@/components/DropdownAccount";
import ModalLogout from "@/components/Modal/ModalLogout";
import LeftBar from "@/components/LeftBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của SFind, được tạo bởi trungtn'
}

export default function Home() {

  return (
    <div className="w-svw h-svh bg-slate-100/60 flex justify-center items-center">
      <div className="w-full tablet:h-[90%] h-full tablet:w-[90%] laptop:w-[80%] desktop:w-[60%] flex shadow-lg bg-slate-300/60 backdrop-blur-sm tablet:rounded-3xl overflow-hidden">
        <div className="w-[15%] tablet:w-52 laptop:w-72 desktop:w-112 h-full border-r-[1px] border-r-slate-300">
          <div className="w-full h-[70px] flex items-center justify-between border-b-[1px] border-b-slate-300">
            <div className="flex p-2 w-full justify-center textTransition hover:bg-slate-300 cursor-pointer">
              <DropdownAccount />
            </div>
          </div>
          <div className="w-full h-[calc(100%-70px)] flex flex-col">
            <Suspense>
              <LeftBar />
            </Suspense>
          </div>
        </div>
        <div className="w-[85%] tablet:w-[calc(100%-13rem)] laptop:w-w-[calc(100%-18rem)] desktop:w-w-[calc(100%-28rem)] h-full flex">
          <div className="w-full text-center pt-64 font-bold text-xl">
            Hãy chọn một SFind để bắt đầu
          </div>
        </div>
      </div>
      <ModalLogout />
    </div>
  );
}
