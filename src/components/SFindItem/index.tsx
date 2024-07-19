import React from 'react'
import Image, { StaticImageData } from 'next/image';
import AvatarGroup from "@/assets/images/defaultgroup.png";

interface Props {
    avatarSfind: string | StaticImageData;
    nameSfind: string;
    lastActionSfind: string;
    active: boolean;
}
function SFindItem({
    avatarSfind,
    lastActionSfind,
    nameSfind,
    active,
}: Props) {
    return (
        <div className={`flex p-2 mt-2 mb-2 items-center rounded-lg hover:bg-slate-300 cursor-pointer ${active ? "bg-slate-300" : ""}`}>
            <div className="w-10 h-10 tablet:w-12 tablet:h-12">
                <Image
                    src={avatarSfind || AvatarGroup}
                    width={50}
                    height={50}
                    className="w-full h-full rounded-full object-cover"
                    alt=""
                />
            </div>
            <div className="hidden tablet:block ml-2">
                <h2 className="text-lg font-bold">{nameSfind}</h2>
                <p className="text-sm text-slate-400">{lastActionSfind}</p>
            </div>
        </div>
    )
}

export default SFindItem