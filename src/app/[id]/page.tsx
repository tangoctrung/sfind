import { Metadata } from "next";
import DropdownAccount from "@/components/DropdownAccount";
import ModalProfile from "@/components/Modal/ModalProfile";
import ModalLogout from "@/components/Modal/ModalLogout";
import LeftBar from "@/components/LeftBar";
import TopBarSFind from "@/components/TopBarSFind";
import SFindContent from "@/components/SFindContent";

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Trang chủ của SFind, được tạo bởi trungtn'
}

export default function SFindConvention() {

    return (
        <div className="w-svw h-svh bg-background flex justify-center items-center">
            <div className="w-full h-full tablet:w-[80%] laptop:w-[60%]">
                <div className="w-full h-[70px] flex items-center justify-between border-b-[1px] border-b-slate-300">
                    <div className="w-[15%] tablet:w-52 h-full flex  items-center border-r-[1px] border-r-slate-300">
                        <div className="flex p-2 justify-center rounded-lg hover:bg-slate-300 cursor-pointer">
                            <DropdownAccount />
                        </div>
                    </div>
                    <TopBarSFind />
                </div>
                <div className="w-full h-[calc(100svh-70px)] flex">
                    <LeftBar />
                    <SFindContent />
                </div>
            </div>
            <ModalProfile />
            <ModalLogout />
        </div>
    );
}
