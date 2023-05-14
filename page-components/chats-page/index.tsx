import { Grid, Notification } from "@mantine/core";
import { ChatListComponent } from "./chat-list/ChatList";
import { SelectedChat } from "./chat";
import { useEffect, useState } from "react";
import { ChatApi } from "@/api/chat.api";
import { IChat } from "@/types/chat.types";
import { IUser } from "@/types/user.types";
import { useAuthenticatedSocket } from "@/hooks/useAuthenticatedSocket";
import { useSocket, useSocketEvent } from "socket.io-react-hook";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const chatApi = new ChatApi();

export function ChatsPageComponent() {
    const [selectedFriendFromSearch, setSelectedFriendFromSearch] = useState('');
    const [selectedChatId, setSelectedChatId] = useState("")
    const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
    const [friend, setFriend] = useState<IUser | null>(null);
    const { socket, connected, error } = useAuthenticatedSocket();

    useEffect(() => {
        if (connected) {
            console.log("Socket io connected", connected);
            notifications.show({
                message: "Connection established to the server",
                icon: <IconCheck size="1.1rem" />,
                color: "green"
            })
        }
        socket.on('exception', (error) => {
            notifications.show({
                message: error.message,
                icon: <IconX size="1.1rem" />,
                color: "red"
            })
        });
        return () => {
            socket.off("test");
            socket.off("exception");
        }
    }, [connected])

    useEffect(() => {
        if (selectedFriendFromSearch.length > 0) {
            (async function createChat() {
                const response = await chatApi.createChat(selectedFriendFromSearch);
                setSelectedChatId(response.data._id);
                setSelectedChat(response.data);
            })()
        }
    }, [selectedFriendFromSearch]);


    return <Grid className="h-full p-0 m-0">
        {/* Display Chat List */}
        <Grid.Col span={3}>
            <ChatListComponent setSelectedFriendFromSearch={setSelectedFriendFromSearch}
                selectedChatId={selectedChatId}
                setSelectedChatId={(id: string) => setSelectedChatId(id)}
                setFriend={setFriend}
            />
        </Grid.Col>
        {/* END Display Chat List */}

        {/* Display selected chat */}
        <Grid.Col span={9} className="p-0">

            <SelectedChat friend={friend} selectedChatId={selectedChatId} />

        </Grid.Col>
        {/* END Display selected chat */}
    </Grid>

}