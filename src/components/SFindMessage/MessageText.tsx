'use client'

import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function MessageText() {

    const [isExpand, setIsExpand] = useState<boolean>(false);

    let text = "<h3>Giải vô địch bóng đá châu Âu 2024</h3> <span>Đây là lần thứ ba các trận đấu của Giải vô địch bóng đá châu Âu được diễn ra trên lãnh thổ Đức và cũng là lần thứ hai dưới tư cách là một nước Đức thống nhất, sau khi Tây Đức đã đăng cai Euro 1988 và 4 trận đấu của Euro 2020 được tổ chức tại 11 quốc gia diễn ra ở München. Đây là lần đầu tiên giải đấu được tổ chức tại nơi trước đây là Đông Đức cũ, với Leipzig là một thành phố đăng cai và cũng như giải đấu lớn đầu tiên kể từ Giải vô địch bóng đá thế giới 2006 mà Đức là quốc gia chủ nhà một mình.[1] Ngoại trừ Euro 2020 bị hoãn sang năm 2021 do ảnh hưởng của đại dịch COVID-19, giải đấu tổ chức trở lại theo chu kỳ bốn năm một lần như thông thường</span> <h3>Giải vô địch bóng đá châu Âu 2024</h3> <span>Đây là lần thứ ba các trận đấu của Giải vô địch bóng đá châu Âu được diễn ra trên lãnh thổ Đức và cũng là lần thứ hai dưới tư cách là một nước Đức thống nhất, sau khi Tây Đức đã đăng cai Euro 1988 và 4 trận đấu của Euro 2020 được tổ chức tại 11 quốc gia diễn ra ở München. Đây là lần đầu tiên giải đấu được tổ chức tại nơi trước đây là Đông Đức cũ, với Leipzig là một thành phố đăng cai và cũng như giải đấu lớn đầu tiên kể từ Giải vô địch bóng đá thế giới 2006 mà Đức là quốc gia chủ nhà một mình.[1] Ngoại trừ Euro 2020 bị hoãn sang năm 2021 do ảnh hưởng của đại dịch COVID-19, giải đấu tổ chức trở lại theo chu kỳ bốn năm một lần như thông thường</span>"

    function handleExpand() {
        setIsExpand(true);
    }

    function handleDoubleClick() {
        if (isExpand) {
            setIsExpand(false);
        }
    }

    return (
        <div className={`containerMessageText h-${isExpand ? "128" : "80"} max-w-[90%] mt-20 flex justify-end items-center relative cursor-pointer transition-all duration-700 `}>
            <p className='absolute w-full text-center top-[-2.5rem] text-sm text-gray-400'>11:20 20/03/2022</p>
            <div className={`h-full  transition-all duration-700 w-[90%] tablet:w-${isExpand ? "auto" : "[60%]"} laptop:w-[50%] overflow-${isExpand ? "scroll" : "hidden"} scrollbar-none ${isExpand ? "" : "line-clamp-[12]"} rounded-xl absolute bg-slate-300 p-2 box-border`}
                style={{ maskImage: isExpand ? "" : "linear-gradient(rgb(0, 0, 0) 60%, transparent)" }}
                onClick={() => handleDoubleClick()}
            >
                {ReactHtmlParser(text)}
                {!isExpand &&
                    <div className='absolute bottom-32 w-[calc(100%-1rem)] text-center '>
                        <button className="btn text-base font-bold"
                            onClick={() => handleExpand()}
                        >
                            <ArrowDownwardIcon />
                            Xem thêm
                        </button>
                    </div>}
            </div>
        </div>
    )
}

export default MessageText