import { COLORS } from "@/utils/colors";
import { Button, Card, Center, Container, Input, Stack, Title, createStyles } from "@mantine/core";
import Head from "next/head";
import { notifications } from '@mantine/notifications';
import { ChangeEvent, FormEvent, useState } from "react";
import { IAuthErrorResponse, authApi } from "@/api/user.api";
import { AxiosError } from "axios";


const useStyles = createStyles((theme) => {
    return {
        containerBackgroundColor: {
            backgroundColor: COLORS.BG
        }
    }
});

export default function SignupPage() {
    const { classes } = useStyles();
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authApi("/signup", data);
            notifications.show({
                message: response.message,
                title: "Success",
                radius: "md",
                color: "green",
                autoClose: 3000
            });
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
            <Title align="center">Register an account</Title>

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
                            className="bg-blue-400"

                            w={"100%"} type="submit">
                            Sign Up
                        </Button>
                    </Center>
                </form>

            </Container>
        </Card>
    </Stack>
}