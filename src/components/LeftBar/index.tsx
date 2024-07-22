'use client'

import React, { memo, useEffect, useState } from 'react'
import ModalCreateSFind from '../Modal/ModalCreateSFind'
import SFindItem from '../SFindItem'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Box, IconButton, Modal, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { getSfinds } from '@/endpoint/sfind'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import CachedSharpIcon from '@mui/icons-material/CachedSharp';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectDataSfind, updateSfinds } from '@/lib/features/controlData/controlDataSlice'
import LeftBarSkeleton from '../Skeleton/LeftBarSkeleton'

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
            getSfinds()
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
    function handleClickSFindItem(id: string) {
        router.push("/sfind?id=" + id);
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
            <div className="w-[15%] tablet:w-52 laptop:w-72 desktop:w-112 h-full border-r-[1px] border-r-slate-300">
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
                        <div
                            key={index}
                            onClick={() => handleClickSFindItem(item?._id)}
                        >
                            <SFindItem
                                avatarSfind={item?.avatar}
                                lastActionSfind={item?.lastAction}
                                nameSfind={item?.nameSfind}
                                active={item?._id === sfindId ? true : false}
                            />
                        </div>))}
                    {isLoading && <LeftBarSkeleton />}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl !h-auto w-[90%] tablet:w-[450px]'>
                        <div className='mt-2'>
                            <ModalCreateSFind setDataSnackBar={setDataSnackBar} />
                        </div>
                    </Box>
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={dataSnackBar.open}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackBar}
                        message={dataSnackBar.message}
                        action={action}
                    />
                </>
            </Modal>
        </>
    )
}

export default memo(LeftBar)