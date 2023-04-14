import { EmojiPicker } from "@/components/EmojiPicker"
import { Group, Stack, TextInput, UnstyledButton } from "@mantine/core"
import { useState } from "react"
import { IconMoodSmile, IconPaperclip, IconMicrophone } from '@tabler/icons-react';
import { useClickOutside } from "@mantine/hooks";

type Props = {

}

export function ChatForm({ }: Props) {
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiRef = useClickOutside(() => setShowEmoji(false));

    return <Stack justify="center" className="absolute px-8 border w-full bottom-0 h-[85px]">
        <Group className="relative">
            {showEmoji && <EmojiPicker emojiRef={emojiRef} />}
            <UnstyledButton onClick={() => setShowEmoji(true)}>
                <IconMoodSmile className="text-[#646d75] cursor-pointer" />
            </UnstyledButton>
            <UnstyledButton>
                <IconPaperclip className="text-[#646d75] cursor-pointer" />
            </UnstyledButton>

            <form className="grow">
                <TextInput
                    placeholder="Type your message here..."
                    size="md"
                />
            </form>

            <UnstyledButton>
                <IconMicrophone className="text-[#646d75] cursor-pointer" />
            </UnstyledButton>
        </Group>
    </Stack>
}