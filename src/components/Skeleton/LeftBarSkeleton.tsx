import React from 'react'

export default function LeftBarSkeleton() {
    return (
        <div className='w-full flex flex-col py-5 items-center overflow-hidden max-h-[calc(100svh-120px)]'>
            <div className='flex w-full justify-center  items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>

            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
            <div className='flex w-full justify-center items-center mb-10'>
                <div className="skeleton h-10 w-10 rounded-full bg-slate-300"></div>
                <div className="skeleton h-10 w-[calc(100%-40px)] hidden tablet:block ml-4 rounded-md bg-slate-300"></div>
            </div>
        </div>
    )
}
