import { connectToDB } from "@/servers/mongodb";
import { convertDataResponse } from "@/servers/utils/convertDataResponse";

export const GET = async () => {
  try {
    connectToDB();
    return convertDataResponse(200, true, "Server is running...", null);
  } catch (error: any) {
    return convertDataResponse(
      500,
      false,
      error?.message || "Lỗi hệ thống",
      null
    );
  }
};
