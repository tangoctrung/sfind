'use client'

import { convertTimeToHHMMddmmYYYY } from '@/utils/handleTime';
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Modal } from '@mui/material';
import ModalCreatePost from '../Modal/ModalCreatePost';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close';
import { updateMessage } from '@/endpoint/message';

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

function MessageText({ value, isLoadingDeleteMessage, handleActionMessage }:
    { value: any, isLoadingDeleteMessage: boolean, handleActionMessage: any }) {

    const [open, setOpen] = React.useState(false);
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [textContent, setTextContent] = useState(value?.content)

    const [isLoadingUpdateMessage, setIsLoadingUpdateMessage] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() => {
        if (!document) return;
        let itemReadMore = document.getElementById(`readMore${value?._id}`)
        let itemComment = document.getElementById(`contentComment${value?._id}`)
        if (!itemComment || !itemReadMore) return
        if (itemComment?.clientHeight >= 60) {
            itemReadMore.classList.remove("hidden")
            itemReadMore.addEventListener("click", () => {
                if (itemComment.classList.contains("line-clamp-3")) {
                    itemComment.classList.remove("line-clamp-3")
                    itemReadMore.innerText = "Ẩn bớt"
                } else {
                    itemComment.classList.add("line-clamp-3")
                    itemReadMore.innerText = "Xem thêm"
                }
            })
        }
    }, [value?._id])

    function handleClickIconEdit() {
        setOpenModalUpdate(true)
    }
    function handleClickIconDelete() {
        setOpen(true);
    }
    function handleClickIconCopy() {
        handleActionMessage("copy", value)
    }

    async function handleDeleteMessage() {
        await handleActionMessage("delete", value)
        setOpen(false)
    }

    function handleUpdateMessage() {
        const dataRequest = { content: textContent };
        updateMessage(dataRequest, value?._id)
            .then(res => {
                if (res.status === 200) {
                    handleActionMessage("edit", { ...value, content: textContent })
                    setOpenModalUpdate(false)
                }
            })
            .catch(err => {
                console.log({ err });
            })
    }

    return (
        <div className={`h-auto w-full py-5 flex flex-col justify-end items-center relative  transition-all duration-700 `}>
            <p className='w-full text-center text-sm text-gray-400'>{convertTimeToHHMMddmmYYYY(value?.createdAt)}</p>
            <div className='w-full flex flex-col items-end justify-end'>
                <div className="max-w-[80%] cursor-pointer mr-5 text-secondary1 text-sm font-normal mt-[6px] transition-all duration-700 rounded-xl bg-slate-300 p-2 box-border">
                    <div id={`contentComment${value?._id}`} className="line-clamp-3 max-w-full break-words">
                        {ReactHtmlParser(value?.content)}
                    </div>
                    <div id={`readMore${value?._id}`} className={`hidden text-sm font-semibold text-primary mt-[6px]`}>
                        Xem thêm
                    </div>
                </div>
                <div className='max-w-[80%] mr-5 flex justify-end mt-2'>
                    <div
                        className='cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-300 mr-2 flex items-center justify-center'
                        onClick={handleClickIconEdit}
                    ><EditIcon className='w-4 h-4' /></div>
                    <div
                        className='cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-300 mr-2 flex items-center justify-center'
                        onClick={handleClickIconDelete}
                    ><DeleteIcon className='w-4 h-4' /></div>
                    <div
                        className='cursor-pointer w-6 h-6 p-2 rounded-md bg-slate-300 mr-2 flex items-center justify-center'
                        onClick={handleClickIconCopy}
                    ><ContentCopyIcon className='w-4 h-4' /></div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl w-[95%] tablet:w-[400px] h-auto !py-5 !px-5'>
                    <h3>Bạn có chắc muốn xóa message này không?</h3>
                    <div className='mt-2 flex justify-center'>
                        <button className={`btn ${isLoadingDeleteMessage ? "btn-disabled" : "btn-normal"} mr-5`}
                            onClick={handleClose}
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

            <Modal
                open={openModalUpdate}
                onClose={() => setOpenModalUpdate(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl h-[98%] w-[95%] !py-5 !px-2'>
                    <div className='flex justify-between items-center'>
                        <button className={`btn ${isLoadingUpdateMessage ? "btn-disabled" : "btn-neutral"} p-3`}
                            onClick={handleUpdateMessage}
                        >
                            {isLoadingUpdateMessage ? <span className="loading loading-spinner"></span> : <SystemUpdateAltIcon />}
                            Cập nhật
                        </button>
                        <CloseIcon
                            className='w-6 h-6 cursor-pointer'
                            onClick={() => setOpenModalUpdate(false)}
                        />
                    </div>
                    <div className='mt-2'>
                        <ModalCreatePost textContent={textContent} setTextContent={setTextContent} />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default MessageText