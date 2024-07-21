'use client'

import React from 'react'

function SfindContentSkeleton() {
  return (
    <div className='w-full p-5 overflow-hidden max-h-[calc(100svh-72px-48px)]'>
      <div className='flex flex-col w-full items-center mb-10'>
        <div className="skeleton h-5 w-40 rounded bg-slate-300 mb-4"></div>
        <div className='flex justify-end w-full'>
          <div className="skeleton h-40 w-[80%] rounded-md bg-slate-300"></div>
        </div>

      </div>
      <div className='flex flex-col w-full items-center mb-10'>
        <div className="skeleton h-5 w-40 rounded bg-slate-300 mb-4"></div>
        <div className='flex justify-end w-full'>
          <div className="skeleton h-40 w-[80%] rounded-md bg-slate-300"></div>
        </div>

      </div>
      <div className='flex flex-col w-full items-center mb-10'>
        <div className="skeleton h-5 w-40 rounded bg-slate-300 mb-4"></div>
        <div className='flex justify-end w-full'>
          <div className="skeleton h-20 w-[80%] rounded-md bg-slate-300"></div>
        </div>

      </div>
    </div>
  )

}

export default SfindContentSkeleton