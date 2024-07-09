'use client'

import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useParams } from 'next/navigation';

function SFindContent() {

    const params = useParams()


    return (
        <div className="h-full w-[calc(85%)] tablet:w-[calc(100%-13rem)] ">
            <div className="h-[calc(100%-3rem)] w-full bg-slate-200 p-2 overflow-scroll scrollbar-none">
                <p>{params?.id}</p>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
                <div className='w-30 h-32 bg-blue-500'></div>
            </div>
            <div className="h-12 w-full bg-slate-300 flex items-center justify-around">
                <div className="p-2 cursor-pointer bg-slate-400 rounded-md ml-5">
                    <input id="inputChooseFile" type="file" className="file-input w-full max-w-xs hidden" />
                    <label htmlFor="inputChooseFile" className="cursor-pointer">
                        <AttachFileIcon />
                    </label>
                </div>
                <div className="p-2 cursor-pointer bg-slate-400 rounded-md ml-5">
                    <EditNoteIcon />
                </div>
            </div>
        </div>
    )
}

export default SFindContent