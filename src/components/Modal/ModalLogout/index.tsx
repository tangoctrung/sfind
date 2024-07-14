import Link from 'next/link'
import React from 'react'

function ModalLogout() {
    return (
        <>
            <dialog id="modalLogout" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bạn có muốn đăng xuất không?</h3>
                    <div className='w-full flex justify-center mt-5 items-center'>
                        <button
                            className="btn btn-outline mr-5"
                        >
                            <Link href={"/login"}>Đăng xuất</Link>
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