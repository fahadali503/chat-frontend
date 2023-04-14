import { ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react"
import { ChatListItemComponent } from "./ChatListItem";

type Props = {

};

export function ChatListComponent({ }: Props) {
    return <Stack py={"sm"} className="pr-2">
        <Title order={2} color="#495057" lts={"0.09em"} fw={"normal"}>Chats</Title>

        {/* Search Input */}
        <TextInput placeholder="Search here..."
            rightSection={<IconSearch size={"1.2rem"} />}
        />
        {/*END Search Input */}

        <div className="h-full">
            <ScrollArea type="auto" h={500} className="mt-3">
                {/* Favourites */}
                <div className="space-y-2">
                    <Text className="font-medium text-gray-500">Favourites</Text>
                    <ChatListItemComponent isActiveChat />
                    <ChatListItemComponent isActiveChat={false} />
                    <ChatListItemComponent isActiveChat={false} />

                </div>
                {/* END Favourites */}
                <div className="mt-10 space-y-2">
                    <Text className="font-medium text-gray-500">Direct Messages</Text>
                    <ChatListItemComponent isActiveChat={false} />
                    <ChatListItemComponent isActiveChat={false} />
                    <ChatListItemComponent isActiveChat={false} />
                    <ChatListItemComponent isActiveChat={false} />
                </div>

                {/* Direct Messages */}
                {/* END Direct Messages */}
            </ScrollArea>
        </div>
    </Stack>
}