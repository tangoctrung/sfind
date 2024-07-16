"use client";
import { getInfoUser } from "@/endpoint/user";
import { updateInfoUser } from "@/lib/features/controlData/controlDataSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getInfoUserFromLocalStorage, setInfoUserToLocalStorage } from "@/utils/handleLocal";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface Props {
    readonly children: ReactNode;
}

export const AppMain = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = getInfoUserFromLocalStorage();
        if (user?.id) {
            dispatch(updateInfoUser(user))
        } else {
            getInfoUser()
                .then((res) => {
                    dispatch(updateInfoUser(res.data?.data?.user))
                    setInfoUserToLocalStorage(res.data?.data?.user);
                })
                .catch((err) => {
                    console.log(err);

                })
        }
    }, [dispatch]);

    return <>{children}</>;
};
