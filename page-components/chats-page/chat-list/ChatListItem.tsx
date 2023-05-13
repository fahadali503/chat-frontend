import { IChat } from "@/types/chat.types";
import { IUser } from "@/types/user.types";
import { Avatar, Badge, Group, Indicator, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type Props = {
    isActiveChat: boolean;
    chat: IChat & { friend: IUser }
    setSelectedChatId: (id: string) => void;
}

export function ChatListItemComponent({ isActiveChat, chat, setSelectedChatId }: Props) {
    const { hovered, ref } = useHover();
    const friend = chat.friend;
    return <Group ref={ref}
        spacing={"sm"}
        className={`cursor-pointer py-2 px-4 ${hovered ? "bg-slate-200" : ""} 
    ${isActiveChat ? "bg-slate-200" : ""}`}
        position="apart"
        onClick={() => setSelectedChatId(chat._id)}
    >
        <Group spacing={"lg"}>
            <Indicator inline size={12} offset={3} position="bottom-end" color="red" withBorder>
                <Avatar size="sm" radius="xl" >{friend.email.slice(0, 1)}</Avatar>
            </Indicator>
            <Text className="font-medium text-gray-600">{friend.email}</Text>
        </Group>
        {/* <Badge h={"100%"} size="md" color="blue" variant="outline">
        </Badge> */}
    </Group>
}