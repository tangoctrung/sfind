'use client'
import { IconConfirmPassword } from '@/assets/icons/IconConfirmPassword'
import { IconMail } from '@/assets/icons/IconMail'
import { IconPassword } from '@/assets/icons/IconPassword'
import { IconUsername } from '@/assets/icons/IconUsername'
import { validateEmail } from '@/utils/validate'
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { REGISTER_DATA } from '@/types'
import { registerUser } from '@/endpoint/auth'
import { useRouter } from 'next/navigation'

interface DataRegister {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
function RegisterForm() {

    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataRegister, setDataRegister] = useState<DataRegister>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const router = useRouter();

    function handleChangeDataRegister(e: any) {
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value,
        })
    }

    function validateForm(data: DataRegister) {
        if (data.confirmPassword === "" || data.username === "" || data.email === "" || data.password === "") {
            return "Bạn chưa điền đầy đủ thông tin, hãy kiểm tra lại"
        }
        if (!validateEmail(data.email)) {
            return "Email không hợp lệ, hãy kiểm tra lại"
        }
        if (data.password?.length < 8) {
            return "Mật khẩu phải có ít nhất 8 ký tự"
        }
        if (data.password !== data.confirmPassword) {
            return "Mật khẩu bạn nhập lại không đúng, hãy kiểm tra lại"
        }
        return "";
    }

    function handleRegister() {
        let message: string = validateForm(dataRegister)
        if (message) {
            setDataSnackBar({
                open: true,
                message: message
            });
            return;
        }
        setIsLoading(true);
        let dataRequest: REGISTER_DATA = {
            username: dataRegister.username,
            email: dataRegister.email,
            password: dataRegister.password,
        }
        registerUser(dataRequest)
            .then((res) => {
                if (res.status === 200) {
                    setIsLoading(false);
                    router.push("/login");
                }
            })
            .catch((err) => {
                console.log({ err })
                setDataSnackBar({
                    open: true,
                    message: err?.response?.data?.message || "Bạn hãy check email, có thể nó đã tồn tại"
                })
                setIsLoading(false);
            })
    }

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setDataSnackBar({
            open: false,
            message: ""
        });
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className='mt-6'>
            <label className="input input-bordered flex items-center gap-2">
                <IconMail />
                <input
                    type="text" className="grow" placeholder="Email" name='email'
                    onChange={handleChangeDataRegister}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconUsername />
                <input
                    type="text" className="grow" placeholder="Tên người dùng" name='username'
                    onChange={handleChangeDataRegister}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconPassword />
                <input
                    type="password" className="grow" placeholder='Mật khẩu' name='password'
                    onChange={handleChangeDataRegister}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconConfirmPassword />
                <input
                    type="password" className="grow" placeholder='Nhập lại mật khẩu' name='confirmPassword'
                    onChange={handleChangeDataRegister}
                />
            </label>
            <div className='w-full flex justify-center mt-4'>
                <button
                    className="btn btn-neutral"
                    onClick={handleRegister}
                >Đăng ký</button>
            </div>
            <div className='flex justify-center mt-2'>
                <Link href="/login">
                    <button className="btn btn-active btn-link text-blue-600">Bạn đã có tài khoản? Đăng nhập</button>
                </Link>
            </div>
            <Snackbar
                open={dataSnackBar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={dataSnackBar.message}
                action={action}
            />
        </div>
    )
}

export default RegisterForm