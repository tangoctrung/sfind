'use client'
import React from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AvatarGroup from "@/assets/images/defaultgroup.png";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image';

function ModalCreateSFind() {

    function handleOpenModalCreateSFind() {
        let item: any = document.getElementById('modalCreateSFind');
        item?.showModal()
    }

    return (
        <>
            <div className="tooltip tooltip-bottom" data-tip="Tạo SFind">
                <GroupAddIcon className="w-8 h-8 cursor-pointer" onClick={() => handleOpenModalCreateSFind()} />
            </div>
            <dialog id="modalCreateSFind" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tạo SFind mới</h3>
                    <div className='w-full flex flex-col items-center'>
                        <div className='flex items-center mt-5 mb-6'>
                            <div className="avatar mr-3">
                                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                    <Image
                                        width={96}
                                        height={96}
                                        src={AvatarGroup}
                                        alt=''
                                    />
                                </div>
                            </div>
                            <div className='p-2 rounded-md bg-slate-200 hover:bg-slate-300'>
                                <input id="inputChooseFileModalCreateSFind" type="file" className="file-input w-full max-w-xs hidden" />
                                <label htmlFor="inputChooseFileModalCreateSFind" className="cursor-pointer">
                                    <AttachFileIcon /> Chọn ảnh
                                </label>
                            </div>
                        </div>
                        <label className="input input-bordered input-secondary flex items-center gap-2 w-full">
                            <SupervisedUserCircleIcon />
                            <input type="text" className="grow" placeholder="Tên SFind (bắt buộc)..." />
                        </label>
                        <textarea className="textarea textarea-bordered w-full mt-5" placeholder="Mô tả qua về SFind (tùy chọn)..."></textarea>
                        <label className="input input-bordered flex items-center gap-2 w-full mt-5">
                            <KeyIcon />
                            <input type="text" className="grow" placeholder="Mật khẩu (tùy chọn)..." />
                        </label>
                        <button className="btn btn-neutral mt-5">Tạo SFind</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    )
}

export default ModalCreateSFind