'use client'
import React, { useEffect, useState } from 'react'
import ModalInfoSFind from '../Modal/ModalInfoSFind'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Modal } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { getSfinds } from '@/endpoint/sfind';

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

function TopBarSFind({ setText }: { setText: any }) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const sfindId = searchParams.get("id");
    const [sfind, setSfind] = useState<any>("")
    const [textSearch, setTextSearch] = useState("");

    useEffect(() => {
        getSfinds(sfindId || "nosfind")
            .then(res => {
                setSfind(res.data?.data?.sfind);
            })
            .catch(err => {
                console.log(err);
                if (err?.response?.status === 400) {
                }
            })
    }, [dispatch, sfindId])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setText(textSearch);
        }, 500)
        return () => clearTimeout(timeOut);
    }, [dispatch, setText, textSearch])

    const handleClose = () => {
        setOpen(false);
    }

    function handleOpenModalInfoSfind() {
        setOpen(true)
    }

    function handleChangeTextSearch(e: any) {
        setTextSearch(e.target.value);
    }
    return (
        <div className="h-full w-full flex justify-center items-center">
            <label className="input input-bordered flex items-center gap-2 h-10 w-auto tablet:min-w-64 laptop:min-w-80">
                <input
                    type="text" className="grow" placeholder="Tìm kiếm message...."
                    value={textSearch}
                    onChange={handleChangeTextSearch}
                />
                <SearchIcon />
            </label>
            <div className="p-2 cursor-pointer bg-slate-300 rounded-md ml-5" onClick={() => handleOpenModalInfoSfind()} >
                <InfoIcon />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl h-auto w-[95%] tablet:w-[450px] !py-2 !px-3'>
                    <div className='mt-2'>
                        <ModalInfoSFind sfind={sfind} />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default TopBarSFind