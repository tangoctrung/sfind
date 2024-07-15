import { LOGIN_DATA, REGISTER_DATA } from "@/types";
import AxiosInstance from "../api";

export const registerUser = (dataRequest: REGISTER_DATA) => {
    return AxiosInstance.post("/auth/register", {...dataRequest})
}

export const loginUser = (dataRequest: LOGIN_DATA) => {
    return AxiosInstance.post("/auth/login", {...dataRequest})
}

export const logoutUser = () => {
    return AxiosInstance.post("/auth/logout")
}