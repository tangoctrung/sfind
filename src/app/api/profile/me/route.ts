import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import jwt from "jsonwebtoken";
import User from "@/servers/models/User";
import { cookies } from "next/headers";
import { connectToDB } from "@/servers/mongodb";

export const GET = async (req: Request) => {
    connectToDB();
    
    try {
        const accessToken = cookies().get("accessToken")?.value;
        if (!accessToken) {
            return convertDataResponse(401, false, "Yêu cầu xác thực", null);
        }
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            const userID = data?.userID;
            const user = await User.findOne({_id: userID}).select("-password");
            if (user) {
                return convertDataResponse(200, true, "Thành công", {user});
            }
            return convertDataResponse(400, false, "Không tìm thấy người dùng", null);
        } catch (error) {
            return convertDataResponse(401, false, "Lỗi token", null);
        }

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}

export const PUT = async (req: Request) => {
    connectToDB();
    
    try {
        const accessToken = cookies().get("accessToken")?.value;
        if (!accessToken) {
            return convertDataResponse(401, false, "Yêu cầu xác thực", null);
        }
        try {
            const data: any = jwt.verify(accessToken, process.env.SECRET_TOKEN || "trungtn12345")
            const userID = data?.userID;
            const body = await req.json();
            const user = await User.findByIdAndUpdate(userID, {
                $set: body
            });
            if (user) {
                return convertDataResponse(200, true, "Thành công", null);
            }
            return convertDataResponse(400, false, "Không tìm thấy người dùng", null);
        } catch (error) {
            return convertDataResponse(401, false, "Lỗi token", null);
        }

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}