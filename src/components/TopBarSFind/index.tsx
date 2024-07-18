import React from 'react'
import ModalInfoSFind from '../Modal/ModalInfoSFind'
import SearchIcon from '@mui/icons-material/Search';

function TopBarSFind() {
    return (
        <div className="w-[85%] tablet:w-[calc(100%-13rem)] flex justify-center items-center">
            <label className="input input-bordered flex items-center gap-2 h-10 w-auto tablet:min-w-64 laptop:min-w-80">
                <input type="text" className="grow" placeholder="Search" />
                <SearchIcon />
            </label>
            {/* <ModalInfoSFind /> */}
        </div>
    )
}

export default TopBarSFind