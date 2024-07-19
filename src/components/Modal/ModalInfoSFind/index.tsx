'use client'
import React from 'react'

function ModalInfoSFind() {

    return (
        <>
            <h3 className="font-bold text-lg">Thông tin của SFind</h3>
            <div role="tablist" className="tabs tabs-boxed mt-5 max-h-80">
                <input type="radio" name="my_tabs_2" role="tab" className="tab text-sm font-bold min-w-24" aria-label="Thông tin" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-3 max-h-44 overflow-scroll scrollbar-none">
                    <div className='mt-0'>
                        <span className='font-bold'>Tên: </span> Nhật ký cuộc đời
                    </div>
                    <div className='mt-2'>
                        <span className='font-bold'>Ngày tạo: </span> 22:10 23/10/2022
                    </div>
                    <div className='mt-2'>
                        <span className='font-bold'>Quản trị viên: </span> Tạ Ngọc Trung
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab text-sm font-bold min-w-20"
                    aria-label="Dữ liệu"
                    defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-3">

                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab text-sm font-bold min-w-28" aria-label="Thành viên" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-3">

                </div>
            </div>
            <div className=' w-full flex justify-end absolute bottom-5 right-5'>
                <button className="btn btn-error">Xóa SFind</button>
            </div>
        </>
    )
}

export default ModalInfoSFind