import { IAuthErrorResponse, ILoginResponse, authApi } from "@/api/user.api";
import { COLORS } from "@/utils/colors";
import { AUTH_LOCAL_STORAGE_CONSTANT } from "@/utils/constants";
import { Button, Card, Center, Container, Input, Stack, Title, createStyles } from "@mantine/core";
import { AxiosError } from "axios";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from "next/router";
import { AuthLocalStorage } from "@/types/user.types";
import { useDispatch } from "react-redux";
import { updateAuthAction } from "@/store/auth/auth.slice";

const useStyles = createStyles((theme) => {
    return {
        containerBackgroundColor: {
            backgroundColor: COLORS.BG
        }
    }
});

export default function SignIn() {
    const { classes } = useStyles();
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [_, setAuthLocalStorage] = useLocalStorage<AuthLocalStorage | null>({
        key: AUTH_LOCAL_STORAGE_CONSTANT,
        defaultValue: null
    });
    const router = useRouter();
    const dispatch = useDispatch();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authApi<ILoginResponse>("/signin", data);
            setAuthLocalStorage({ token: response.token, user: response.user });
            notifications.show({
                message: response.message,
                title: "Success",
                radius: "md",
                color: "green",
                autoClose: 3000
            });
            dispatch(updateAuthAction({ token: response.token, user: response.user }));
            router.push("/chat");
        } catch (error) {
            const err = error as AxiosError<IAuthErrorResponse>;
            if (err.response && err.response.data) {
                notifications.show({
                    message: err.response.data.message,
                    title: "Failed",
                    radius: "md",
                    color: "red",
                    autoClose: 3000
                });
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return <Stack h={"100vh"} align="center" justify="center" className={classes.containerBackgroundColor}>
        <Head>
            <title>Sign Up</title>
        </Head>
        <Card shadow="sm" p="lg" w={800} radius="md" withBorder>
            <Title align="center">Sign in to your account</Title>

            <Container mt={20}>
                <form onSubmit={handleSubmit}>
                    <Input onChange={handleChange}
                        type="email" name="email" placeholder="Email Address"
                        value={data.email}
                    />
                    <Input name="password" my={10}
                        onChange={handleChange}
                        type="password"
                        value={data.password}
                        placeholder="Password" />
                    <Center>
                        <Button
                            disabled={data.email.length === 0 || data.password.length === 0}
                            loading={loading}
                            w={"100%"} type="submit">
                            Sign In
                        </Button>
                    </Center>
                </form>

            </Container>
        </Card>
    </Stack>
}