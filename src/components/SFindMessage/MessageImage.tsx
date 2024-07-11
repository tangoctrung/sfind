'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import NoImage from '@/assets/images/noImage.jpg';
import Zoom from 'react-medium-image-zoom'
import Download from '@mui/icons-material/Download';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { downloadFile } from '@/utils/handleFile';

function MessageImage({ images }: { images: string[] }) {

    const [currentIndexImage, setCurrentIndexImage] = useState<number>(1);

    function handleOpenModalListImageSFind() {
        setCurrentIndexImage(1);
        let item: any = document.getElementById('modalListImageSFind');
        item?.showModal();
    }

    function handleDownloadImage(e: any) {
        e.preventDefault();
        console.log(e.target.href);
        downloadFile(e, "image.png");
    }

    function handlePreviousImage() {
        if (currentIndexImage === 1) {
            setCurrentIndexImage(images.length)
        } else {
            setCurrentIndexImage(i => i - 1);
        }
    }

    function handleNextImage() {
        if (currentIndexImage === images.length) {
            setCurrentIndexImage(1)
        } else {
            setCurrentIndexImage(i => i + 1);
        }
    }

    if (images?.length <= 0) {
        return (
            <div className='max-w-[90%] mt-20 flex justify-end relative cursor-pointer'>
                <p className='absolute w-full text-center top-[-40px] text-sm text-gray-400'>11:20 20/03/2022</p>
                <div className=' h-72 w-56 overflow-hidden rounded-xl'>
                    <Image
                        src={NoImage}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
            </div>
        )
    }

    if (images?.length === 1) {
        return (
            <div
                className='h-72 max-w-[90%] mt-20 flex justify-end items-center relative cursor-pointer'
                onClick={() => handleOpenModalListImageSFind()}
            >
                <p className='absolute w-full text-center top-[-40px] text-sm text-gray-400'>11:20 20/03/2022</p>
                <div className=' h-72 w-56 overflow-hidden rounded-xl'>
                    <Image
                        src={images[0]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
            </div>
        )
    }

    if (images?.length === 2) {
        return (
            <div
                className='h-60 max-w-[90%] mt-20 flex justify-end items-center relative cursor-pointer'
                onClick={() => handleOpenModalListImageSFind()}
            >
                <p className='absolute w-full text-center top-[-2rem] text-sm text-gray-400'>11:20 20/03/2022</p>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[-10px]  rotate-[5deg]'>
                    <Image
                        src={images[0]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[10px] rotate-[-5deg]'>
                    <Image
                        src={images[1]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
            </div>
        )
    }

    if (images?.length === 3) {
        return (
            <div
                className='h-60 max-w-[90%] mt-28 flex justify-end items-center relative cursor-pointer'
                onClick={() => handleOpenModalListImageSFind()}
            >
                <p className='absolute w-full text-center top-[-3.5rem] text-sm text-gray-400'>11:20 20/03/2022</p>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[-10px] top-[-10px]  rotate-[5deg]'>
                    <Image
                        src={images[2]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[10px] top-[-10px] rotate-[-5deg]'>
                    <Image
                        src={images[1]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute'>
                    <Image
                        src={images[0]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <div
                className='h-60 max-w-[90%] mt-24 flex justify-end items-center relative cursor-pointer'
                onClick={() => handleOpenModalListImageSFind()}
            >
                <p className='absolute w-full text-center top-[-4rem] text-sm text-gray-400'>11:20 20/03/2022</p>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute top-[-20px]'>
                    <Image
                        src={images[3]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[-10px] top-[-12px] rotate-[3deg]'>
                    <Image
                        src={images[2]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute right-[10px] top-[-10px] rotate-[-3deg]'>
                    <Image
                        src={images[1]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='h-52 w-52 overflow-hidden rounded-xl absolute'>
                    <Image
                        src={images[0]}
                        width={600}
                        height={600}
                        className='w-full h-full object-cover'
                        alt=''
                    />
                </div>
            </div>
            <dialog id="modalListImageSFind" className="modal">
                <div className="modal-box h-[100%] relative">
                    <h3 className="font-bold text-lg">Danh sách ảnh</h3>
                    <div role="tablist" className="tabs tabs-boxed mt-5 h-[90%] flex justify-center items-center">
                        <div className='max-w-full relative'>
                            <Zoom>
                                <Image
                                    src={images[currentIndexImage - 1]}
                                    // src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    width={3000}
                                    height={3000}
                                    alt=''
                                    className='w-full'
                                />
                            </Zoom>
                            <Link
                                href={images[currentIndexImage - 1]}
                                className='absolute top-2 right-2 p-2 rounded-lg bg-slate-300/40 hover:bg-slate-300'
                                onClick={(e: any) => handleDownloadImage(e)}
                            >
                                <Download />
                            </Link>
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
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    )
}

export default MessageImage