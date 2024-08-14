'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import GroupDefault from "@/assets/images/defaultgroup.png";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectDataMessage, selectDataSfind, selectDataUser } from '@/lib/features/controlData/controlDataSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/index';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { updateSfinds } from '@/endpoint/sfind';
import { updateSfinds as updateSfindsStore } from '@/lib/features/controlData/controlDataSlice';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { convertTimeNumberToHHMMddmmYYYYV2 } from '@/utils/handleTime';
Chart.register(CategoryScale);

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

function ModalInfoSFind({ sfind }: { sfind: any }) {

    const user = useAppSelector(selectDataUser)
    const messages = useAppSelector(selectDataMessage)
    const sfinds = useAppSelector(selectDataSfind)
    const dispatch = useAppDispatch();

    let totalFile = 0;
    let totalImage = 0;
    let totalText = 0;

    messages?.forEach((item: any) => {
        if (item?.type === "text") {
            totalText += 1;
        } else if (item?.type === "image") {
            totalImage += item?.files?.length;
        } else if (item?.type === "file") {
            totalFile += item?.files?.length;
        }
    })

    const [chartData, setChartData] = useState({
        labels: ['Văn bản', 'Hình ảnh', 'File'],
        datasets: [{
            data: [totalText, totalImage, totalFile],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ]
        }]
    });

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSfind, setDataSfind] = useState<any>({
        nameSfind: sfind?.nameSfind,
        password: sfind?.password,
        avatar: sfind?.avatar,
    })
    const [infoImageFile, setInfoImageFile] = useState({
        url: "",
        file: null,
    });
    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });

    function handleSfindsStore() {
        let dataSfinds: any = [...sfinds];
        let newSfind = {}
        let indexSfind = 0;
        for (let i = 0; i < dataSfinds?.length; i++) {
            if (dataSfinds[i]?._id === sfind?._id) {
                newSfind = {
                    ...dataSfinds[i],
                    avatar: dataSfind?.avatar,
                    nameSfind: dataSfind?.nameSfind,
                };
                indexSfind = i
            }
        }
        dataSfinds?.splice(indexSfind, 1, newSfind);
        dispatch(updateSfindsStore(dataSfinds))
    }

    function handleChooseFile(e: any) {
        const file = e.target.files[0]
        if (file?.type?.includes("image/")) {
            let imgLink = URL.createObjectURL(file);
            setInfoImageFile({
                url: imgLink,
                file: file
            })
            const storageRef = ref(storage, `avatarSfind/${user?.id}-${user?.username}/${convertTimeNumberToHHMMddmmYYYYV2(new Date().getTime())}/${file?.name}`);
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

    function handleChangeInfoSfind(e: any) {
        const nameInfo = e.target?.name;
        const value = e.target?.value;
        setDataSfind({
            ...dataSfind,
            [nameInfo]: value
        })
    }

    function handleSubmitUpdateSfind() {
        if (isDisabled) {
            setIsDisabled(false);
        } else {
            setIsLoading(true);
            updateSfinds(sfind?._id, dataSfind)
                .then((res) => {
                    handleSfindsStore();
                    setIsDisabled(true);
                    setDataSnackBar({
                        open: true,
                        message: "Cập nhật thành công"
                    })
                })
                .catch(err => {
                    setDataSnackBar({
                        open: true,
                        message: err?.response?.data?.message || "Cập nhật thất bại"
                    })
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setDataSnackBar({
            open: false,
            message: ""
        });
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <div role="tablist" className="tabs tabs-bordered mt-5">
                <input
                    type="radio" name="my_tabs_2" role="tab"
                    className="tab text-sm font-bold min-w-[120px]" aria-label="Thông tin"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 p-3 overflow-scroll scrollbar-none">
                    <div className='flex items-center mt-5 mb-6'>
                        <div className="avatar mr-3">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <Image
                                    width={96}
                                    height={96}
                                    src={infoImageFile.url || (dataSfind?.avatar || GroupDefault)}
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
                            <input
                                type="text" className="grow" placeholder="Tên sfind" name="nameSfind"
                                value={dataSfind?.nameSfind}
                                onChange={handleChangeInfoSfind}
                                disabled={isDisabled}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mt-4">
                            <input
                                type="text" className="grow" placeholder="Mật khẩu..." name="password" disabled={isDisabled}
                                value={dataSfind?.password}
                                onChange={handleChangeInfoSfind}
                            />
                        </label>
                    </div>
                    <button
                        className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-5`}
                        onClick={handleSubmitUpdateSfind}
                    >
                        {isLoading && <span className="loading loading-spinner"></span>}
                        {isDisabled ? "Chỉnh sửa" : "Cập nhật"}
                    </button>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab text-sm font-bold min-w-[100px]"
                    aria-label="Dữ liệu"
                />
                <div role="tabpanel" className="tab-content bg-base-100 p-3">
                    <div>Tổng cộng: <b>{messages?.length} tin nhắn</b> gồm: </div>
                    <Pie data={chartData} className='mt-5' />
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={dataSnackBar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                message={dataSnackBar.message}
                action={action}
            />
        </>
    )
}

export default ModalInfoSFind