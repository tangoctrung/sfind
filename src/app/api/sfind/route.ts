import { convertDataResponse } from "@/servers/utils/convertDataResponse";

export const GET = async (req: Request) => {
    try {
        return convertDataResponse(200, true, "Serve đang chạy", null);
    } catch (error: any) {
        return convertDataResponse(500, false, error?.message || "Lỗi hệ thống", null);
    }
}