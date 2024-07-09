'use client'
import React, { useState } from 'react'
import AvatarDefault from "@/assets/images/avatarDefault.png";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import Image from 'next/image';

function ModalProfile() {

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    function handleSubmitProfile() {
        if (isDisabled) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }
    return (
        <>
            <dialog id="modalProfile" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Thông tin cá nhân</h3>
                    <div className='w-full flex flex-col items-center'>
                        <div className='flex items-center mt-5 mb-6'>
                            <div className="avatar mr-3">
                                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                    <Image
                                        width={96}
                                        src={AvatarDefault}
                                        alt=''
                                    />
                                </div>
                            </div>
                            {!isDisabled &&
                                <div className='p-2 rounded-md bg-slate-200 hover:bg-slate-300'>
                                    <input id="inputChooseFileModalCreateSFind" type="file" className="file-input w-full max-w-xs hidden" />
                                    <label htmlFor="inputChooseFileModalCreateSFind" className="cursor-pointer">
                                        <AttachFileIcon /> Chọn ảnh
                                    </label>
                                </div>}
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <PermContactCalendarIcon />
                                <input type="text" className="grow" placeholder="Tạ Ngọc Trung" disabled={isDisabled} />
                            </label>
                            <div className='flex mt-4'>
                                <select className="select select-bordered mr-2 flex-1" disabled={isDisabled} defaultValue={"Nam"}>
                                    <option value={"Nam"}>Nam</option>
                                    <option value={"Nữ"}>Nữ</option>
                                    <option value={"Khác"}>Khác</option>
                                </select>
                                <label className="input input-bordered flex items-center gap-2 flex-1">
                                    <input type="date" className="grow" placeholder="Tạ Ngọc Trung" disabled={isDisabled} />
                                </label>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 mt-4">
                                <SmartphoneIcon />
                                <input type="text" className="grow" placeholder="Số điện thoại" disabled={isDisabled} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-4">
                                <EmailIcon />
                                <input type="text" className="grow" placeholder="Email" disabled />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-4">
                                <BusinessIcon />
                                <input type="text" className="grow" placeholder="Địa chỉ" disabled={isDisabled} />
                            </label>
                        </div>
                        <button
                            className="btn btn-neutral mt-5"
                            onClick={handleSubmitProfile}
                        >{isDisabled ? "Chỉnh sửa" : "Cập nhật"}</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    )
}

export default ModalProfile