import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import { connectToDB } from "@/servers/mongodb";
import bcrypt from 'bcrypt'
import Sfind from "@/servers/models/Sfind";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const POST = async (req: Request) => {
    try {
        connectToDB();
        const body = await req.json();
        const {nameSfind, avatar, password} = body
        if (nameSfind === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        let hashedPass = ""
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPass = await bcrypt.hash(password, salt);
        }
        const accessToken = cookies().get("accessToken")?.value;
        let userID = "";
        if (!accessToken) {
            if (!hashedPass) {
                return convertDataResponse(400, true, "Bạn chưa tạo mật khẩu", null);
            }
        } else {
            try {
                const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
                userID = data?.userID;
            } catch (err) {
                console.log({err});
                return convertDataResponse(401, false, "Lỗi token", null);
            }
        }
        const newSfind = new Sfind({
            nameSfind: nameSfind,
            avatar: avatar,
            password: hashedPass,
            admin: userID,
        });

        const sfind = await newSfind.save();

        return convertDataResponse(200, true, "Tạo Sfind thành công", {sfind});
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const params = req.nextUrl.searchParams
        const q = params.get("q") || ""
        connectToDB();
        const accessToken = cookies().get("accessToken")?.value || "";
        let userID = "";
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            userID = data?.userID;
        } catch(error) {
            return convertDataResponse(401, false, "Lỗi token", null);

        }
        if (q) {
            const sfind = await Sfind.findOne({_id: q, admin: userID});
            const expireTimeSfind = sfind?.expireTime;
            if (sfind?.password && !expireTimeSfind) {
                return convertDataResponse(400, false, "Bạn cần nhập mật khẩu cho sfind", null);
            }
            if (sfind?.password && expireTimeSfind) {
                if (expireTimeSfind <= new Date().getTime()) {
                    return convertDataResponse(400, false, "Lỗi token sfind", null);
                }
            }
            const {password, expireTime, ...dataSfind } = sfind?._doc;

            return convertDataResponse(200, true, "Thành công", {sfind: dataSfind});
        } else {
            let sfinds = await Sfind.find({admin: userID}).sort({ createdAt: -1 }).select(["-password", "-expireTime"]);
            if (sfinds) {
                return convertDataResponse(200, true, "Thành công", {sfinds});
            }
        }
        return convertDataResponse(400, false, "Không tìm thấy Sfinds", null);
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const accessToken = cookies().get("accessToken")?.value || "";
        
        let userID = "";
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            userID = data?.userID;
        } catch (error) {
            return convertDataResponse(401, false, "Lỗi token", null);
        }
        
        connectToDB();
        const body = await req.json();
        const params = req.nextUrl.searchParams
        const sfindId = params.get("sfindId") || ""

        if (body?.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(body?.password, salt);
            const dataUpdate = {
                ...body,
                password: hashedPass,
                expireTime: 0,
            }
            await Sfind.findOneAndUpdate({_id: sfindId, admin: userID}, {$set: dataUpdate})
        } else {
            const {password, ...data} = body;
            await Sfind.findOneAndUpdate({_id: sfindId, admin: userID}, {$set: data})
        }

        return convertDataResponse(200, true, "Cập nhật sfind thành công", null);
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const accessToken = cookies().get("accessToken")?.value || "";
        
        let userID = "";
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            userID = data?.userID;
        } catch (error) {
            return convertDataResponse(401, false, "Lỗi token", null);
        }
        
        connectToDB();
        const params = req.nextUrl.searchParams
        const sfindId = params.get("sfindId") || ""
        if (sfindId === "") {
            return convertDataResponse(400, false, "Bạn chưa điền đầy đủ thông tin", null);
        }
        
        await Sfind.findOneAndDelete({_id: sfindId, admin: userID})

        return convertDataResponse(200, true, "Xóa sfind thành công", null);
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}