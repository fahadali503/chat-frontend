import { ScrollArea, Select, SelectItem, Stack, Text, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react"
import { ChatListItemComponent } from "./ChatListItem";
import { useEffect, useState } from "react";
import { FriendsApi } from "@/api/friends.api";
import { IUser } from "@/types/user.types";
import { SelectFriend } from "./SelectFriend";
import { ChatApi } from "@/api/chat.api";
import { IChat } from "@/types/chat.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Props = {
    setSelectedFriendFromSearch: (value: string) => void;
    selectedChatId: string;
    setSelectedChatId: (id: string) => void;
    setFriend: (friend: IUser) => void;
};
const friendsApi = new FriendsApi("/friends");
const chatApi = new ChatApi();
export function ChatListComponent({ setSelectedFriendFromSearch, selectedChatId, setSelectedChatId, setFriend }: Props) {
    const [friends, setFriends] = useState<IUser[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<string>('');
    const [data, setData] = useState<SelectItem[]>([]);
    const [chats, setChats] = useState<({ friend: IUser } & IChat)[]>([]);
    const authenticatedUser = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        (async function getUserChats() {
            const response = await chatApi.getUserChats();
            const _chats = response.data.map(chat => ({ ...chat, friend: chat.participants.find(participant => participant._id !== authenticatedUser?._id) as IUser }));
            setChats(_chats);
        }())
    }, [authenticatedUser])

    useEffect(() => {
        (async function fetchFriends() {
            const response = await friendsApi.getAllFriends();
            const _friends: SelectItem[] = response.data.map(friend => ({
                label: friend.email,
                value: friend._id,
                image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png'
            }))
            setFriends(response.data);
            setData(_friends);
        })()
    }, [])

    return <Stack py={"sm"} className="pr-2">
        <Title order={2} color="#495057" lts={"0.09em"} fw={"normal"}>Chats</Title>

        {/* Search Input */}
        <Select
            data={data}
            itemComponent={SelectFriend}
            searchable
            onChange={val => {
                setSelectedFriend(val!);
                setSelectedFriendFromSearch(val!);
            }}
            placeholder="Search friends here..."
            rightSection={<IconSearch size={"1.2rem"} />}
        />
        {/*END Search Input */}

        <div className="h-full">
            <ScrollArea type="auto" h={500} className="mt-3">
                {/* Favourites */}
                <div className="space-y-2">
                    <Text className="font-medium text-gray-500">Favourites</Text>
                </div>
                {/* END Favourites */}
                <div className="mt-10 space-y-2">
                    <Text className="font-medium text-gray-500">Direct Messages</Text>
                    {chats.length > 0 ? chats.map(chat => {
                        return <ChatListItemComponent key={chat._id}
                            isActiveChat={selectedChatId === chat._id}
                            chat={chat}
                            setSelectedChatId={(id) => {
                                setSelectedChatId(id);
                                setFriend(chat.friend);
                            }}
                        />
                    }) : null}
                </div>

                {/* Direct Messages */}
                {/* END Direct Messages */}
            </ScrollArea>
        </div>
    </Stack>
}