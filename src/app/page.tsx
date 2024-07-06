import { Metadata } from "next";
import ImageGroupDefault from "@/assets/images/defaultgroup.png";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SFindItem from "@/components/SFindItem";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchIcon from '@mui/icons-material/Search';
import ModalCreateSFind from "@/components/Modal/ModalCreateSFind";
import DropdownAccount from "@/components/DropdownAccount";
import ModalProfile from "@/components/Modal/ModalProfile";
import ModalLogout from "@/components/Modal/ModalLogout";
import ModalInfoSFind from "@/components/Modal/ModalInfoSFind";

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của SFind, được tạo bởi trungtn'
}

export default function Home() {

  return (
    <div className="w-svw h-svh bg-background flex justify-center items-center">
      <div className="w-full h-full tablet:w-[80%] laptop:w-[60%]">
        <div className="w-full h-[70px] flex items-center justify-between border-b-[1px] border-b-slate-300">
          <div className="w-[15%] tablet:w-52 h-full flex  items-center border-r-[1px] border-r-slate-300">
            <div className="flex p-2 justify-center rounded-lg hover:bg-slate-300 cursor-pointer">
              <DropdownAccount />
            </div>
          </div>
          <div className="w-[85%] tablet:w-[calc(100%-13rem)] flex justify-center items-center">
            <label className="input input-bordered flex items-center gap-2 h-10 w-auto tablet:min-w-72 laptop:min-w-144">
              <input type="text" className="grow" placeholder="Search" />
              <SearchIcon />
            </label>
            <ModalInfoSFind />
          </div>
        </div>
        <div className="w-full h-[calc(100svh-70px)] flex">
          <div className="w-[15%] h-full tablet:w-52 border-r-[1px] border-r-slate-300 tablet:p-3">
            <div className="w-full h-10 flex justify-center items-center">
              <ModalCreateSFind />
            </div>
            <div className="scrollbar-none w-full overflow-y-scroll h-[calc(100%-2.5rem)]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item: any, index: number) => {
                if (item === 3) {
                  return (
                    <SFindItem
                      key={index}
                      avatarSfind={ImageGroupDefault}
                      lastActionSfind="Bạn đã gửi 1 file"
                      nameSfind="Lưu trữ File"
                      active={true}
                    />
                  )
                } else {
                  return (
                    <SFindItem
                      key={index}
                      avatarSfind={ImageGroupDefault}
                      lastActionSfind="Bạn đã gửi 1 file"
                      nameSfind="Lưu trữ File"
                      active={false}
                    />
                  )
                }
              })}
            </div>
          </div>
          <div className="h-full w-[calc(85%)] tablet:w-[calc(100%-13rem)] ">
            <div className="h-[calc(100%-3rem)] w-full bg-slate-200">

            </div>
            <div className="h-12 w-full bg-slate-300 flex items-center justify-around">
              <div className="p-2 cursor-pointer bg-slate-400 rounded-md ml-5">
                <input id="inputChooseFile" type="file" className="file-input w-full max-w-xs hidden" />
                <label htmlFor="inputChooseFile" className="cursor-pointer">
                  <AttachFileIcon />
                </label>
              </div>
              <div className="p-2 cursor-pointer bg-slate-400 rounded-md ml-5">
                <EditNoteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalProfile />
      <ModalLogout />
    </div>
  );
}
