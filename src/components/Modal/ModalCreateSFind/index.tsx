'use client'

import React, { useState } from 'react'
import AvatarGroup from "@/assets/images/defaultgroup.png";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/index';
import { selectDataUser, updateSfind } from '@/lib/features/controlData/controlDataSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createSfind } from '@/endpoint/sfind';


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

interface DataCreateSfind {
    nameSfind: string;
    avatar: string;
    password: string;
}

function ModalCreateSFind({ setDataSnackBar }: {
    setDataSnackBar: any
}) {

    const user = useAppSelector(selectDataUser)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [infoImageFile, setInfoImageFile] = useState({
        url: "",
        file: null,
    });
    const [dataSfind, setDataSfind] = useState<DataCreateSfind>({
        nameSfind: "",
        password: "",
        avatar: "",
    })

    function handleChangeSfind(e: any) {
        const nameInfo = e.target?.name;
        const value = e.target?.value;
        setDataSfind({
            ...dataSfind,
            [nameInfo]: value
        })
    }

    function handleChooseFile(e: any) {
        const file = e.target.files[0]
        console.log({ file });

        if (file?.type?.includes("image/")) {
            let imgLink = URL.createObjectURL(file);
            setInfoImageFile({
                url: imgLink,
                file: file
            })
            const storageRef = ref(storage, `avatarSfind/${user?.id}-${user?.username}/${new Date().getTime()}/${file?.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDataSfind({
                            ...dataSfind,
                            avatar: url
                        })
                    });
                }
            );
        }
    }

    async function handleSubmitCreateSfind() {
        setIsLoading(true);
        const dataUpdate: any = { ...dataSfind }
        createSfind(dataUpdate)
            .then((res) => {
                if (res.status === 200) {
                    setIsLoading(false);
                    setDataSnackBar({
                        open: true,
                        message: "Tạo Sfind thành công"
                    })
                    setDataSfind({
                        avatar: "",
                        nameSfind: "",
                        password: ""
                    })
                    dispatch(updateSfind(res.data?.data?.sfind))
                }
            })
            .catch(err => {
                setDataSnackBar({
                    open: true,
                    message: err?.response?.data?.message || "Tạo Sfind thất bại"
                })
                setIsLoading(false);
            })
    }
    return (
        <div className='h-auto'>
            <h3 className="font-bold text-lg">Tạo SFind mới</h3>
            <div className='w-full flex flex-col items-center'>
                {user?.id ?
                    <div className='flex items-center mt-5 mb-6'>
                        <div className="avatar mr-3">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <Image
                                    width={96}
                                    height={96}
                                    src={infoImageFile.url || (dataSfind.avatar || AvatarGroup)}
                                    alt=''
                                />
                            </div>
                        </div>
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
                        </Button>
                    </div> : <div className='mt-6'></div>}
                <label className="input input-bordered input-secondary flex items-center gap-2 w-full">
                    <SupervisedUserCircleIcon />
                    <input
                        type="text" className="grow" placeholder="Tên SFind (bắt buộc)..." name="nameSfind"
                        onChange={handleChangeSfind}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full mt-5">
                    <KeyIcon />
                    <input
                        type="text" className="grow" placeholder="Mật khẩu (tùy chọn)..." name="password"
                        onChange={handleChangeSfind}
                    />
                </label>
                <button
                    className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-5`}
                    onClick={handleSubmitCreateSfind}
                >
                    {isLoading && <span className="loading loading-spinner"></span>}
                    Tạo SFind
                </button>
            </div>

        </div>
    )
}

export default ModalCreateSFind