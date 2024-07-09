'use client'

import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useParams } from 'next/navigation';
import MessageImage from '../SFindMessage/MessageImage';
import MessageText from '../SFindMessage/MessageText';
import MessageFile from '../SFindMessage/MessageFile';

function SFindContent() {

    const params = useParams()
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
        <div className="h-full w-[calc(85%)] tablet:w-[calc(100%-13rem)] ">
            <div className="h-[calc(100%-3rem)] w-full bg-slate-200 overflow-scroll scrollbar-none">
                <MessageText />
                <MessageFile />
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


                <MessageImage
                    images={images3}
                />

            </div>
            <div className="h-12 w-full bg-slate-300 flex items-center justify-center">
                <div className="p-2 cursor-pointer bg-slate-400 rounded-md mr-5">
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