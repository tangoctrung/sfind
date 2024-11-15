'use client'

import React from 'react'
import EditorQuill from './EditorQuill'
import ReactHtmlParser from 'react-html-parser';

function ModalCreatePost({ textContent, setTextContent }:
    { textContent: string, setTextContent: any }) {
    const onChangeData = (value: string) => {
        setTextContent(value)
    }
    return (
        <div className='flex'>
            <div className='tablet:mr-2 w-[50%]'>
                <EditorQuill data={textContent} onChangeData={onChangeData} />
            </div>
            <div className='p-4 w-[50%] bg-gray-300 rounded-xl'>{textContent}</div>
        </div>
    )
}

export default ModalCreatePost