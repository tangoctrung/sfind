import React from 'react'
import TopicIcon from '@mui/icons-material/Topic';
import Download from '@mui/icons-material/Download';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import Link from 'next/link';
import { downloadFile } from '@/utils/handleFile';

function MessageFile() {

    function handleDownloadFile(e: any) {
        e.preventDefault();
        console.log(e.target.href);
        downloadFile(e, "image");
    }

    return (
        <div
            className='max-w-[90%] mt-20 max-h-fit flex items-end flex-col relative cursor-pointer'
        >
            <p className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400'>11:20 20/03/2022</p>
            <div className='w-[80%] tablet:w-[70%] laptop:w-[50%] group/item1 mb-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'>
                <div className=''>
                    <TopicIcon className='w-10 h-10 mr-2 text-blue-500' />
                </div>
                <div>
                    <span className='text-base font-bold line-clamp-3 underline'>Danh sách điểm rèn luyện khóa K64-N.docx</span>
                    <p className='text-slate-500 text-sm'>1.35 mb</p>
                </div>
                <div className='hidden group-hover/item1:block absolute top-0 right-0'>
                    <Download />
                </div>
            </div>
            <Link
                className='w-[80%] tablet:w-[70%] laptop:w-[50%] group/item2 mb-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'
                href={"https://docs.google.com/spreadsheets/d/1UxrsJEeQu-z5wldFsiJj2egDtax3h9aT6i2pC2QoiZc/edit?usp=sharing"}
                onClick={(e: any) => handleDownloadFile(e)}
            >
                <div className=''>
                    <FolderZipIcon className='w-10 h-10 mr-2 text-yellow-500' />
                </div>
                <div>
                    <span className='text-base font-bold line-clamp-3 underline'>Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip</span>
                    <p className='text-slate-500 text-sm'>2.35 mb</p>
                </div>
                <div className='hidden  group-hover/item2:block absolute top-0 right-0'>
                    <Download />
                </div>
            </Link>
        </div>
    )
}

export default MessageFile