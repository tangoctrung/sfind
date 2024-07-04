'use client'
import { IconGoogle } from '@/assets/icons/IconGoogle'
import { IconMail } from '@/assets/icons/IconMail'
import { IconPassword } from '@/assets/icons/IconPassword'
import Link from 'next/link'
import React from 'react'

function LoginForm() {
    return (
        <div className='mt-6'>
            <label className="input input-bordered flex items-center gap-2">
                <IconMail />
                <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconPassword />
                <input type="password" className="grow" placeholder='******' />
            </label>
            <div className='w-full flex justify-end'>
                <Link href="/forgot-password">
                    <button className="btn btn-active btn-link text-blue-600">Quên mật khẩu</button>
                </Link>
            </div>
            <div className='w-full flex justify-center mt-4'>
                <button className="btn btn-neutral">Đăng nhập</button>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <p className='w-24 h-[1px] bg-slate-300 mr-2'></p> 
                hoặc 
                <p className='w-24 h-[1px] bg-slate-300 ml-2'></p>
            </div>
            <div className='w-full flex justify-center mt-4'>
                <button className="btn w-[50%]">
                    <IconGoogle />oogle
                </button>
            </div>
            <div className='flex justify-center mt-4'>
                <Link href="/register">
                    <button className="btn btn-active btn-link text-blue-600">Bạn chưa có tài khoản? Đăng ký</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm