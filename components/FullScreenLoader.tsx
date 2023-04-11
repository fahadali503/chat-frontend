import { Center, Loader } from "@mantine/core";

export function FullScreenLoader() {

    return <Center maw={400} h={"100vh"} mx="auto">
        <Loader color="indigo" />
    </Center>
}