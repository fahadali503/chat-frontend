import { ChatApi } from "@/api/chat.api";
import { RootState } from "@/store";
import { IMessage } from "@/types/chat.types";
import { Avatar, Center, Group, Loader, Stack, Text } from "@mantine/core"
import { useCallback, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from "react-redux";


type Props = {
    chatId: string;
}

const chatApi = new ChatApi();
export function MessagesListComponent({ chatId }: Props) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const authenticatedUser = useSelector((state: RootState) => state.auth.user);

    const fetchItems = useCallback(async () => {
        console.log("Calling")
        if (fetching) {
            return;
        }
        const response = await chatApi.getChatMessages(chatId, page);
        setFetching(true);
        setHasMore(true);
        setMessages([...messages, ...response.data]);
        setPage(page + 1);
        setHasMore(response.data.length > 0);
        setFetching(false);
    }, [fetching, messages, chatId, authenticatedUser]);


    console.log("Messages", messages, page);

    return <InfiniteScroll
        dataLength={messages.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={<Center>
            <Loader />
        </Center>}
        height={568}
        className="overflow-y-auto pt-32 scrollbar flex flex-col-reverse"
        inverse
        endMessage={
            <Center className="py-3">
                <Text color="gray">No messages to display.</Text>
            </Center>
        }
    >
        <Stack justify="flex-end" className="px-5 flex-col-reverse w-full">
            {messages.map(message => {
                if (message.sender === authenticatedUser?._id) {
                    return <AuthUserMessage
                        key={message._id}
                        {...message}
                    />
                } else {
                    return <Message key={message._id} {...message} />
                }
            })}
        </Stack>
    </InfiniteScroll>
}

function Message({ content, createdAt, sender }: IMessage) {
    return <div className="space-y-2">
        <div className="shadow-md py-4 px-3 bg-white  w-2/4 rounded-md">
            <Text>{content}</Text>
        </div>
        <Group>
            <Avatar size="sm" radius="xl" >{typeof sender !== 'string' ? sender.email.slice(0, 1) : "?"}</Avatar>
            <Text className="text-sm text-gray-400 font-medium">{createdAt}</Text>
            {/* <Text className="text-sm text-gray-400 font-medium">04:46am</Text> */}
        </Group>
    </div>
}

function AuthUserMessage({ content, createdAt, sender }: IMessage) {
    return <div className="space-y-2 self-end  w-2/4">
        <div className="shadow-md py-4 px-5 bg-[#CCE2D3] rounded-md">
            <Text>{content}</Text>
        </div>
        <Group position="right" spacing={"sm"} className="pr-3">
            {/* <Text className="text-sm text-gray-400 font-medium">04:46am</Text> */}
            <Text className="text-sm text-gray-400 font-medium">{createdAt}</Text>
            <Text className="text-sm text-gray-700 font-bold">You</Text>
            <Avatar size="sm" radius="xl" >{typeof sender !== 'string' ? sender.email.slice(0, 1) : "?"}</Avatar>
        </Group>
    </div>
}
