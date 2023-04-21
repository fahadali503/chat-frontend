import { ActionIcon, Avatar, Button, Center, Container, Group, Loader, Modal, ScrollArea, Table, Text, TextInput, Title } from "@mantine/core";
import { IconPlus, IconSearch, IconUserCheck } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { FriendsApi } from "@/api/friends.api";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user.types";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { addNewFriendAction, removeFriendAction } from "@/store/auth/auth.slice";
import { IconUserX } from "@tabler/icons-react";
import { RootState } from "@/store";

const friendsApi = new FriendsApi("/friends");

export function ContactsPageComponent() {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [nonFriends, setNonFriends] = useState<IUser[]>([]);
    const [friends, setFriends] = useState<IUser[]>([]);
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getNonFriends() {
            try {
                const response = await friendsApi.getNonFriends();
                console.log(response.data)
                setNonFriends(response.data);
            } catch (error) {
                const err = error as AxiosError;
                console.log("Error in Non Friends", err.response?.data)
            }
        }
        getNonFriends();
    }, [])

    useEffect(() => {
        async function getFriends() {
            setLoading(true);
            try {
                const response = await friendsApi.getAllFriends();
                console.log(response.data)
                setFriends(response.data);
            } catch (error) {
                const err = error as AxiosError;
                console.log("Error in Non Friends", err.response?.data)
            } finally {
                setLoading(false);
            }
        }
        getFriends();
    }, [])


    async function addNewFriend(userId: string) {
        try {
            const response = await friendsApi.addFriend(userId);
            dispatch(addNewFriendAction(response.data.friendId));
            notifications.show({
                title: "Success",
                message: response.data.message
            });

        } catch (error) {
            console.log(`Error in ${addNewFriend.name}`, (error as Error).message);
        }
    }

    async function removeFriend(userId: string) {
        try {
            const response = await friendsApi.removeFriend(userId);
            dispatch(removeFriendAction(response.data.friendId));
            notifications.show({
                title: "Success",
                message: response.data.message
            });

        } catch (error) {
            console.log(`Error in ${addNewFriend.name}`, (error as Error).message);
        }
    }


    return <Container size={"lg"} my={"lg"} px={"xs"}>
        {/* Display List of Non Friends */}
        <Modal opened={opened} onClose={close}
            scrollAreaComponent={ScrollArea.Autosize}
            size="55%"
        >
            <Modal.Title>
                <Text className="text-xl text-center text-[#495057]">Add Friends</Text>
            </Modal.Title>
            <Table verticalSpacing="sm">
                <tbody>
                    {nonFriends.map(user => {
                        return <tr key={user._id}>
                            <td>
                                <Group position="center" spacing="sm">
                                    <Avatar size={40} radius={40} >{user.email.slice(0, 2).toUpperCase()}</Avatar>
                                    <div>
                                        <Text fz="md" c="dimmed">
                                            {user.email}
                                        </Text>
                                    </div>
                                </Group>
                            </td>
                            <td>
                                {authState.user!.friends.includes(user._id) ? <IconUserCheck size={35} className="text-blue-400" /> :
                                    <Button onClick={() => addNewFriend(user._id)} color={"blue"} className={`"bg-blue-400" rounded-full`}>{"Add"}</Button>
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Modal>

        {/* Search Input */}
        <Title order={2} color="#495057" lts={"0.09em"} fw={"normal"}>Contacts</Title>
        <Group position="center">
            <TextInput w={700} placeholder="Search here..."
                rightSection={<IconSearch size={"1.2rem"} />}
            />
            <ActionIcon onClick={open} variant="transparent">
                <IconPlus size="2rem" />
            </ActionIcon>
        </Group>

        {/* List Of Friends */}
        <ScrollArea h={500} className="mt-10">
            {
                loading ? <Center>
                    <Loader />
                </Center>
                    : <Table miw={800} verticalSpacing="sm">
                        <tbody>
                            {
                                friends.length > 0 ? friends.map(user => {
                                    return <tr key={user._id}>
                                        <td>
                                            <Group position="center" spacing="sm">
                                                <Avatar size={40} radius={40} >{user.email.slice(0, 2).toUpperCase()}</Avatar>
                                                <div>
                                                    <Text fz="md" c="dimmed">
                                                        {user.email}
                                                    </Text>
                                                </div>
                                            </Group>
                                        </td>
                                        <td>
                                            {!authState.user!.friends.includes(user._id) ? <IconUserX size={35} className="text-red-400" /> :
                                                <Group className="space-x-3">
                                                    <Button onClick={() => removeFriend(user._id)} color={"red"} className={`bg-red-400 rounded-full`}>
                                                        Remove Friend
                                                    </Button>
                                                </Group>
                                            }
                                        </td>
                                    </tr>
                                })
                                    : null
                            }
                        </tbody>
                    </Table>
            }
        </ScrollArea>
    </Container>
}