import { Avatar, Badge, Group, Indicator, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type Props = {
    isActiveChat: boolean
}

export function ChatListItemComponent({ isActiveChat }: Props) {
    const { hovered, ref } = useHover();
    return <Group ref={ref}
        spacing={"sm"}
        className={`cursor-pointer py-2 px-4 ${hovered ? "bg-slate-200" : ""} 
    ${isActiveChat ? "bg-slate-200" : ""}`}
        position="apart"
    >
        <Group spacing={"lg"}>
            <Indicator inline size={12} offset={3} position="bottom-end" color="red" withBorder>
                <Avatar size="sm" radius="xl" >AA</Avatar>
            </Indicator>
            <Text className="font-medium text-gray-600">a@a.com</Text>
        </Group>
        <Badge h={"100%"} size="md" color="blue" variant="outline">
            3
        </Badge>
    </Group>
}