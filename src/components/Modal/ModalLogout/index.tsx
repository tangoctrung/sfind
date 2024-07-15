'use client'
import { logoutUser } from '@/endpoint/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

function ModalLogout() {

    const router = useRouter();
    function handleLogout() {
        logoutUser()
            .then(res => {
                if (res.status === 200) {
                    router.push("/login");
                }
            })
            .catch((err) => {
                console.log({ err })
            })
    }
    return (
        <>
            <dialog id="modalLogout" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bạn có muốn đăng xuất không?</h3>
                    <div className='w-full flex justify-center mt-5 items-center'>
                        <button
                            className="btn btn-outline mr-5"
                            onClick={handleLogout}
                        >
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