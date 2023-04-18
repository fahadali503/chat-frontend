import { Center, Group, Loader, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMicrophone, IconTrashFilled, IconUpload, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { useRecorder } from "@/hooks/useAudioRecorder";
import { notifications } from "@mantine/notifications";

type Props = {
    onUploadRecording?: () => void
}

export function ChatRecordingComponent({ }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [audioUrl, setAudioUrl] = useState("");
    const { data, hasRecorder, start: startRecording, stop: stopRecording, reset, recording } = useRecorder()
    useEffect(() => {
        if (data.url.length > 0)
            setAudioUrl(data.url)
    }, [data.url])

    async function start() {
        startRecording().then(() => {
            open();
        }).catch(() => {
            notifications.show({
                title: "Microphone",
                message: "Error occured while recording. Please try again.",
                color: "red"
            })
        });
    }

    async function stop() {
        stopRecording();
    }

    async function deleteRecording() {
        reset();
        close();
    }

    function uploadRecording() {
        console.log("FINAL DATA", data)
        close();
    }


    return <>
        <Modal opened={opened} onClose={deleteRecording}>
            <Center className="mb-3">
                {recording && <Loader variant="bars" />}
            </Center>
            <Center>
                <Group>
                    <audio src={audioUrl} controls />
                    <UnstyledButton onClick={stop}>
                        <IconCheck size={30} className="text-gray-400" />
                    </UnstyledButton>
                </Group>
            </Center>
            <Group position="right" spacing={"md"} className="mt-5">
                <UnstyledButton onClick={deleteRecording}>
                    <IconTrashFilled size={30} className="text-red-400" />
                </UnstyledButton>
                <UnstyledButton onClick={uploadRecording}>
                    <IconUpload size={30} className="text-gray-400" />
                </UnstyledButton>
            </Group>
        </Modal>

        <UnstyledButton disabled={!hasRecorder} onClick={start} className="relative">
            <IconMicrophone className={`text-[#646d75] ${hasRecorder ? "cursor-pointer" : ""}`} />
        </UnstyledButton>
    </>
}