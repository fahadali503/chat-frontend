import { Avatar, Center, Group, Loader, ScrollArea, Stack, Text } from "@mantine/core"
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


type Props = {

}


export function MessagesListComponent({ }: Props) {
    const [messages, setMessages] = useState(() => {
        return Array.from({ length: 10 }).map((_item, index) => {
            return index % 2 === 0 ? <AuthUserMessage time={index} /> : <Message time={index} />
        })
    });
    const [hasMore, setHasMore] = useState(true);
    const [fetching, setFetching] = useState(false);
    const fetchItems = useCallback(() => {
        console.log("Calling")
        if (fetching) {
            return;
        }
        if (messages.length >= 30) {
            setHasMore(false);
            return;
        }
        setFetching(true);
        const msg = Math.random() < 0.5 ? <AuthUserMessage time={messages.length} /> : <Message time={messages.length} />;
        setMessages([...messages, msg]);
        setFetching(false);
    }, [fetching, messages]);




    return <InfiniteScroll
        dataLength={messages.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={
            <Center>
                <Loader />
            </Center>
        }
        height={568}
        className="overflow-y-auto pt-32 scrollbar flex flex-col-reverse"
        inverse
        endMessage={
            <Center className="py-3">
                <Text color="gray">No more messages to display.</Text>
            </Center>
        }
    >
        <Stack justify="flex-end" className="px-5 flex-col-reverse w-full">
            {messages}
        </Stack>
    </InfiniteScroll>
}

function Message({ time }: { time: number }) {
    return <div className="space-y-2">
        <div className="shadow-md py-4 px-3 bg-white  w-2/4 rounded-md">
            <Text>Simple Message</Text>
        </div>
        <Group>
            <Avatar size="sm" radius="xl" >AA</Avatar>
            <Text className="text-sm text-gray-400 font-medium">{time}am</Text>
            {/* <Text className="text-sm text-gray-400 font-medium">04:46am</Text> */}
        </Group>
    </div>
}

function AuthUserMessage({ time }: { time: number }) {
    return <div className="space-y-2 self-end  w-2/4">
        <div className="shadow-md py-4 px-5 bg-[#CCE2D3] rounded-md">
            <Text>AuthUserMessage</Text>
        </div>
        <Group position="right" spacing={"sm"} className="pr-3">
            {/* <Text className="text-sm text-gray-400 font-medium">04:46am</Text> */}
            <Text className="text-sm text-gray-400 font-medium">{time}am</Text>
            <Text className="text-sm text-gray-700 font-bold">You</Text>
            <Avatar size="sm" radius="xl" >AA</Avatar>
        </Group>
    </div>
}
