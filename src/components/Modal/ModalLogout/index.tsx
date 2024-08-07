'use client'
import { logoutUser } from '@/endpoint/auth'
import { KEY_LOCAL } from '@/types/keyLocal';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function ModalLogout() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    function handleLogout() {
        setIsLoading(true);
        logoutUser()
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "/login";
                    localStorage.removeItem(KEY_LOCAL.PROFILE_USER)
                }
            })
            .catch((err) => {
                console.log({ err })
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    return (
        <>
            <dialog id="modalLogout" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bạn có muốn đăng xuất không?</h3>
                    <div className='w-full flex justify-center mt-5 items-center'>
                        <button
                            className={`btn ${isLoading ? "btn-disabled" : "btn-outline"} mr-5`}
                            onClick={handleLogout}
                        >
                            {isLoading && <span className="loading loading-spinner"></span>}
                            Đăng xuất
                        </button>
                        <form method="dialog">
                            <button className='btn btn-neutral'>Quay lại</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    )
}

export default ModalLogout