import React from 'react'
import TopicIcon from '@mui/icons-material/Topic';
import Download from '@mui/icons-material/Download';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { downloadFile } from '@/utils/handleFile';
import Link from 'next/link';

function MessageFile() {

    // function handleDownloadFile(url: string) {
    //     downloadFile(url, "file.docx");
    // }

    return (
        <div
            className='max-w-[90%] mt-20 max-h-fit flex items-end flex-col relative cursor-pointer'
        >
            <p className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400'>11:20 20/03/2022</p>
            <div className='w-[80%] tablet:w-[70%] laptop:w-[50%] mb-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'>
                <div className=''>
                    <TopicIcon className='w-10 h-10 mr-2 text-blue-500' />
                </div>
                <div>
                    <span className='text-base font-bold line-clamp-3 underline'>Danh sách điểm rèn luyện khóa K64-N.docx</span>
                    <p className='text-slate-500 text-sm'>1.35 mb</p>
                </div>
            </div>
            <Link
                href={"https://firebasestorage.googleapis.com/v0/b/storagefile-8768a.appspot.com/o/floderTest%2FB%C3%A1o%20c%C3%A1o%20OOAD.docx?alt=media&token=74b30bb1-06f1-4790-ac9b-b0a9c3a6cf8e"}
                className='w-[80%] tablet:w-[70%] laptop:w-[50%] mb-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'
            // onClick={() => handleDownloadFile("https://firebasestorage.googleapis.com/v0/b/storagefile-8768a.appspot.com/o/floderTest%2FB%C3%A1o%20c%C3%A1o%20OOAD.docx?alt=media&token=74b30bb1-06f1-4790-ac9b-b0a9c3a6cf8e")}
            >
                <div className=''>
                    <FolderZipIcon className='w-10 h-10 mr-2 text-yellow-500' />
                </div>
                <div>
                    <span className='text-base font-bold line-clamp-3 underline'>Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip Danh sách điểm rèn luyện khóa K64-N.zip</span>
                    <p className='text-slate-500 text-sm'>2.35 mb</p>
                </div>
            </Link>
        </div>
    )
}

export default MessageFile