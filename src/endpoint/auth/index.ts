import { REGISTER_DATA } from "@/types";
import AxiosInstance from "../api";

export const registerUser = (dataRequest: REGISTER_DATA) => {
    return AxiosInstance.post("/auth/register", {...dataRequest})
}


export const loginUser = (dataRequest:any) => {
    return AxiosInstance.post("auth/credential", {...dataRequest})
}

export const getInfoUser = () => {
    return AxiosInstance.get("api/get-me")
}

export const updateInfoUser = (dataRequest:any) => {
    return AxiosInstance.put("api/users", {...dataRequest})
}