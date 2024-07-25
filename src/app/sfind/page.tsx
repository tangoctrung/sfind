import { Metadata } from "next";
import DropdownAccount from "@/components/DropdownAccount";
import ModalLogout from "@/components/Modal/ModalLogout";
import LeftBar from "@/components/LeftBar";
import TopBarSFind from "@/components/TopBarSFind";
import SFindContent from "@/components/SFindContent";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Trang chủ của SFind, được tạo bởi trungtn'
}

export default function SFindConvention() {

    return (
        <div className="w-svw h-svh bg-background flex justify-center items-center">
            <div className="w-full h-full laptop:w-[80%] desktop:w-[60%]">
                <div className="w-full h-[70px] flex items-center justify-between border-b-[1px] border-b-slate-300">
                    <div className="w-[15%] tablet:w-52 laptop:w-72 desktop:w-112 h-full flex  items-center border-r-[1px] border-r-slate-300">
                        <div className="w-full flex p-2 rounded-lg hover:bg-slate-300 cursor-pointer">
                            <DropdownAccount />
                        </div>
                    </div>
                    <Suspense>
                        <TopBarSFind />
                    </Suspense>
                </div>
                <div className="w-full h-[calc(100svh-70px)] flex">
                    <Suspense>
                        <LeftBar />
                    </Suspense>
                    <Suspense>
                        <SFindContent />
                    </Suspense>
                </div>
            </div>
            <ModalLogout />
        </div>
    );
}
