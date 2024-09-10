import { connectToDB } from "@/servers/mongodb";
import { convertDataResponse } from "@/servers/utils/convertDataResponse";
import { sendMessageTelegram } from "@/utils/handleBotTelegram";

export const GET = async () => {
  try {
    connectToDB();
    fetch("https://sfind.onrender.com/api/ping")
    .then((res) => {
      sendMessageTelegram("Ping host sfind.onrender.com success");
    })
    .catch((err: any) => {
      sendMessageTelegram("Ping host sfind.onrender.com fail");
    });
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
