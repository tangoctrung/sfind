'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import NoImage from '@/assets/images/noImage.jpg';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Modal } from '@mui/material';
import Download from '@mui/icons-material/Download';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { downloadFile } from '@/utils/handleFile';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { convertTimeToHHMMddmmYYYY } from '@/utils/handleTime';

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

function MessageImage({ message, handleActionMessage }:
    { message: any, handleActionMessage: any }) {
    const [open, setOpen] = React.useState(false);
    const [openModalDeleteMessage, setOpenModalDeleteMessage] = React.useState(false);
    const [isLoadingDeleteMessage, setIsLoadingDeleteMessage] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCurrentIndexImage(1);
    }
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(1);

    function handleDownloadImage(fileImage: any) {
        downloadFile(fileImage?.urlFile, fileImage?.nameFile);
    }

    function handlePreviousImage() {
        if (currentIndexImage === 1) {
            setCurrentIndexImage(message?.files?.length)
        } else {
            setCurrentIndexImage((i: number) => i - 1);
        }
    }

    function handleNextImage() {
        if (currentIndexImage === message?.files?.length) {
            setCurrentIndexImage(1)
        } else {
            setCurrentIndexImage((i: number) => i + 1);
        }
    }

    async function handleDeleteMessage() {
        setIsLoadingDeleteMessage(true)
        await handleActionMessage("delete", message)
        setIsLoadingDeleteMessage(false)
        setOpenModalDeleteMessage(false)
    }

    return (
        <>
            <div
                className={`h-auto w-full flex flex-col justify-center items-end p-5`}
            >
                <p
                    className={`w-full text-center text-sm text-gray-400 mb-8 cursor-cell tooltip`}
                    data-tip={message?.content}
                >{convertTimeToHHMMddmmYYYY(message?.updatedAt)}</p>
                {message?.files?.length <= 0 &&
                    <div className=' h-72 w-56 overflow-hidden rounded-xl'>
                        <Image
                            src={NoImage}
                            width={300}
                            height={300}
                            className='w-full h-full object-cover'
                            alt=''
                        />
                    </div>}
                {message?.files?.length === 1 &&
                    <div
                        className=' h-72 w-56 overflow-hidden rounded-xl cursor-pointer'
                        onClick={handleOpen}>
                        <Image
                            src={message?.files[0]?.urlFile}
                            width={300}
                            height={300}
                            className='w-full h-full object-cover'
                            alt=''
                        />
                    </div>}
                {message?.files?.length === 2 &&
                    <div className='flex justify-end relative w-full h-52'>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-5deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={message?.files[1]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl rotate-[5deg] absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={message?.files[0]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>}
                {message?.files?.length === 3 &&
                    <div className='flex justify-end relative w-full h-52'>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[3deg] top-[-10px] right-[-10px] absolute'>
                            <Image
                                src={message?.files[2]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-3deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={message?.files[1]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={message?.files[0]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>
                }
                {message?.files?.length >= 4 &&
                    <div className='flex justify-end relative w-full h-52' >
                        <div className='h-52 w-52 overflow-hidden rounded-xl top-[-20px] absolute'>
                            <Image
                                src={message?.files[3]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[3deg] top-[-10px] right-[-10px] absolute'>
                            <Image
                                src={message?.files[2]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-3deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={message?.files[1]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={message?.files[0]?.urlFile}
                                width={300}
                                height={300}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>
                }
                <div className='mr-5 mt-2 flex justify-end'>
                    <div
                        className='cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-300 mr-2 flex items-center justify-center'
                        onClick={() => setOpenModalDeleteMessage(true)}
                    ><DeleteIcon className='w-4 h-4' /></div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll bg-slate-400 scrollbar-none rounded-xl h-[90%] w-[90%] tablet:h-[96%] tablet:w-[400px] laptop:w-[450px]'>
                    <div className='flex tablet:hidden justify-between items-center'>
                        <h3 className="font-bold text-lg">Danh sách ảnh</h3>
                        <CloseIcon
                            className='w-8 h-8 cursor-pointer'
                            onClick={handleClose}
                        />
                    </div>
                    <div role="tablist" className="tabs tabs-boxed mt-5 h-[96%] bg-slate-400 flex justify-center items-center ">
                        <div className='max-w-full relative'>
                            <TransformWrapper>
                                <TransformComponent>
                                    <Image
                                        src={message?.files[currentIndexImage - 1]?.urlFile}
                                        width={3000}
                                        height={3000}
                                        alt=''
                                        className='max-w-full max-h-full w-full'
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                            <div
                                className='absolute top-2 right-2 p-1 rounded-lg bg-slate-300/40 hover:bg-slate-300 cursor-pointer'
                                onClick={() => handleDownloadImage(message?.files[currentIndexImage - 1])}
                            >
                                <Download />
                            </div>
                            <span className='absolute bottom-2 left-[50%] translate-x-[-50%] text-white/70 font-bold'>{currentIndexImage}/{message?.files?.length}</span>
                        </div>
                    </div>
                    <div
                        className='absolute top-[50%] left-1 cursor-pointer'
                        onClick={handlePreviousImage}
                    >
                        <ArrowBackIosIcon />
                    </div>
                    <div
                        className='absolute top-[50%] right-0 cursor-pointer'
                        onClick={handleNextImage}
                    >
                        <ArrowForwardIosIcon />
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModalDeleteMessage}
                onClose={() => setOpenModalDeleteMessage(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl w-[95%] tablet:w-[400px] h-auto !py-5 !px-5'>
                    <h3>Bạn có chắc muốn xóa message này không?</h3>
                    <div className='mt-2 flex justify-center'>
                        <button className={`btn ${isLoadingDeleteMessage ? "btn-disabled" : "btn-normal"} mr-5`}
                            onClick={() => setOpenModalDeleteMessage(false)}
                        >
                            Quay lại
                        </button>
                        <button className={`btn ${isLoadingDeleteMessage ? "btn-disabled" : "btn-neutral"}`}
                            onClick={handleDeleteMessage}
                        >
                            {isLoadingDeleteMessage ? <span className="loading loading-spinner"></span> : "Xóa"}

                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default MessageImage