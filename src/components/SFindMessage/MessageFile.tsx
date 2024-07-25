import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { formatShowSizeFile } from '@/utils/handleFile';
import Link from 'next/link';
import { convertTimeToHHMMddmmYYYY } from '@/utils/handleTime';
import IconFileZip from '@/assets/icons/IconFileZip';
import IconFileDocx from '@/assets/icons/IconFileDocx';
import IconFilePDF from '@/assets/icons/IconFilePdf';
import IconFileExcel from '@/assets/icons/IconFileExcel';
import IconFileText from '@/assets/icons/IconFileText';
import { Box, Modal } from '@mui/material';

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

function MessageFile({ message, handleActionMessage }: { message: any, handleActionMessage: any }) {

    // function handleDownloadFile(url: string) {
    //     downloadFile(url, "file.docx");
    // }
    const [open, setOpen] = React.useState(false);
    const [isLoadingDeleteMessage, setIsLoadingDeleteMessage] = useState(false)


    function handleClickIconDelete() {
        setOpen(true);
    }

    async function handleDeleteMessage() {
        setIsLoadingDeleteMessage(true)
        await handleActionMessage("delete", message)
        setIsLoadingDeleteMessage(false)
        setOpen(false)
    }

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
            <p
                className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400 tooltip'
                data-tip={message?.content}
            >{convertTimeToHHMMddmmYYYY(message?.updatedAt)}</p>
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
            <div className='mr-5 flex justify-end'>
                <div
                    className='cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-300 mr-2 flex items-center justify-center'
                    onClick={handleClickIconDelete}
                ><DeleteIcon className='w-4 h-4' /></div>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl w-[95%] tablet:w-[400px] h-auto !py-5 !px-5'>
                    <h3>Bạn có chắc muốn xóa message này không?</h3>
                    <div className='mt-2 flex justify-center'>
                        <button className={`btn ${isLoadingDeleteMessage ? "btn-disabled" : "btn-normal"} mr-5`}
                            onClick={handleDeleteMessage}
                        >
                            {isLoadingDeleteMessage ? <span className="loading loading-spinner"></span> : "Xóa"}

                        </button>
                        <button className={`btn ${isLoadingDeleteMessage ? "btn-disabled" : "btn-neutral"}`}
                            onClick={() => setOpen(false)}
                        >
                            Quay lại
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default MessageFile