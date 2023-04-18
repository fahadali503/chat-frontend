import { useEffect, useRef, useState } from 'react';
type Action = () => void;

export type AudioData = {
    blob: Blob;
    url: string;
    chunks: Blob[];
};

export type RecorderProps = {
    stop: Action;
    start: Action;
    pause: Action;
    reset: Action;
    resume: Action;
    data: AudioData;
    paused: boolean;
    recording: boolean;
    hasRecorder: boolean;
};
export type State = {
    seconds: number;
    audioBlob: Blob;
    paused: boolean;
    recording: boolean;
    audioData: AudioData;
    medianotFound: boolean;
};


const emptyBlob = new Blob() || '';

const initState: State = {
    seconds: 0,
    recording: false,
    paused: false,
    medianotFound: false,
    audioBlob: emptyBlob,
    audioData: {
        url: '',
        chunks: [],
        blob: emptyBlob,
    },
};

let timer!: any;

let chunks: Blob[] = [];

let mediaRecorder!: MediaRecorder;

type Props = {
    mimeTypeToUseWhenRecording?: string;
};

export function useRecorder(props?: Props) {
    const [, sF] = useState({});
    const dataRef = useRef({ ...initState });
    const { paused, recording, medianotFound, audioData, } = dataRef.current;
    const updatState = () => sF({});
    const [stream, setStream] = useState<MediaStream | null>();
    useEffect(() => {
        if (typeof window !== "undefined") {
            setStream(new MediaStream());
        }
    }, [])
    const initRecorder = async () => {
        // @ts-ignore
        navigator.getUserMedia =
            // @ts-ignore
            navigator.getUserMedia ||
            // @ts-ignore
            navigator.msGetUserMedia ||
            // @ts-ignore
            navigator.mozGetUserMedia ||
            // @ts-ignore
            navigator.webkitGetUserMedia;

        if (navigator.mediaDevices) {
            const _stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(_stream)
            if (props) {
                const { mimeTypeToUseWhenRecording = '' } = props;
                mediaRecorder = new MediaRecorder(_stream, {
                    mimeType: mimeTypeToUseWhenRecording,
                });
            } else {
                mediaRecorder = new MediaRecorder(_stream);
            }
            chunks = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunks.push(e.data);
                }
            };
            return true;
        } else {
            dataRef.current = {
                ...dataRef.current,
                medianotFound: true,
            };
            updatState();
            return false;
        }
    };

    const handleAudioPause = () => {
        if (!paused) {
            clearInterval(timer);
            mediaRecorder.pause();
            dataRef.current = {
                ...dataRef.current,
                paused: true,
            };
            updatState();
        }
    };

    const handleAudioStart = () => {
        if (paused) {
            startTimer();
            mediaRecorder.resume();
            dataRef.current = {
                ...dataRef.current,
                paused: false,
            };
            updatState();
        }
    };

    const countDown = () => {
        let seconds = dataRef.current.seconds + 1;
        dataRef.current = {
            ...dataRef.current,
            seconds,
        };
        updatState();
    };

    const startTimer = () => {
        timer = setInterval(countDown, 1000);
    };

    const startRecording = async () => {
        if (!recording) {
            const isReady = await initRecorder();
            if (isReady) {
                chunks = [];
                mediaRecorder.start(10);
                startTimer();
                dataRef.current = {
                    ...dataRef.current,
                    recording: true,
                };
                updatState();
            }
        }
    };

    const stopRecording = () => {
        if (recording) {
            clearInterval(timer);
            mediaRecorder.stop();
            dataRef.current = {
                ...dataRef.current,
                paused: false,
                recording: false,
                seconds: 0,
            };
            saveAudio();
            stream?.getTracks().forEach(function (track) {
                if (track.readyState === 'live') {
                    track.stop();
                }
            });
            updatState();
        }
    };

    const handleReset = () => {
        if (dataRef.current.recording) {
            stopRecording();
        }
        dataRef.current = {
            ...dataRef.current,
            seconds: 0,
            recording: false,
            medianotFound: false,
            audioBlob: emptyBlob,
            audioData: initState.audioData,
        };
        updatState();
    };

    const saveAudio = () => {
        // convert saved chunks to blob
        const blob = new Blob(chunks, { type: 'audio/*' });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        dataRef.current = {
            ...dataRef.current,
            audioBlob: blob,
            audioData: {
                blob: blob,
                url: audioURL,
                chunks: chunks,
            },
        };
        updatState();
    };

    return {
        paused,
        recording,
        data: audioData,
        reset: handleReset,
        stop: stopRecording,
        start: startRecording,
        pause: handleAudioPause,
        resume: handleAudioStart,
        hasRecorder: !medianotFound,
    };
}