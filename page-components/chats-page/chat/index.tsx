import { Stack, Title } from "@mantine/core"
import { ChatHeaderComponent } from "./ChatHeader"
import { MessagesListComponent } from "./MessagesList"
import { ChatForm } from "./ChatForm"
import { IUser } from "@/types/user.types"
import { ISocket } from "@/types/chat.types"

type Props = {
    selectedChatId: string;
    friend: IUser | null;
    socket: ISocket;
}
export function SelectedChat({ selectedChatId, friend, socket }: Props) {
    if (!selectedChatId) {
        return <div style={{ backgroundImage: "url(/chat-window-bg.png)", backgroundColor: "#f2f2f2" }} className="h-full relative">
            <WelcomeScreen />
        </div>
    }

    return <div style={{ backgroundImage: "url(/chat-window-bg.png)", backgroundColor: "#f2f2f2" }} className="h-full relative">
        {/* Chat Header */}
        <ChatHeaderComponent friend={friend!} />

        {/* Messages */}
        <MessagesListComponent chatId={selectedChatId} socket={socket} />

        {/* Chat Form */}
        <ChatForm selectedChatId={selectedChatId} socket={socket} />
    </div>
}

function WelcomeScreen() {
    return <Stack align="center" className="h-full" justify="center">
        <Title color="#495057" className="tracking-wide font-medium">Welcome to Chat App</Title>
        <Title order={5} color="#495057" className="tracking-wide font-normal">An interactive chat application for seamless communication with friends, family, and colleagues</Title>
    </Stack>

}