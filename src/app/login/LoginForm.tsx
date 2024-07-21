'use client'
import { IconMail } from '@/assets/icons/IconMail'
import { IconPassword } from '@/assets/icons/IconPassword'
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { LOGIN_DATA } from '@/types';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { validateEmail } from '@/utils/validate';
import { loginUser } from '@/endpoint/auth';
import { useAppDispatch } from '@/lib/hooks';
import { updateUserToken } from '@/lib/features/controlData/controlDataSlice';
import { KEY_LOCAL } from '@/types/keyLocal';
import { setInfoUserToLocalStorage } from '@/utils/handleLocal';

function LoginForm() {

    const [dataSnackBar, setDataSnackBar] = useState({
        open: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataLogin, setDataLogin] = useState<LOGIN_DATA>({
        email: "",
        password: "",
    })
    const router = useRouter();
    const dispatch = useAppDispatch();

    function handleChangeDataLogin(e: any) {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        })
    }

    function validateForm(data: LOGIN_DATA) {
        if (data.email === "" || data.password === "") {
            return "Bạn chưa điền đầy đủ thông tin, hãy kiểm tra lại"
        }
        if (!validateEmail(data.email)) {
            return "Email không hợp lệ, hãy kiểm tra lại"
        }
        if (data.password?.length < 8) {
            return "Mật khẩu phải có ít nhất 8 ký tự"
        }
        return "";
    }

    function handleLogin() {
        let message: string = validateForm(dataLogin)
        if (message) {
            setDataSnackBar({
                open: true,
                message: message
            });
            return;
        }
        setIsLoading(true);
        loginUser(dataLogin)
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload()
                    setIsLoading(false);
                    dispatch(updateUserToken(res.data?.data))
                    setInfoUserToLocalStorage(res.data?.data?.user);
                }
            })
            .catch((err) => {
                console.log({ err })
                setDataSnackBar({
                    open: true,
                    message: err?.response?.data?.message || "Email hoặc mật khẩu không đúng"
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
        <div className='mt-10'>
            <label className="input input-bordered flex items-center gap-2">
                <IconMail />
                <input
                    type="text" className="grow" placeholder="Email" name='email'
                    onChange={handleChangeDataLogin}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconPassword />
                <input
                    type="password" className="grow" placeholder='Mật khẩu' name='password'
                    onChange={handleChangeDataLogin}
                />
            </label>
            <div className='w-full flex justify-end'>
                <Link href="/forgot-password">
                    <button className="btn btn-active btn-link text-blue-600">Quên mật khẩu</button>
                </Link>
            </div>
            <div className='w-full flex justify-center mt-4'>
                <button
                    className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"}`}
                    onClick={handleLogin}
                >
                    {isLoading && <span className="loading loading-spinner"></span>}
                    Đăng nhập
                </button>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <p className='w-24 h-[1px] bg-slate-300 mr-2'></p>
                hoặc
                <p className='w-24 h-[1px] bg-slate-300 ml-2'></p>
            </div>
            <div className='w-full flex justify-center mt-4'>
                <button className="btn w-[50%]">
                    <GoogleIcon />oogle
                </button>
            </div>
            <div className='flex justify-center mt-4'>
                <Link href="/register">
                    <button className="btn btn-active btn-link text-blue-600">Bạn chưa có tài khoản? Đăng ký</button>
                </Link>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={dataSnackBar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={dataSnackBar.message}
                action={action}
            />
        </div>
    )
}

export default LoginForm