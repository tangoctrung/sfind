'use client'

import React, { useState } from 'react'
import EditorQuill from './EditorQuill'
import ReactHtmlParser from 'react-html-parser';

function ModalCreatePost() {
    const [data, setData] = useState<string>("")
    const onChangeData = (value: string) => {
        setData(value)
    }
    return (
        <div className='tablet:flex'>
            <div className='tablet:flex-1 tablet:mr-2'>
                <EditorQuill data={data} onChangeData={onChangeData} />
            </div>
            <div className='tablet:flex-1'>
                {ReactHtmlParser(data)}
            </div>
        </div>
    )
}

export default ModalCreatePost