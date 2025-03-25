'use client'

import React from 'react'
import EditorQuill from './EditorQuill'

function ModalCreatePost({ textContent, setTextContent }:
    { textContent: string, setTextContent: any }) {
    const onChangeData = (value: string) => {
        setTextContent(value)
    }
    return (
        <div className='flex'>
            <div className='tablet:mr-2 w-full'>
                <EditorQuill data={textContent} onChangeData={onChangeData} />
            </div>
        </div>
    )
}

export default ModalCreatePost