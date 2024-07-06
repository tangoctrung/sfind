import React from 'react'
import RegisterForm from './RegisterForm'
import Link from 'next/link'

function RegisterPage() {
  return (
    <div className="w-svw h-svh bg-background flex justify-center items-center">
      <div className="w-[90%] h-128 tablet:w-96 tablet:h-128 p-8 bg-background-second rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">
          <Link href={"/"}>SFind - Đăng ký</Link>
        </h1>
        <p className="text-base text-center font-medium pt-2 text-slate-400">Đăng ký để trở thành thành viên của hệ thống.</p>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage