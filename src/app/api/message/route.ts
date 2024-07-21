import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import { connectToDB } from "@/servers/mongodb";
import { cookies } from "next/headers";
import Message from "@/servers/models/Message";
import jwt from "jsonwebtoken"
import { NextRequest } from "next/server";
import Sfind from "@/servers/models/Sfind";

export const POST = async (req: Request) => {
    try {
        connectToDB();
        const body = await req.json();
        const {description, files, type, content, sfind} = body
        if ((files?.length <= 0 && content === "") || sfind === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        
        const accessToken = cookies().get("accessToken")?.value || "";
        let userID = "";
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            userID = data?.userID;
        } catch (error) {
            return convertDataResponse(401, false, "Lỗi token", null);
        }
        
        const newMessage = new Message({
            description,
            files,
            type,
            content,
            sfind,
            sender: userID
        });

        const message = await newMessage.save();

        return convertDataResponse(200, true, "Tạo message thành công", {message});
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const params = req.nextUrl.searchParams
        const sfindId = params.get("sfindId") || ""
        const des = params.get("des") || ""
        let messages = [];
        const accessToken = cookies().get("accessToken")?.value || "";
        const sfindToken = cookies().get("sfindToken")?.value || "";

        let userID = "";
        // xac thuc accessToken
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            userID = data?.userID;
        } catch(error) {
            return convertDataResponse(401, false, "Lỗi token", null);

        }
        // xac thuc sfindToken
        const sfind = await Sfind.findById(sfindId)
        if (sfind?.password && !sfindToken) {
            return convertDataResponse(400, false, "Bạn cần nhập mật khẩu cho sfind", null);
        }
        if (sfind?.password && sfindToken) {
            try {
                jwt.verify(sfindToken, process.env.SECRET_TOKEN_SFIND || "trungtn12345")
            } catch(error) {
                cookies().delete("sfindToken");
                return convertDataResponse(400, false, "Lỗi token sfind", null);
            }
        }

        if (sfindId) {
            if (des === "") {
                messages = await Message.find({sender: userID, sfind: sfindId});
                return convertDataResponse(200, true, "Thành công", {messages});
            } else {

            }
        } else {
            return convertDataResponse(404, false, "Không tìm thấy message", null);
        }
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}