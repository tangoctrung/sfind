import React from 'react'
import RegisterForm from './RegisterForm'

function RegisterPage() {
  return (
    <div className="w-screen h-svh bg-background flex justify-center items-center">
      <div className="w-[90%] h-144 tablet:w-128 tablet:h-128 p-10 bg-background-second rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">SFind - Đăng ký</h1>
        <p className="text-lg text-center font-medium pt-2 text-slate-400">Đăng ký để trở thành thành viên của hệ thống.</p>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage