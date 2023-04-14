import { updateAuthAction } from "@/store/auth/auth.slice";
import { AuthLocalStorage } from "@/types/user.types";
import { AUTH_LOCAL_STORAGE_CONSTANT } from "@/utils/constants";
import { getValueFromLocalStorage } from "@/utils/localstorage";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FullScreenLoader } from "./FullScreenLoader";
import { NavbarComponent } from "./navbar/Navbar";
import { Grid } from "@mantine/core";

type Props = {
    children?: JSX.Element | JSX.Element[] | null | undefined
}


export const AuthLayout = ({ children }: Props) => {
    const [loading, setLoading] = useState(false);
    const authLocalStorage = getValueFromLocalStorage<AuthLocalStorage>(AUTH_LOCAL_STORAGE_CONSTANT);

    const router = useRouter();
    const dispatch = useDispatch();
    useShallowEffect(() => {
        setLoading(true);
        if (authLocalStorage) {
            console.log("local storage", authLocalStorage)
            dispatch(updateAuthAction({ token: authLocalStorage.token, user: authLocalStorage.user }))
        }
        else {
            dispatch(updateAuthAction({ token: null, user: null }));
            router.push("/signin")
        }
        setLoading(false);
    }, [])

    if (loading) {
        return <FullScreenLoader />
    }
    return <div className={"overflow-x-hidden p-0 m-0 h-screen overflow-y-hidden"}>
        <Grid gutter={"sm"} className="h-full p-0 m-0">
            <Grid.Col span={1}>
                <NavbarComponent />
            </Grid.Col>
            <Grid.Col span={11} className="h-full p-0 m-0">
                {children}
            </Grid.Col>
        </Grid>
    </div>
}