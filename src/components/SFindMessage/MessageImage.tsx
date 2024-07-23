'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import NoImage from '@/assets/images/noImage.jpg';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import Download from '@mui/icons-material/Download';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { downloadFile } from '@/utils/handleFile';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

function MessageImage({ images }: { images: string[] }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCurrentIndexImage(1);
    }
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(1);

    function handleDownloadImage(url: string) {
        downloadFile("https://firebasestorage.googleapis.com/v0/b/storagefile-8768a.appspot.com/o/floderTest%2Fadmin%20-%20so%20luot%20kham.png?alt=media&token=491b058f-4c7b-42fc-9acc-bd61315f2fb5", "image.png");
    }

    function handlePreviousImage() {
        if (currentIndexImage === 1) {
            setCurrentIndexImage(images.length)
        } else {
            setCurrentIndexImage((i: number) => i - 1);
        }
    }

    function handleNextImage() {
        if (currentIndexImage === images.length) {
            setCurrentIndexImage(1)
        } else {
            setCurrentIndexImage((i: number) => i + 1);
        }
    }

    return (
        <>
            <div
                className={`h-auto w-full flex flex-col justify-center items-end p-5`}

            >
                <p
                    className={`w-full text-center text-sm text-gray-400 mb-8`}
                >11:20 20/03/2022</p>
                {images?.length <= 0 &&
                    <div className=' h-72 w-56 overflow-hidden rounded-xl'>
                        <Image
                            src={NoImage}
                            width={600}
                            height={600}
                            className='w-full h-full object-cover'
                            alt=''
                        />
                    </div>}
                {images?.length === 1 &&
                    <div
                        className=' h-72 w-56 overflow-hidden rounded-xl cursor-pointer'
                        onClick={handleOpen}>
                        <Image
                            src={images[0]}
                            width={600}
                            height={600}
                            className='w-full h-full object-cover'
                            alt=''
                        />
                    </div>}
                {images?.length === 2 &&
                    <div className='flex justify-end relative w-full h-52'>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-5deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={images[1]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl rotate-[5deg] absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={images[0]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>}
                {images?.length === 3 &&
                    <div className='flex justify-end relative w-full h-52'>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[3deg] top-[-10px] right-[-10px] absolute'>
                            <Image
                                src={images[2]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-3deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={images[1]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={images[0]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>
                }
                {images?.length >= 4 &&
                    <div className='flex justify-end relative w-full h-52'>
                        <div className='h-52 w-52 overflow-hidden rounded-xl top-[-20px] absolute'>
                            <Image
                                src={images[3]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[3deg] top-[-10px] right-[-10px] absolute'>
                            <Image
                                src={images[2]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div className='h-52 w-52 overflow-hidden rounded-xl rotate-[-3deg] top-[-10px] right-[10px] absolute'>
                            <Image
                                src={images[1]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                        <div
                            className='h-52 w-52 cursor-pointer overflow-hidden rounded-xl absolute'
                            onClick={handleOpen}
                        >
                            <Image
                                src={images[0]}
                                width={600}
                                height={600}
                                className='w-full h-full object-cover'
                                alt=''
                            />
                        </div>
                    </div>
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl h-[90%] w-[90%] tablet:h-[90%] tablet:w-[450px] laptop:w-[500px]'>
                    <div className='flex justify-between items-center'>
                        <h3 className="font-bold text-lg">Danh sách ảnh</h3>
                        <CloseIcon
                            className='w-8 h-8 cursor-pointer'
                            onClick={handleClose}
                        />
                    </div>
                    <div role="tablist" className="tabs tabs-boxed mt-5 h-[90%] flex justify-center items-center">
                        <div className='max-w-full relative'>
                            <TransformWrapper>
                                <TransformComponent>
                                    <Image
                                        src={images[currentIndexImage - 1]}
                                        width={3000}
                                        height={3000}
                                        alt=''
                                        className='max-w-full max-h-full w-full'
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                            <div
                                className='absolute top-2 right-2 p-2 rounded-lg bg-slate-300/40 hover:bg-slate-300'
                                onClick={() => handleDownloadImage(images[currentIndexImage - 1])}
                            >
                                <Download />
                            </div>
                            <span className='absolute bottom-2 left-[50%] translate-x-[-50%] text-white/70 font-bold'>{currentIndexImage}/{images?.length}</span>
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
        </>
    )
}

export default MessageImage