import { useRef, useState } from "react";
import { Button } from "./ui/button";
import RecordIcon from "./icons/RecordIcon";
import StopRecordIcon from "./icons/StopRecordIcon";

type Props = { handleSetAudioFile: (audioBlob: Blob) => void };

const RecordingButton = ({ handleSetAudioFile }: Props) => {
	const [isRecording, setIsRecording] = useState(false);
	const [audioURL, setAudioURL] = useState("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);

			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunks.current.push(event.data);
			};

			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
				setAudioURL(URL.createObjectURL(audioBlob));
				audioChunks.current = []; // Clear audio chunks for the next recording
			};

			mediaRecorderRef.current.start();
			setIsRecording(true);
		} catch (error) {
			console.error("Error accessing microphone:", error);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
		setIsRecording(false);
	};

	console.log(audioURL);

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 p-4">
			{isRecording && "Recording..."}
			<div
				className={`flex items-center justify-center ${isRecording ? "animate-pulse" : ""}`}
			>
				<Button
					onClick={isRecording ? stopRecording : startRecording}
					className={`${
						isRecording
							? "bg-red-500 hover:bg-red-600"
							: "bg-green-500 hover:bg-green-600"
					} h-[100px] w-[100px] rounded-full font-semibold text-white transition duration-300`}
				>
					{isRecording ? (
						<StopRecordIcon className="!h-14 !w-14" />
					) : (
						<RecordIcon className="!h-14 !w-14" />
					)}
				</Button>
			</div>
			<span className="text-[24px] font-bold">
				{isRecording ? "STOP" : "START"}
			</span>

			{audioURL && (
				<audio
					controls
					src={audioURL}
					className="mt-4 w-full max-w-md rounded-lg shadow-md"
				/>
			)}
		</div>
	);
};

export default RecordingButton;
