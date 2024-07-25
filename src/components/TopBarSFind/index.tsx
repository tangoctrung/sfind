'use client'
import React, { useEffect, useState } from 'react'
import ModalInfoSFind from '../Modal/ModalInfoSFind'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Modal } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectTextSearch, updateTextSearch } from '@/lib/features/controlData/controlDataSlice';

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

function TopBarSFind() {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const sfindId = searchParams.get("id");
    const textSearch = useAppSelector(selectTextSearch)
    const dispatch = useAppDispatch();
    const [text, setText] = useState<any>("")

    useEffect(() => {
        setText("");
    }, [sfindId])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(updateTextSearch(text))
        }, 500)
        return () => clearTimeout(timeOut);
    }, [dispatch, text])

    const handleClose = () => {
        setOpen(false);
    }

    function handleOpenModalInfoSfind() {
        setOpen(true)
    }

    function handleChangeTextSearch(e: any) {
        setText(e.target.value);
    }
    return (
        <div className="w-[85%] tablet:w-[calc(100%-13rem)] flex justify-center items-center">
            <label className="input input-bordered flex items-center gap-2 h-10 w-auto tablet:min-w-64 laptop:min-w-80">
                <input
                    type="text" className="grow" placeholder="Tìm kiếm message...."
                    value={text}
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
                <>
                    <Box sx={style} className='overflow-scroll scrollbar-none !h-[50%] rounded-xl w-[95%] tablet:w-[450px]'>
                        <div className='mt-2'>
                            <ModalInfoSFind />
                        </div>
                    </Box>
                </>
            </Modal>

        </div>
    )
}

export default TopBarSFind