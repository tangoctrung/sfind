'use client'

import { convertTimeToHHMMddmmYYYY } from '@/utils/handleTime';
import React, { useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser';

function MessageText({ value }: { value: any }) {

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

    return (
        <div className={`h-auto w-full py-5 flex flex-col justify-end items-center relative  transition-all duration-700 `}>
            <p className='w-full text-center text-sm text-gray-400'>{convertTimeToHHMMddmmYYYY(value?.createdAt)}</p>
            <div className='w-full flex justify-end'>
                <div className="max-w-[80%] cursor-pointer mr-5 text-secondary1 text-sm font-normal mt-[6px] transition-all duration-700 rounded-xl bg-slate-300 p-2 box-border">
                    <div id={`contentComment${value?._id}`} className="line-clamp-3 max-w-full break-words">
                        {ReactHtmlParser(value?.content)}
                    </div>
                    <div id={`readMore${value?._id}`} className={`hidden text-sm font-semibold text-primary mt-[6px]`}>
                        Xem thêm
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MessageText