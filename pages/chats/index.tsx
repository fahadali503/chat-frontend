import { AuthLayout } from "@/components/AuthLayout";
import { ChatsPageComponent } from "@/page-components/chats-page";
import Head from "next/head";

export default function ChatPage() {
    return <AuthLayout>
        <Head>
            <title>Chats</title>
        </Head>
        <ChatsPageComponent />
    </AuthLayout>
}