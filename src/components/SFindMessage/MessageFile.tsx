import React from 'react'
import Download from '@mui/icons-material/Download';
import TopicIcon from '@mui/icons-material/Topic';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { downloadFile, formatShowSizeFile } from '@/utils/handleFile';
import Link from 'next/link';
import { convertTimeToHHMMddmmYYYY } from '@/utils/handleTime';
import IconFileZip from '@/assets/icons/IconFileZip';
import IconFileDocx from '@/assets/icons/IconFileDocx';
import IconFilePDF from '@/assets/icons/IconFilePdf';
import IconFileExcel from '@/assets/icons/IconFileExcel';
import IconFileText from '@/assets/icons/IconFileText';

function MessageFile({ message }: { message: any }) {

    // function handleDownloadFile(url: string) {
    //     downloadFile(url, "file.docx");
    // }

    function renderIconFile(type: string) {
        if (type?.includes("zip")) {
            return <IconFileZip className='w-10 h-10 mr-2' />
        } else if (type?.includes("docx") || type?.includes("doc")) {
            return <IconFileDocx className='w-10 h-10 mr-2' />
        } else if (type?.includes("pdf")) {
            return <IconFilePDF className='w-10 h-10 mr-2' />
        } else if (type?.includes("xls") || type?.includes("xlsm") || type?.includes("xlsx") || type?.includes("xlt")) {
            return <IconFileExcel className='w-10 h-10 mr-2' />
        } else {
            return <IconFileText className='w-10 h-10 mr-2' />
        }
    }

    return (
        <div
            className='max-w-[90%] mt-20 max-h-fit flex items-end flex-col relative cursor-pointer'
        >
            <p className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400'>{convertTimeToHHMMddmmYYYY(message?.updatedAt)}</p>
            {message?.files?.length > 0 && message?.files?.map((item: any, index: number) => (
                <Link
                    key={index}
                    href={item?.urlFile}
                    className='w-[80%] tablet:w-[70%] laptop:w-[50%] no-underline mb-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'
                >
                    <div className=''>
                        {renderIconFile(item?.nameFile)}
                    </div>
                    <div>
                        <span className='text-base font-bold line-clamp-3 text-black'>{item?.nameFile}</span>
                        <p className='text-slate-500 text-sm'>{formatShowSizeFile(item?.sizeFile)}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MessageFile