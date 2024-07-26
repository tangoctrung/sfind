import { IconPassword } from '@/assets/icons/IconPassword'
import React, { useState } from 'react'

function TypePassword({ handleSubmitPasswordSfind }: { handleSubmitPasswordSfind: any }) {

    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");


    function handleTypePassword(e: any) {
        setPassword(e.target?.value);
    }
    function handleSubmitPassword() {
        setIsLoading(true)
        handleSubmitPasswordSfind(password, () => setIsLoading(false))
    }

    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <h3>Bạn cần nhập mật khẩu để truy cập</h3>
            <label className="input input-bordered flex items-center gap-2 mt-3">
                <IconPassword />
                <input
                    type="password" className="grow" value={password} placeholder='********'
                    onChange={handleTypePassword}
                />
            </label>
            <button
                className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-4`}
                onClick={handleSubmitPassword}
            >
                {isLoading && <span className="loading loading-spinner"></span>}
                Nhập
            </button>

        </div>
    )
}

export default TypePassword