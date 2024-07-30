'use client'
import React, { useState } from 'react'
import AvatarDefault from "@/assets/images/avatarDefault.png";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectDataUser, updateInfoUser as updateInfoUserReudx } from '@/lib/features/controlData/controlDataSlice';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { updateInfoUser } from '@/endpoint/user';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/index';
import { setInfoUserToLocalStorage } from '@/utils/handleLocal';
import { convertTimeNumberToHHMMddmmYYYY } from '@/utils/handleTime';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
interface DataUpdateInfoUser {
    username: string;
    email: string;
    avatar: string;
    gender: string;
    dob: string;
    phone: string;
    address: string;
}

function ModalProfile({ setDataSnackBar }: {
    setDataSnackBar: any;
}) {

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const user = useAppSelector(selectDataUser)

    const [infoImageFile, setInfoImageFile] = useState({
        url: "",
        file: null,
    });
    const [dataInfoUser, setDataInfoUser] = useState<DataUpdateInfoUser>({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        dob: user.dob,
        phone: user.phone,
        address: user.address,
    })
    const dispatch = useAppDispatch();


    function handleChangeInfoUser(e: any) {
        const nameInfo = e.target?.name;
        const value = e.target?.value;
        setDataInfoUser({
            ...dataInfoUser,
            [nameInfo]: value
        })
    }

    function handleChooseFile(e: any) {
        const file = e.target.files[0]
        if (file?.type?.includes("image/")) {
            let imgLink = URL.createObjectURL(file);
            setInfoImageFile({
                url: imgLink,
                file: file
            })
            const storageRef = ref(storage, `avatar/${user?.id}-${user?.username}/${convertTimeNumberToHHMMddmmYYYY(new Date().getTime())}/${file?.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDataInfoUser({
                            ...dataInfoUser,
                            avatar: url
                        })
                    });
                }
            );
        }
    }

    async function handleSubmitProfile() {
        if (isDisabled) {
            setIsDisabled(false);
        } else {
            setIsLoading(true);
            const dataUpdate: any = { ...dataInfoUser }
            updateInfoUser(dataUpdate)
                .then((res) => {
                    if (res.status === 200) {
                        setIsLoading(false);
                        dispatch(updateInfoUserReudx(dataUpdate))
                        setInfoUserToLocalStorage(dataUpdate);
                        setIsDisabled(true);
                        setDataSnackBar({
                            open: true,
                            message: "Cập nhật thành công"
                        })
                    }
                })
                .catch(err => {
                    setDataSnackBar({
                        open: true,
                        message: err?.response?.data?.message || "Cập nhật thất bại"
                    })
                    setIsLoading(false);
                })
        }
    }
    return (
        <>
            <h3 className="font-bold text-lg">Thông tin cá nhân</h3>
            <div className='w-full flex flex-col items-center'>
                <div className='flex items-center mt-5 mb-6'>
                    <div className="avatar mr-3">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <Image
                                width={96}
                                height={96}
                                src={infoImageFile.url || (dataInfoUser.avatar || AvatarDefault)}
                                alt=''
                            />
                        </div>
                    </div>
                    {!isDisabled &&
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            className='w-32'
                            startIcon={<CloudUploadIcon />}
                        >
                            Tải ảnh
                            <VisuallyHiddenInput type="file" onChange={handleChooseFile} />
                        </Button>}
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <PermContactCalendarIcon />
                        <input
                            type="text" className="grow" placeholder="Tạ Ngọc Trung" name="username"
                            value={dataInfoUser.username}
                            onChange={handleChangeInfoUser}
                            disabled={isDisabled}
                        />
                    </label>
                    <div className='flex mt-4'>
                        <select className="select select-bordered mr-2 flex-1" name="gender" disabled={isDisabled}
                            value={dataInfoUser.gender}
                            onChange={handleChangeInfoUser}
                        >
                            <option value={"Nam"}>Nam</option>
                            <option value={"Nữ"}>Nữ</option>
                            <option value={"Khác"}>Khác</option>
                        </select>
                        <label className="input input-bordered flex items-center gap-2 flex-1">
                            <input
                                type="date" className="grow" name="dob" disabled={isDisabled}
                                value={dataInfoUser.dob}
                                onChange={handleChangeInfoUser}
                            />
                        </label>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 mt-4">
                        <SmartphoneIcon />
                        <input
                            type="text" className="grow" placeholder="Số điện thoại" name="phone" disabled={isDisabled}
                            value={dataInfoUser.phone}
                            onChange={handleChangeInfoUser}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-4">
                        <EmailIcon />
                        <input type="text" className="grow" name='email' disabled
                            value={dataInfoUser.email}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-4">
                        <BusinessIcon />
                        <input type="text" className="grow" placeholder="Địa chỉ" name="address" disabled={isDisabled}
                            value={dataInfoUser.address}
                            onChange={handleChangeInfoUser}
                        />
                    </label>
                </div>
                <button
                    className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-5`}
                    onClick={handleSubmitProfile}
                >
                    {isLoading && <span className="loading loading-spinner"></span>}
                    {isDisabled ? "Chỉnh sửa" : "Cập nhật"}
                </button>
            </div>
        </>
    )
}

export default ModalProfile