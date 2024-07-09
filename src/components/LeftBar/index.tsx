'use client'

import React from 'react'
import ModalCreateSFind from '../Modal/ModalCreateSFind'
import SFindItem from '../SFindItem'
import { useParams, useRouter } from 'next/navigation'

function LeftBar() {

    const dataSFinds = [
        {
            id: "sfind1",
            avatarSfind: "https://www.computerhope.com/jargon/z/zip.png",
            lastActionSfind: "Bạn đã gửi 1 file",
            nameSfind: "Lưu trữ file",
        },
        {
            id: "sfind2",
            avatarSfind: "https://cdn-icons-png.flaticon.com/512/3460/3460831.png",
            lastActionSfind: "Bạn đã gửi 1 ảnh",
            nameSfind: "Lưu trữ ảnh",
        },
        {
            id: "sfind3",
            avatarSfind: "https://cdn-icons-png.flaticon.com/512/9889/9889012.png",
            lastActionSfind: "Bạn đã gửi 1 văn bản",
            nameSfind: "Lưu trữ văn bản",
        },
        {
            id: "sfind4",
            avatarSfind: "https://cdn-icons-png.flaticon.com/512/187/187326.png",
            lastActionSfind: "Bạn đã gửi 1 video",
            nameSfind: "Lưu trữ video",
        },
    ]
    const params = useParams();
    const router = useRouter();

    function handleClickSFindItem(id: string) {
        router.push("/" + id);
    }

    return (
        <div className="w-[15%] tablet:w-52 laptop:w-72 desktop:w-112 h-full border-r-[1px] border-r-slate-300">
            <div className="w-full h-10 flex justify-center items-center">
                <ModalCreateSFind />
            </div>
            <div className="scrollbar-none w-[98%] overflow-y-scroll h-[calc(100%-2.5rem)]">
                {dataSFinds?.map((item: any, index: number) => (
                    <div
                        key={index}
                        onClick={() => handleClickSFindItem(item?.id)}
                    >
                        <SFindItem
                            avatarSfind={item?.avatarSfind}
                            lastActionSfind={item?.lastActionSfind}
                            nameSfind={item?.nameSfind}
                            active={item?.id === params?.id}
                        />
                    </div>))}
            </div>
        </div>
    )
}

export default LeftBar