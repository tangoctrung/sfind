import AxiosInstance from "../api"

export const createSfind = (dataRequest: any) => {
    return AxiosInstance.post("/sfind", {...dataRequest})
}

export const getSfinds = () => {
    return AxiosInstance.get("/sfind")
}