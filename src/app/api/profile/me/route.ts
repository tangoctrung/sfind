import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/servers/models/User";

export const GET = async (req: Request) => {
    
    try {
        const authorization = headers().get('authorization')
        const accessToken = authorization?.split("Bearer")[1].trim()
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