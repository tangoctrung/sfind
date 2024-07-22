import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import User from "@/servers/models/User";
import { NextRequest } from "next/server";
import { connectToDB } from "@/servers/mongodb";

export const GET = async (req: NextRequest) => {
    
    const params = req.nextUrl.searchParams
    const userID = params.get("userID")
    const email = params.get("email")
    let user = null;
    connectToDB();

    try {
        if (userID) {
            user = await User.findOne({_id: userID}).select("-password");
        } else {
            user = await User.findOne({email: email}).select("-password");
        }
        if (user) {
            return convertDataResponse(200, true, "Thành công", {user});
        }
        return convertDataResponse(400, false, "Không tìm thấy người dùng", null);

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}