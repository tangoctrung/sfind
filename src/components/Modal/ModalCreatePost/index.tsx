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
        <div className='tablet:flex'>
            <div className='tablet:flex-1 tablet:mr-2'>
                {/* <EditorQuill data={textContent} onChangeData={onChangeData} /> */}
            </div>
            <div className='tablet:flex-1'>
                {ReactHtmlParser(textContent)}
            </div>
        </div>
    )
}

export default ModalCreatePost