import { Grid } from "@mantine/core";
import { ChatListComponent } from "./chat-list/ChatList";
import { SelectedChat } from "./chat";

export function ChatsPageComponent() {
    return <Grid className="h-full p-0 m-0">
        {/* Display Chat List */}
        <Grid.Col span={3}>
            <ChatListComponent />
        </Grid.Col>
        {/* END Display Chat List */}

        {/* Display selected chat */}
        <Grid.Col span={9} className="p-0">
            <SelectedChat />
        </Grid.Col>
        {/* END Display selected chat */}
    </Grid>

}