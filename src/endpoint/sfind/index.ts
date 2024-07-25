import AxiosInstance from "../api"

export const createSfind = (dataRequest: any) => {
    return AxiosInstance.post("/sfind", {...dataRequest})
}

export const getSfinds = (sfindId: string) => {
    return AxiosInstance.get(`/sfind?q=${sfindId}`)
}

export const updateSfinds = (sfindId: string, dataRequest: any) => {
    return AxiosInstance.put(`/sfind?sfindId=${sfindId}`, {...dataRequest})
}

export const deleteSfinds = (sfindId: string) => {
    return AxiosInstance.delete(`/sfind?sfindId=${sfindId}`)
}