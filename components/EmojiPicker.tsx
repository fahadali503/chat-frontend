import { EmojiClickData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { MutableRefObject } from 'react';

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    { ssr: false }
);

type Props = {
    emojiRef: MutableRefObject<any>,
    onEmojiPicker: (emoji: EmojiClickData, event: MouseEvent) => void
}
export function EmojiPicker({ emojiRef, onEmojiPicker }: Props) {

    return <div ref={emojiRef} className='absolute w-full bottom-6'>
        <Picker onEmojiClick={onEmojiPicker} width={"100%"} />
    </div>
}