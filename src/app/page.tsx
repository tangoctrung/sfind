import { Metadata } from "next";
import DropdownAccount from "@/components/DropdownAccount";
import ModalLogout from "@/components/Modal/ModalLogout";
import LeftBar from "@/components/LeftBar";
import { AppMain } from "./AppMain";

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của SFind, được tạo bởi trungtn'
}

export default function Home() {

  return (
    <AppMain>
      <div className="w-svw h-svh bg-background flex justify-center items-center">
        <div className="w-full h-full tablet:w-[100%] laptop:w-[80%] desktop:w-[60%]">
          <div className="w-full h-[70px] flex items-center justify-between border-b-[1px] border-b-slate-300">
            <div className="w-[15%] tablet:w-52 laptop:w-72 desktop:w-112 h-full flex  items-center border-r-[1px] border-r-slate-300">
              <div className="flex p-2 justify-center rounded-lg hover:bg-slate-300 cursor-pointer">
                <DropdownAccount />
              </div>
            </div>
          </div>
          <div className="w-full h-[calc(100svh-70px)] flex">
            <LeftBar />
            <div className="w-[calc(85%)] tablet:w-[calc(100%-13rem)] laptop:w-[calc(100%-18rem)] desktop:w-[calc(100%-28rem)] text-center pt-64 font-bold text-xl">
              Hãy chọn một SFind để bắt đầu
            </div>
          </div>
        </div>
        <ModalLogout />
      </div>
    </AppMain>
  );
}
