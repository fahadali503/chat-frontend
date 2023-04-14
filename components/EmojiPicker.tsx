import dynamic from 'next/dynamic';
import { MutableRefObject } from 'react';

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    { ssr: false }
);

type Props = {
    emojiRef: MutableRefObject<any>
}
export function EmojiPicker({ emojiRef }: Props) {

    return <div ref={emojiRef} className='absolute w-full bottom-6'>
        <Picker width={"100%"} />
    </div>
}