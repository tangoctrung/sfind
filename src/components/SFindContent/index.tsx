'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MessageText from '../SFindMessage/MessageText';
import { Box, Modal } from '@mui/material';
import ModalCreatePost from '../Modal/ModalCreatePost';
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
import MessageFile from '../SFindMessage/MessageFile';
import { updateMessages } from '@/lib/features/controlData/controlDataSlice';
import { useAppDispatch } from '@/lib/hooks';
import TopBarSFind from '../TopBarSFind';
import { KEY_LOCAL } from '@/types/keyLocal';


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
    const [openModalFile, setOpenModalFile] = React.useState(false);

    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false);
    const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
    const [isLoadingDeleteMessage, setIsLoadingDeleteMessage] = useState(false);

    const [isShowTypePassword, setIsShowTypePassword] = useState(false);
    const [isRefreshMessage, setIsRefreshMessage] = useState(false);

    const containerMessage = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

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
    const [text, setText] = useState<any>("")
    const [nameSfind, setNameSfind] = useState("");

    useEffect(() => {
        let name = sessionStorage.getItem(KEY_LOCAL.NAME_SFIND) || "";
        setNameSfind(name);
    }, [sfindId]);

    useEffect(() => {
        containerMessage.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [messages?.length]);

    useEffect(() => {
        setMessages([]);
        handleGetMessage(text);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sfindId, isRefreshMessage, text])

    useEffect(() => {
        setIsShowTypePassword(false);
    }, [sfindId])

    const handleClose = () => {
        setOpen(false);
    }

    const handleChooseImage = (e: any) => {
        const listFile: any[] = [...e.target.files];
        if (listFile?.length <= 0) return;
        const filesNew: DATA_FILE[] = [];
        listFile.forEach((item: any) => {
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

    const handleGetMessage = (textSearch: string) => {
        setIsLoadingGetMessage(true)
        getMessage({ sfindId: sfindId, des: textSearch || "" })
            .then(res => {
                setMessages(res.data?.data?.messages);
                if (textSearch === "") {
                    dispatch(updateMessages(res.data?.data?.messages))
                }
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
                        dispatch(updateMessages(res.data?.data?.messages))
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
            const type = "text/html";
            const blob = new Blob([message?.content], { type });
            const data = [new ClipboardItem({ [type]: blob })];
            navigator.clipboard.write(data).then(
                () => {
                    setDataSnackBar({
                        open: true,
                        message: "Đã copy message vào bộ nhớ"
                    })
                },
                () => {
                },
            );
        } else if (type === "edit") {
            let dataMessage = [...messages]
            let listMessage: any[] = dataMessage?.map((item: any) => {
                if (item?._id === message?._id) {
                    item = { ...item, content: message?.content }
                }
                return item;
            })
            setMessages(listMessage)
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

    return (
        <>
            <div className="h-full w-full overflow-hidden">
                {!isShowTypePassword ?
                    <>
                        <div className="w-full h-[70px]">
                            <Suspense>
                                <TopBarSFind setText={setText} />
                            </Suspense>
                        </div>
                        <div className="h-[calc(100%-3rem-70px)] pb-5 w-full overflow-scroll scrollbar-none" >
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
                                } else if (item?.type === "image") {
                                    return (
                                        <div key={index} ref={containerMessage}>
                                            <MessageImage
                                                message={item}
                                                handleActionMessage={handleActionMessage}
                                            />
                                        </div>
                                    )
                                } else if (item?.type === "file") {
                                    return (
                                        <div key={index} ref={containerMessage}>
                                            <MessageFile
                                                message={item}
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
                    <TypePassword handleSubmitPasswordSfind={handleGetTokenSfind} nameSfind={nameSfind} />}
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
                    <ModalSendFile files={files} sfindId={sfindId} setOpenModalFile={setOpenModalFile} messages={messages} setMessages={setMessages} />
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
