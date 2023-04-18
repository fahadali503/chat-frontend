import { EmojiPicker } from "@/components/EmojiPicker"
import { Group, Stack, TextInput, UnstyledButton } from "@mantine/core"
import { FormEvent, useRef, useState } from "react"
import { IconMoodSmile } from '@tabler/icons-react';
import { useClickOutside } from "@mantine/hooks";
import { EmojiClickData } from "emoji-picker-react";
import { ChatFileUploadComponent } from "./ChatFileUpload";
import { ChatRecordingComponent } from "./ChatRecording";

type Props = {

}

export function ChatForm({ }: Props) {
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiRef = useClickOutside(() => setShowEmoji(false));
    const [message, setMessage] = useState("");
    const messageRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("MESSAGE", message)

    }

    function onEmojiPicker(emoji: EmojiClickData, _event: MouseEvent) {
        if (messageRef.current) {
            console.log(emoji.unified);
            const { selectionStart, selectionEnd } = messageRef.current;
            const newValue = message.slice(0, selectionStart!) + emoji.emoji + message.slice(selectionEnd!);
            setMessage(newValue);
        }
    }

    function uploadFilesHandler(files: File[]) {
        console.log("GOT IMAGES", files)
    }


    return <Stack justify="center" className="absolute px-8 border w-full bottom-0 h-[85px]">
        <Group className="relative">
            {/* Emoji */}
            {showEmoji && <EmojiPicker onEmojiPicker={onEmojiPicker} emojiRef={emojiRef} />}
            <UnstyledButton onClick={() => setShowEmoji(true)}>
                <IconMoodSmile className="text-[#646d75] cursor-pointer" />
            </UnstyledButton>


            {/* File Input */}
            <ChatFileUploadComponent uploadFilesHandler={uploadFilesHandler} />

            {/* Text Input */}
            <form className="grow" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Type your message here..."
                    size="md"
                    ref={messageRef}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </form>

            {/* Recording */}
            <ChatRecordingComponent />
        </Group>
    </Stack>
}