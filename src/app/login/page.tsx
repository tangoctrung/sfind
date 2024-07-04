import { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Trang đăng nhập của SFind, được tạo bởi trungtn'
}

export default function LoginPage() {
  return (
    <div className="w-screen h-svh bg-background flex justify-center items-center">
      <div className="w-[90%] h-160 tablet:w-128 tablet:h-144 p-10 bg-background-second rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">SFind - Đăng nhập</h1>
        <p className="text-lg text-center font-medium pt-2 text-slate-400">Đăng nhập vào hệ thống để sử dụng dịch vụ.</p>
        <LoginForm />
      </div>
    </div>
  )
}