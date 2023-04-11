import { AuthLayout } from "@/components/AuthLayout";
import { RootState } from "@/store";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function ChatPage() {
    const authState = useSelector((state: RootState) => state.auth);
    return <AuthLayout>
        <Head>
            <title>Chat</title>
        </Head>
        <div>
            Chat Page
        </div>
    </AuthLayout>
}