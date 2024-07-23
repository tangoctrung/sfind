import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import TopicIcon from '@mui/icons-material/Topic';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { formatShowSizeFile } from '@/utils/handleFile';

function ModalSendFile({ files, sfindId, setOpenModalFile }:
    { files: any[], sfindId: any, setOpenModalFile: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [listFile, setListFile] = useState(files)
    const [valueProgress, setValueProgress] = useState(10);
    const typeFile = files[0]?.typeFile?.includes("image") ? "image" : "file"
    const [dataFile, setDataFile] = useState({
        type: typeFile,
        description: "",
        sfindId: sfindId,
        files: []
    });

    function handleChangeDes(e: any) {
        if (isLoading) return;
        setDataFile({
            ...dataFile,
            description: e.target.value
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

    function handleSendFile() {
        console.log({ dataFile });
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
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
                                <TopicIcon className='w-10 h-10 mr-2 text-blue-500' />
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
                {valueProgress > 0 &&
                    <progress className="progress w-full mb-3" value={valueProgress} max="100"></progress>}
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