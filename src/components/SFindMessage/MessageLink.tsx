'use client'

import Link from 'next/link'
import React from 'react'

function MessageLink() {

    return (
        <div className={`max-w-[90%] mt-20 flex justify-end items-center relative cursor-pointer transition-all duration-700 `}>
            <p className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400'>11:20 20/03/2022</p>
            <div className={`rounded-xl bg-slate-300 p-2`}
            >
                <Link
                    href="https://mui.com/material-ui/react-modal/"
                    className='underline text-blue-600'
                    target='_blank'
                >
                    https://mui.com/material-ui/react-modal/
                </Link>
            </div>
        </div>
    )
}

export default MessageLink