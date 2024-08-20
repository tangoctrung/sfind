'use client'

import React, { memo, useEffect, useState } from 'react'
import ModalCreateSFind from '../Modal/ModalCreateSFind'
import SFindItem from '../SFindItem'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, IconButton, Modal, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { deleteSfinds, getSfinds } from '@/endpoint/sfind'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import CachedSharpIcon from '@mui/icons-material/CachedSharp';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectDataSfind, updateSfinds } from '@/lib/features/controlData/controlDataSlice'
import LeftBarSkeleton from '../Skeleton/LeftBarSkeleton'
import DeleteIcon from '@mui/icons-material/Delete';
import NoData from "@/assets/images/nodata.png";
import Image from 'next/image'
import { KEY_LOCAL } from '@/types/keyLocal'

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


function LeftBar() {

    const sfinds = useAppSelector(selectDataSfind)
    const [dataSfinds, setDataSfinds] = useState<any[]>(sfinds)
    const searchParams = useSearchParams();
    const sfindId = searchParams.get("id");
    const dispatch = useAppDispatch();

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalDeleteSfind, setOpenModalDeleteSfind] = useState(false);
    const [isLoadingDeleteSfind, setIsLoadingDeleteSfind] = useState(false)
    const [sfindIdDelete, setSfindIdDelete] = useState("");
    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });

    useEffect(() => {
        setDataSfinds(sfinds);

    }, [sfinds])

    useEffect(() => {
        if (sfinds?.length <= 0) {
            setIsLoading(true)
            getSfinds("")
                .then(res => {
                    setDataSfinds(res.data?.data?.sfinds)
                    dispatch(updateSfinds(res.data?.data?.sfinds))
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log({ err });
                    setIsLoading(false)
                })
        }
    }, [dispatch, sfinds?.length])

    const handleClose = () => {
        setOpen(false);
    }
    function handleRefreshSfinds() {
        let data: any = []
        dispatch(updateSfinds(data))
    }
    function handleOpenModalCreateSFind() {
        setOpen(true);
    }
    function handleOpenModalDeleteSfind(sfindId: string) {
        setOpenModalDeleteSfind(true);
        setSfindIdDelete(sfindId);
    }
    function handleClickSFindItem(id: string, nameSfind: string) {
        router.push("/sfind?id=" + id);
        sessionStorage.setItem(KEY_LOCAL.NAME_SFIND, nameSfind);
    }

    function handleDeleteSfind() {
        setIsLoadingDeleteSfind(true);
        deleteSfinds(sfindIdDelete)
            .then(() => {
                let dataSfind: any = dataSfinds?.filter((item: any) => item?._id !== sfindIdDelete)
                dispatch(updateSfinds(dataSfind))
            })
            .catch(err => {
                console.log({ err });
                setDataSnackBar({
                    open: true,
                    message: err?.response?.data?.message || "Xoá Sfind thất bại"
                })
            })
            .finally(() => {
                setIsLoadingDeleteSfind(false);
                setOpenModalDeleteSfind(false);
                setDataSnackBar({
                    open: true,
                    message: "Xoá Sfind thành công"
                })
            })
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
            <div className="w-full h-full border-r-[1px]">
                <div className="w-full h-10 flex justify-center items-center pt-2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button">
                            <SettingsSharpIcon className="!w-9 !h-9 cursor-pointer" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><div onClick={() => handleOpenModalCreateSFind()} > <GroupAddIcon /> Tạo Sfind</div></li>
                            <li><div onClick={handleRefreshSfinds}> <CachedSharpIcon /> Làm mới Sfind</div></li>
                        </ul>
                    </div>
                </div>
                <div className="scrollbar-none w-[98%] overflow-y-scroll h-[calc(100%-2.5rem)]">
                    {!isLoading && dataSfinds && dataSfinds?.map((item: any, index: number) => (
                        <div key={index} className='relative group'>
                            <div
                                onClick={() => handleClickSFindItem(item?._id, item?.nameSfind)}
                            >
                                <SFindItem
                                    avatarSfind={item?.avatar}
                                    nameSfind={item?.nameSfind}
                                    active={item?._id === sfindId ? true : false}
                                />
                            </div>
                            <div
                                className='absolute right-0 top-[50%] translate-y-[-50%] hidden group-hover:flex items-center justify-center cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-200 mr-2'
                                onClick={() => handleOpenModalDeleteSfind(item?._id)}
                            >
                                <DeleteIcon className='w-4 h-4' />
                            </div>
                        </div>
                    ))}
                    {!isLoading && dataSfinds?.length <= 0 &&

                        <div className='hidden tablet:block  mt-20'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <Image
                                    src={NoData}
                                    width={100}
                                    height={100}
                                    alt=''
                                />
                                <p className="text-gray-400">Không có dữ liệu</p>
                                <div className="text-gray-400 text-center mt-6">
                                    Hãy tạo Sfind mới bằng cách click vào icon
                                    <SettingsSharpIcon className="!w-6 !h-6 text-black ml-2" />
                                </div>
                            </div>
                        </div>}
                    {isLoading && <LeftBarSkeleton />}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl !h-auto w-[90%] tablet:w-[450px]'>
                    <div className='mt-2'>
                        <ModalCreateSFind setDataSnackBar={setDataSnackBar} />
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openModalDeleteSfind}
                onClose={() => setOpenModalDeleteSfind(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl w-[95%] tablet:w-[400px] h-auto !py-5 !px-5'>
                    <h3>Bạn có chắc muốn xóa Sfind này không?</h3>
                    <div className='mt-2 flex justify-center'>
                        <button className={`btn ${isLoadingDeleteSfind ? "btn-disabled" : "btn-normal"} mr-5`}
                            onClick={() => setOpenModalDeleteSfind(false)}
                        >
                            Quay lại
                        </button>
                        <button className={`btn ${isLoadingDeleteSfind ? "btn-disabled" : "btn-neutral"}`}
                            onClick={handleDeleteSfind}
                        >
                            {isLoadingDeleteSfind ? <span className="loading loading-spinner"></span> : "Xóa"}

                        </button>

                    </div>
                </Box>
            </Modal>
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

export default memo(LeftBar)