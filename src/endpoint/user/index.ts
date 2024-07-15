import AxiosInstance from "../api"

export const getInfoUser = () => {
    return AxiosInstance.get("/profile/me")
}

export const updateInfoUser = (dataRequest:any) => {
    return AxiosInstance.put("/profile/me", {...dataRequest})
}