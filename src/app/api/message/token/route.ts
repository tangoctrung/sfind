import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import bcrypt from 'bcrypt';
import { NextRequest } from "next/server";
import Sfind from "@/servers/models/Sfind";
import { connectToDB } from "@/servers/mongodb";

export const POST = async (req: NextRequest) => {
    
    try {
        connectToDB();

        const body = await req.json();
        const {sfindId, password} = body
        if (password === "" || sfindId === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        const sfind = await Sfind.findById(sfindId);

        if (!sfind) {
            return convertDataResponse(404, false, "Không tìm thấy sfind", null)
        }  
            
        const validate = await bcrypt.compare(password, sfind.password);
        if (!validate) {
            return convertDataResponse(400, false, "Sai mật khẩu", null)
        }        

        var expireTime = new Date().getTime() + parseInt(process.env.EXPIRED_SFIND_TOKEN || "900") * 1000;
        sfind.expireTime = expireTime
        const sfindNew = await sfind.save()

        console.log({sfind, sfindNew, expireTime});
        

        return convertDataResponse(200, true, "Thành công", null)

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}