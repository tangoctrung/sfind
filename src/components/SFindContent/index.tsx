'use client'

import React, { useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MessageImage from '../SFindMessage/MessageImage';
import MessageText from '../SFindMessage/MessageText';
import MessageFile from '../SFindMessage/MessageFile';
import MessageLink from '../SFindMessage/MessageLink';
import { Box, Modal } from '@mui/material';
import ModalCreatePost from '../Modal/ModalCreatePost';
import { uploadFileToStorage } from '@/utils/handleFile';
import { useSearchParams } from 'next/navigation';
import { createMessage, getMessage, getTokenSfind } from '@/endpoint/message';
import NoData from "@/assets/images/nodata.png";
import Image from 'next/image';
import SfindContentSkeleton from '../Skeleton/SfindContentSkeleton';
import TypePassword from './TypePassword';
import { ERR_TOKEN_SFIND, ERR_TYPE_PASS_SFIND } from '@/types/errorMessage';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { sendMessageTelegram } from '@/utils/handleBotTelegram';
import CachedSharpIcon from '@mui/icons-material/CachedSharp';


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

function SFindContent() {

    const [open, setOpen] = React.useState(false);
    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false);
    const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
    const [isShowTypePassword, setIsShowTypePassword] = useState(false);
    const [isRefreshMessage, setIsRefreshMessage] = useState(false);
    const containerMessage = useRef<HTMLDivElement>(null);
    const handleOpen = () => setOpen(true);
    const searchParams = useSearchParams();
    const sfindId = searchParams.get("id") || "";
    const [messages, setMessages] = useState<any[]>([]);
    const [textContent, setTextContent] = useState<string>("");
    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });

    useEffect(() => {
        containerMessage.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [messages]);

    useEffect(() => {
        setMessages([]);
        handleGetMessage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sfindId, isRefreshMessage])

    const handleClose = () => {
        setOpen(false);
    }

    const handleChooseFile = (e: any) => {
        uploadFileToStorage(e.target.files[0], "floderTest")
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

    const images: string[] = []
    const images1: string[] = [
        "https://images.pexels.com/photos/19020136/pexels-photo-19020136/free-photo-of-bi-n-da-song-bi-n-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ]
    const images2: string[] = [
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ]
    const images3: string[] = [
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ]
    const images4: string[] = [
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
                                            <MessageText value={item} />
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

                            {/* <MessageFile />
                        <MessageImage
                            images={images}
                        />

                        <MessageImage
                            images={images1}
                        />

                        <MessageImage
                            images={images2}
                        />

                        <MessageImage
                            images={images3}
                        />

                        <MessageImage
                            images={images4}
                        />

                        <MessageLink />

                        <MessageImage
                            images={images3}
                        /> */}

                        </div>
                        <div className="h-12 w-full bg-slate-300 flex items-center justify-center">
                            <div className="p-2 cursor-pointer bg-slate-400 rounded-md">
                                <input
                                    id="inputChooseFile"
                                    type="file"
                                    className="file-input w-full max-w-xs hidden"
                                    onChange={e => handleChooseFile(e)}
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
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={dataSnackBar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={dataSnackBar.message}
                action={action}
            />
        </>
    )
}

export default SFindContent
