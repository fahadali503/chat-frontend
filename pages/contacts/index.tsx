import { AuthLayout } from "@/components/AuthLayout";
import { ContactsPageComponent } from "@/page-components/contacts-page";
import Head from "next/head";

export default function ContactsPage() {

    return <AuthLayout>
        <Head>
            <title>Chats</title>
        </Head>
        <ContactsPageComponent />
    </AuthLayout>
}