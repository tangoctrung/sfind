import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import { cookies } from 'next/headers'

export const POST = async (req: Request) => {
    try {
        cookies().delete("accessToken");
        cookies().delete("sfindToken");

        return convertDataResponse(200, true, "Đăng xuất thành công", null)

    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}