'use client'
import React from 'react'
import Image from "next/image";
import AvatarDefault from "@/assets/images/avatarDefault.png";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function DropdownAccount() {
    function handleOpenModalProfile() {
        let item: any = document.getElementById('modalProfile');
        item?.showModal()
    }
    function handleOpenModalLogout() {
        let item: any = document.getElementById('modalLogout');
        item?.showModal()
    }
    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className='flex' >
                    <div className="w-9 h-9 tablet:w-12 tablet:h-12">
                        <Image
                            src={AvatarDefault}
                            width={50}
                            className="w-full h-full rounded-full object-cover"
                            alt=""
                        />
                    </div>
                    <div className="hidden tablet:block ml-2">
                        <h2 className="text-lg font-bold">Ta Ngoc Trung</h2>
                        <p className="text-sm text-slate-400">Người dùng hệ thống</p>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleOpenModalProfile()}> <AccountCircleIcon /> Thông tin cá nhân</a></li>
                    <li><a onClick={() => handleOpenModalLogout()}> <LogoutIcon /> Đăng xuất</a></li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownAccount