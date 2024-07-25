import React from 'react'
import Image, { StaticImageData } from 'next/image';
import AvatarGroup from "@/assets/images/defaultgroup.png";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: "80%",
    outline: "none",
    p: 4,
};

interface Props {
    avatarSfind: string | StaticImageData;
    nameSfind: string;
    active: boolean;
}
function SFindItem({
    avatarSfind,
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
            </div>
        </div>
    )
}

export default SFindItem