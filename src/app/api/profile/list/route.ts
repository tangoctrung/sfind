import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import User from "@/servers/models/User";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    
    const params = req.nextUrl.searchParams
    const q = params.get("q") || ""
    let users = null;
    try {
        users = await User.find({email: { $regex: new RegExp(q, 'i') }}).select("-password");
        if (users) {
            return convertDataResponse(200, true, "Thành công", {users});
        }
        return convertDataResponse(400, false, "Không tìm thấy người dùng", null);

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}