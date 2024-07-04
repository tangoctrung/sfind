'use client'
import { IconConfirmPassword } from '@/assets/icons/IconConfirmPassword'
import { IconGoogle } from '@/assets/icons/IconGoogle'
import { IconMail } from '@/assets/icons/IconMail'
import { IconPassword } from '@/assets/icons/IconPassword'
import { IconUsername } from '@/assets/icons/IconUsername'
import Link from 'next/link'
import React from 'react'

function RegisterForm() {
    return (
        <div className='mt-6'>
            <label className="input input-bordered flex items-center gap-2">
                <IconMail />
                <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconUsername />
                <input type="text" className="grow" placeholder="Tên người dùng" />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconPassword />
                <input type="password" className="grow" placeholder='Mật khẩu' />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconConfirmPassword />
                <input type="password" className="grow" placeholder='Nhập lại mật khẩu' />
            </label>
            <div className='w-full flex justify-center mt-4'>
                <button className="btn btn-neutral">Đăng ký</button>
            </div>
            <div className='flex justify-center mt-4'>
                <Link href="/login">
                    <button className="btn btn-active btn-link text-blue-600">Bạn đã có tài khoản? Đăng nhập</button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm