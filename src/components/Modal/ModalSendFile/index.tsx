import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatShowSizeFile } from '@/utils/handleFile';
import IconFileZip from '@/assets/icons/IconFileZip';
import IconFileDocx from '@/assets/icons/IconFileDocx';
import IconFilePDF from '@/assets/icons/IconFilePdf';
import IconFileExcel from '@/assets/icons/IconFileExcel';
import IconFileText from '@/assets/icons/IconFileText';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/index';
import { useAppSelector } from '@/lib/hooks';
import { selectDataUser } from '@/lib/features/controlData/controlDataSlice';
import { createMessage } from '@/endpoint/message';
import { convertTimeNumberToHHMMddmmYYYYV2 } from '@/utils/handleTime';

function ModalSendFile({ files, sfindId, setOpenModalFile, messages, setMessages }:
    { files: any[], sfindId: any, setOpenModalFile: any, messages: any[], setMessages: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [listFile, setListFile] = useState(files)
    const [valueProgress, setValueProgress] = useState(0);
    const user = useAppSelector(selectDataUser)

    const typeFile = files[0]?.typeFile?.includes("image") ? "image" : "file";
    const [dataFile, setDataFile] = useState<any>({
        type: typeFile,
        content: "",
        sfind: sfindId,
        files: []
    });

    function handleChangeDes(e: any) {
        if (isLoading) return;
        setDataFile({
            ...dataFile,
            content: e.target.value
        })
    }

    function handleClickDeleteImage(index: number) {
        if (isLoading) return;
        if (listFile?.length <= 1) {
            setOpenModalFile(false);
            return;
        }
        let newListFile = [...listFile];
        newListFile.splice(index, 1);
        setListFile(newListFile);
    }

    async function handleSendFile() {
        setIsLoading(true);
        let totalSize = 0;
        let totalSend = 0;
        listFile?.forEach(item => totalSize += item?.sizeFile);

        for (let i = 0; i < listFile?.length; i++) {
            let url = await uploadProcess(listFile[i], totalSend, totalSize);
            totalSend += listFile[i]?.sizeFile;
            let newDataFile = {
                urlFile: url,
                nameFile: listFile[i]?.nameFile,
                sizeFile: listFile[i]?.sizeFile,
            }
            dataFile?.files.push(newDataFile);
        }

        let newDataFile = { ...dataFile, files: JSON.stringify(dataFile?.files) };
        createMessage(newDataFile)
            .then(res => {
                let dataMessage = [...messages];
                dataMessage.push(res.data?.data?.message)
                setMessages(dataMessage);
            })
            .catch(err => {
                console.log({ err });
            })
            .finally(() => {
                setIsLoading(false);
                setOpenModalFile(false);
                setValueProgress(0);
            })
    }

    function uploadProcess(itemFile: any, totalSend: number, totalSize: number) {
        return new Promise((resolve: any, reject: any) => {
            const storageRef = ref(storage, `${typeFile}/${user?.id}-${user?.username}/${convertTimeNumberToHHMMddmmYYYYV2(new Date().getTime())}/${itemFile?.nameFile}`);
            const uploadTask = uploadBytesResumable(storageRef, itemFile?.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    var percentage = (snapshot.bytesTransferred + totalSend) / totalSize * 100;
                    setValueProgress(percentage);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        resolve(url);
                    });
                }
            );
        })
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
        <div className='w-full h-full'>
            <div className='flex flex-wrap justify-around max-h-[70%] overflow-scroll scrollbar-none'>
                {listFile?.length > 0 && listFile?.map((item: any, index: number) => (
                    typeFile === "image" ?
                        <div key={index} className='w-24 h-24 relative tablet:w-32 tablet:h-32 rounded-md cursor-pointer overflow-hidden mb-2'>
                            <Image
                                src={item?.urlFile}
                                width={100}
                                height={100}
                                alt=''
                                className='w-full h-full object-cover'
                            />
                            <DeleteIcon
                                className='absolute p-1 rounded-sm cursor-pointer bg-slate-700 opacity-70 text-slate-100 top-1 right-1'
                                onClick={() => handleClickDeleteImage(index)}
                            />
                        </div> :
                        <div key={index} className='w-[80%] tablet:w-[70%] laptop:w-[50%] mb-1 mr-1 relative overflow-hidden rounded-xl flex items-start bg-slate-300/70 py-2 px-3'>
                            <div className=''>
                                {renderIconFile(item?.typeFile)}
                                {/* <TopicIcon className='w-10 h-10 mr-2 text-blue-500' /> */}
                            </div>
                            <div>
                                <span className='text-base font-bold line-clamp-3 underline'>{item?.nameFile}</span>
                                <p className='text-slate-500 text-sm'>{formatShowSizeFile(item?.sizeFile)}</p>
                            </div>
                            <DeleteIcon
                                className='absolute p-1 rounded-sm cursor-pointer bg-slate-700 opacity-70 text-slate-100 top-1 right-1'
                                onClick={() => handleClickDeleteImage(index)}
                            />
                        </div>
                ))}
            </div>
            <div className='mt-5 w-full'>
                <input
                    type="text"
                    placeholder="Nhập mô tả..."
                    className="input input-bordered w-full"
                    onChange={handleChangeDes}
                />
            </div>
            <div className='flex flex-col items-center w-full justify-center mt-3'>
                <progress className="progress w-full mb-3" value={valueProgress} max="100"></progress>
                <button
                    className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"}`}
                    onClick={handleSendFile}
                >Gửi
                    {isLoading ? <span className="loading loading-spinner"></span> : <SendIcon />}
                </button>
            </div>
        </div>
    )
}

export default ModalSendFile