'use client'

import React, { useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MessageText from '../SFindMessage/MessageText';
import { Box, Modal } from '@mui/material';
import ModalCreatePost from '../Modal/ModalCreatePost';
import { uploadFileToStorage } from '@/utils/handleFile';
import { useSearchParams } from 'next/navigation';
import { createMessage, deleteMessage, getMessage, getTokenSfind } from '@/endpoint/message';
import NoData from "@/assets/images/nodata.png";
import Image from 'next/image';
import SfindContentSkeleton from '../Skeleton/SfindContentSkeleton';
import TypePassword from './TypePassword';
import { ERR_TOKEN_SFIND, ERR_TYPE_PASS_SFIND } from '@/types/errorMessage';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CachedSharpIcon from '@mui/icons-material/CachedSharp';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MessageImage from '../SFindMessage/MessageImage';
import ModalSendFile from '../Modal/ModalSendFile';


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

interface DATA_FILE {
    file: any;
    urlFile: string;
    nameFile: string;
    sizeFile: number;
    typeFile: string;
}

function SFindContent() {

    const [open, setOpen] = React.useState(false);
    const [openModalFile, setOpenModalFile] = React.useState(true);

    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false);
    const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
    const [isLoadingDeleteMessage, setIsLoadingDeleteMessage] = useState(false);

    const [isShowTypePassword, setIsShowTypePassword] = useState(false);
    const [isRefreshMessage, setIsRefreshMessage] = useState(false);
    const containerMessage = useRef<HTMLDivElement>(null);
    const handleOpen = () => setOpen(true);
    const searchParams = useSearchParams();
    const sfindId = searchParams.get("id") || "";
    const [messages, setMessages] = useState<any[]>([]);
    const [textContent, setTextContent] = useState<string>("");
    const [files, setFiles] = useState<DATA_FILE[]>([])
    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });

    useEffect(() => {
        containerMessage.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [messages?.length]);

    useEffect(() => {
        setMessages([]);
        handleGetMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sfindId, isRefreshMessage])

    useEffect(() => {
        setIsShowTypePassword(false);
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleChooseFile = (e: any) => {
        // uploadFileToStorage(e.target.files[0], "floderTest")
    }
    const handleChooseImage = (e: any) => {
        // uploadFileToStorage(e.target.files[0], "floderTest")
        console.log(e.target.files);
        const listFile: any[] = [...e.target.files];
        const filesNew: DATA_FILE[] = [];
        listFile.forEach((item: any) => {
            console.log({ item });
            let itemFile: DATA_FILE = {
                file: item,
                typeFile: item?.type,
                nameFile: item?.name || "fileDefault.txt",
                sizeFile: item?.size || 0,
                urlFile: URL.createObjectURL(item) || "",
            }
            filesNew.push(itemFile);
        })
        setFiles(filesNew);
        setOpenModalFile(true);
    }

    const handleSendMessageText = () => {
        const dataMessageText = {
            content: textContent,
            type: "text",
            sfind: sfindId
        }

        setIsLoadingSendMessage(true);
        createMessage(dataMessageText)
            .then(res => {
                let dataMessage = [...messages];
                dataMessage.push(res.data?.data?.message)
                setMessages(dataMessage);
                setTextContent("")
                setOpen(false);
                setIsLoadingSendMessage(false);
            })
            .catch(err => {
                console.log({ err });
                setIsLoadingSendMessage(false);
            })
    }

    const handleGetMessage = () => {
        setIsLoadingGetMessage(true)
        getMessage({ sfindId: sfindId, des: "" })
            .then(res => {
                setMessages(res.data?.data?.messages);
                setIsLoadingGetMessage(false);
                setIsShowTypePassword(false);
            })
            .catch(err => {
                console.log({ err });
                // sendMessageTelegram("")
                setIsLoadingGetMessage(false);
                const messageErr = err?.response?.data?.message || ""
                if (messageErr === ERR_TYPE_PASS_SFIND || messageErr === ERR_TOKEN_SFIND) {
                    setIsShowTypePassword(true);
                }
            })
    }

    const handleRefreshMessage = () => {
        setIsRefreshMessage(i => !i)
    }

    const handleGetTokenSfind = (password: string, callbackSetLoading: any) => {
        getTokenSfind({ sfindId: sfindId, password: password })
            .then(res => {
                setIsShowTypePassword(false);
                setIsLoadingGetMessage(true);
                getMessage({ sfindId: sfindId, des: "" })
                    .then(res => {
                        setMessages(res.data?.data?.messages);
                        setIsLoadingGetMessage(false);
                        callbackSetLoading()
                    })
                    .catch(err => {
                        console.log({ err });
                        setIsLoadingGetMessage(false);
                        const messageErr = err?.response?.data?.message || ""
                        if (messageErr === ERR_TYPE_PASS_SFIND || messageErr === ERR_TOKEN_SFIND) {
                            setIsShowTypePassword(true);
                        }
                    })
            })
            .catch(err => {
                console.log({ err });
                if (err?.response?.status === 400) {
                    setDataSnackBar({
                        open: true,
                        message: err?.response?.data?.message || "Mật khẩu không đúng"
                    })
                }
                callbackSetLoading()

            })
    }

    function stripHTMLTagsUsingDOM(htmlString: string) {
        const temporaryElement = document.createElement('div');
        temporaryElement.innerHTML = htmlString;
        const plainText = temporaryElement.textContent;
        return plainText;
    }

    const handleActionMessage = async (type: string, message: any) => {
        if (type === "delete") {
            const res = await deleteMessage(message?._id)
            if (res.status === 200) {
                let dataMessage = messages?.filter((item: any) => item?._id !== message?._id)
                setMessages(dataMessage)
                setDataSnackBar({
                    open: true,
                    message: "Xóa message thành công"
                })
                setIsLoadingDeleteMessage(false)
            }
        } else if (type === "copy") {
            navigator.clipboard.writeText(stripHTMLTagsUsingDOM(message?.content) || "")
                .then(() => {
                    setDataSnackBar({
                        open: true,
                        message: "Đã copy message vào bộ nhớ"
                    })
                })
                .catch(error => {
                    console.error('Failed to copy text:', error);
                });
        } else if (type === "edit") {
            let dataMessage = [...messages]
            dataMessage?.map((item: any) => {
                if (item?._id === message?._id) {
                    item.content = message?.content
                }
            })
            setMessages(dataMessage)
            setDataSnackBar({
                open: true,
                message: "Cập nhật message thành công"
            })
        }
    }

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setDataSnackBar({
            open: false,
            message: ""
        });
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const images4: string[] = [

        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

        // "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

        // "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

        // "https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    ]
    return (
        <>
            <div className="h-full w-[calc(85%)] tablet:w-[calc(100%-13rem)]">
                {!isShowTypePassword ?
                    <>
                        <div className="h-[calc(100%-3rem)] pb-5 w-full bg-slate-200 overflow-scroll scrollbar-none" >
                            {!isLoadingGetMessage && messages?.length > 0 && messages?.map((item, index) => {
                                if (item?.type === "text") {
                                    return (
                                        <div key={index} ref={containerMessage}>
                                            <MessageText
                                                value={item}
                                                isLoadingDeleteMessage={isLoadingDeleteMessage}
                                                handleActionMessage={handleActionMessage}
                                            />
                                        </div>
                                    )
                                }
                            })}
                            {!isLoadingGetMessage && messages?.length <= 0 &&
                                <div className='w-full h-full flex flex-col justify-center items-center'>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={NoData}
                                        alt='no data'
                                    />
                                    <p className='text-base mt-3 text-slate-400 font-semibold'>Không có dữ liệu</p>
                                </div>}
                            {isLoadingGetMessage &&
                                <SfindContentSkeleton />
                            }

                            <MessageImage
                                images={images4}
                            />

                        </div>
                        <div className="h-12 w-full bg-slate-300 flex items-center justify-center">
                            <div className="p-2 cursor-pointer bg-slate-400 rounded-md">
                                <input
                                    id="inputChooseImage"
                                    type="file"
                                    className="file-input w-full max-w-xs hidden"
                                    accept='image/*'
                                    multiple
                                    onChange={e => handleChooseImage(e)}
                                />
                                <label htmlFor="inputChooseImage" className="cursor-pointer">
                                    <AddPhotoAlternateIcon />
                                </label>
                            </div>
                            <div className="p-2 cursor-pointer bg-slate-400 rounded-md ml-8">
                                <input
                                    id="inputChooseFile"
                                    type="file"
                                    multiple
                                    className="file-input w-full max-w-xs hidden"
                                    onChange={e => handleChooseImage(e)}
                                />
                                <label htmlFor="inputChooseFile" className="cursor-pointer">
                                    <AttachFileIcon />
                                </label>
                            </div>
                            <div
                                className="p-2 cursor-pointer bg-slate-400 rounded-md ml-8"
                                onClick={handleOpen}
                            >
                                <EditNoteIcon />
                            </div>
                            <div
                                className="p-2 cursor-pointer bg-slate-400 rounded-md ml-8"
                                onClick={handleRefreshMessage}
                            >
                                <CachedSharpIcon />
                            </div>
                        </div>
                    </> :
                    <TypePassword handleSubmitPasswordSfind={handleGetTokenSfind} />}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl h-[98%] w-[95%] !py-5 !px-2'>
                    <div className='flex justify-between items-center'>
                        <button className={`btn ${isLoadingSendMessage ? "btn-disabled" : "btn-neutral"} p-3`}
                            onClick={handleSendMessageText}
                        >
                            {isLoadingSendMessage ? <span className="loading loading-spinner"></span> : <SaveIcon />}
                            Lưu
                        </button>
                        <CloseIcon
                            className='w-6 h-6 cursor-pointer'
                            onClick={handleClose}
                        />
                    </div>
                    <div className='mt-2'>
                        <ModalCreatePost textContent={textContent} setTextContent={setTextContent} />
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openModalFile}
                onClose={() => setOpenModalFile(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='overflow-scroll scrollbar-none rounded-xl h-[70%] w-[90%] tablet:w-[80%] laptop:w-[600px] !py-5 !px-2'>
                    <ModalSendFile files={files} sfindId={sfindId} setOpenModalFile={setOpenModalFile} />
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={dataSnackBar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                message={dataSnackBar.message}
                action={action}
            />
        </>
    )
}

export default SFindContent
