import { QUERY_MESSAGE } from "@/types"
import AxiosInstance from "../api"

export const createMessage = (dataRequest: any) => {
    return AxiosInstance.post("/message", {...dataRequest})
}

export const getMessage = (query: QUERY_MESSAGE) => {
    return AxiosInstance.get(`/message?sfindId=${query.sfindId}&des=${query.des}`)
}