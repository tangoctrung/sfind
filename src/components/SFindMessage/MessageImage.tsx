import Image from 'next/image'
import React from 'react'
import NoImage from '@/assets/images/noImage.jpg';

function MessageImage({ images }: { images: string[] }) {

    if (images?.length <= 0) {
        return (
            <div className='max-w-[90%] mt-10 flex justify-end relative cursor-pointer'>
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
            <div className='h-72 max-w-[90%] mt-10 flex justify-end items-center relative cursor-pointer'>
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
            <div className='h-60 max-w-[80%] laptop:max-w-[90%] mt-10 flex justify-end items-center relative cursor-pointer'>
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
            <div className='h-60 max-w-[80%] laptop:max-w-[90%] mt-10 flex justify-end items-center relative cursor-pointer'>
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
        <div className='h-60 max-w-[80%] laptop:max-w-[90%] mt-10 flex justify-end items-center relative cursor-pointer'>
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
    )
}

export default MessageImage