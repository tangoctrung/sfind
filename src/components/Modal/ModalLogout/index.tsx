import React from 'react'

function ModalLogout() {
    return (
        <>
            <dialog id="modalLogout" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bạn có muốn đăng xuất không?</h3>
                    <div className='w-full flex justify-center mt-5 items-center'>
                        <button className="btn btn-outline mr-5">Đăng xuất</button>
                        <button className="btn btn-neutral">Quay lại</button>
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