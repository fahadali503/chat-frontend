import { Button, Grid, Group, Image, Modal, ScrollArea, UnstyledButton } from "@mantine/core"
import { ChangeEvent, useRef, useState } from "react";
import { IconPaperclip, IconX } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";

type Props = {
    uploadFilesHandler: (files: File[]) => void;
}
export function ChatFileUploadComponent({ uploadFilesHandler }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<File[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    function onFileInputClick() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        const elements = [];
        if (files && files.length > 0) {
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                elements.push(file);
            }
            setMedia(elements);
            open();
        }
    }

    function handleRemove(index: number) {
        const newMedia = media.filter((_image, i) => i !== index);
        setMedia(newMedia);
    }
    console.log("FILES", media.length);
    function onModalClose() {
        close();
        setMedia([]);
    }

    function uploadFiles() {
        uploadFilesHandler(media);
    }

    return <>
        {/* Preview Images */}
        <Modal centered size="calc(100vw - 3rem)" opened={opened} onClose={onModalClose} withCloseButton
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <div className="px-8">
                <Grid gutter={"md"} grow>
                    {media.map((image, i) => {
                        const url = URL.createObjectURL(image);
                        return <Grid.Col key={i} span={4} className="mx-2 relative">
                            <Image radius={"lg"} height={300} fit="fill" src={url} alt="" className="relative">
                            </Image>
                            <IconX
                                size={30}
                                onClick={() => handleRemove(i)} className="absolute cursor-pointer top-2 right-4 z-40" color="#646d75" />
                        </Grid.Col>
                    })}
                </Grid>
                <Group position="right" className="pr-3 py-6">
                    <Button onClick={uploadFiles} variant="outline" color="indigo" size="md">
                        Upload
                    </Button>
                </Group>
            </div>
        </Modal>
        <UnstyledButton onClick={onFileInputClick}>
            <IconPaperclip className="text-[#646d75] cursor-pointer" />
            <input ref={fileInputRef} onChange={onFileChange} multiple accept="image/*" type="file" className="hidden" />
        </UnstyledButton>
    </>
}