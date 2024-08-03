'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import AvatarDefault from "@/assets/images/avatarDefault.png";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectDataUser, updateInfoUser as updateInfoUserStore } from '@/lib/features/controlData/controlDataSlice';
import { Box, IconButton, Modal, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalProfile from '../Modal/ModalProfile';
import { getInfoUserFromLocalStorage, setInfoUserToLocalStorage } from '@/utils/handleLocal';
import { getInfoUser } from '@/endpoint/user';

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

function DropdownAccount() {

    const user = useAppSelector(selectDataUser)
    const [open, setOpen] = useState(false);
    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = getInfoUserFromLocalStorage();
        if (user?.id) {
            dispatch(updateInfoUserStore(user))
        } else {
            getInfoUser()
                .then((res) => {
                    dispatch(updateInfoUserStore(res.data?.data?.user))
                    setInfoUserToLocalStorage(res.data?.data?.user);
                })
                .catch((err) => {
                    console.log(err);

                })
        }
    }, [dispatch]);

    const handleClose = () => {
        setOpen(false);
    }

    function handleOpenModalProfile() {
        setOpen(true)
    }
    function handleOpenModalLogout() {
        let item: any = document.getElementById('modalLogout');
        item?.showModal()
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
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className='flex' >
                    <div className="w-10 h-10 tablet:w-12 tablet:h-12">
                        <Image
                            src={user?.avatar || AvatarDefault}
                            width={50}
                            height={50}
                            className="w-full h-full rounded-full object-cover"
                            alt=""
                        />
                    </div>
                    <div className="hidden tablet:block ml-2">
                        <h2 className="text-lg font-bold">{user?.username}</h2>
                        <p className="text-sm text-slate-600">Người dùng hệ thống</p>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><div onClick={() => handleOpenModalProfile()} > <AccountCircleIcon /> Thông tin cá nhân</div></li>
                    <li><div onClick={() => handleOpenModalLogout()} > <LogoutIcon /> Đăng xuất</div></li>
                </ul>
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
                            <ModalProfile setDataSnackBar={setDataSnackBar} />
                        </div>
                    </Box>
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={dataSnackBar.open}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackBar}
                        message={dataSnackBar.message}
                        action={action}
                    />
                </>
            </Modal>
        </div>
    )
}

export default DropdownAccount