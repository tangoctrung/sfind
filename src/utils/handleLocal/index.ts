import { KEY_LOCAL } from "@/types/keyLocal";

export function getInfoUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem(KEY_LOCAL.PROFILE_USER) || "{}")
}

export function setInfoUserToLocalStorage(data: any) {
    localStorage.setItem(KEY_LOCAL.PROFILE_USER, JSON.stringify({ ...data, id: data?._id }))
}