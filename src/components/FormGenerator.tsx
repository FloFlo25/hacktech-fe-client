import { useState } from "react";
import { analyseImage, analyseText, analyseVoice } from "~/api/form";
import GenerateFormIcon from "./icons/GenerateFormIcon";
import ImageIcon from "./icons/ImageIcon";
import TextIcon from "./icons/TextIcon";
import VoiceIcon from "./icons/VoiceIcon";
import ImageForm from "./ImageForm";
import RecordingButton from "./RecordingButton";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const FormGenerator = () => {
	const [audioFile, setAudioFile] = useState<Blob | null>(null);
	const [imageTextPair, setImageTextPair] = useState<{
		text: string;
		image: Blob;
	}>();
	const [fileType, setFileType] = useState<string>("text");
	const [textPrompt, setTextPrompt] = useState("");

	const handleSetAudioFile = (audioBlob: Blob) => {
		setAudioFile(audioBlob);
	};

	const handleSetImageFileWithPrompt = (imageTextPair: {
		text: string;
		image: Blob;
	}) => setImageTextPair(imageTextPair);

	//TODO: Add logic for keywords
	const generateSurvey = async () => {
		if (fileType === "text") {
			const response = await analyseText(textPrompt);
			return;
		}
		if (fileType === "voice" && audioFile) {
			const response = await analyseVoice(audioFile);
			return;
		}

		if (imageTextPair) {
			const response = await analyseImage(imageTextPair);
			return;
		}
		return;
	};

	return (
		<div className="w-fit rounded-[24px] bg-primary-secondary p-8">
			<div className="flex min-h-[800px] flex-col items-center gap-8 rounded-[12px] bg-white p-8">
				<span className="text-primary-dark text-[64px] font-bold">
					Talk-a-Bot: AI-gen Surveys
				</span>
				<Tabs
					defaultValue="text"
					onValueChange={(e) => setFileType(e)}
					className="w-full"
				>
					<TabsList className="h-14 w-full bg-primary-secondary p-4">
						<TabsTrigger
							className="flex w-full justify-center gap-2 p-2 align-middle data-[state=active]:bg-primary-main"
							value="text"
						>
							<TextIcon className="w-4" />
							<span>Text</span>
						</TabsTrigger>
						<TabsTrigger
							className="flex w-full justify-center gap-2 p-2 align-middle data-[state=active]:bg-primary-main"
							value="voice"
						>
							<VoiceIcon className="w-4" />
							<span>Voice</span>
						</TabsTrigger>
						<TabsTrigger
							className="flex w-full justify-center gap-2 p-2 align-middle data-[state=active]:bg-primary-main"
							value="image"
						>
							<ImageIcon className="w-4" />
							<span>Image</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="text">
						<div className="grid w-full gap-1.5">
							<span className="text-bold">
								Text for generating AI-enhanced surveys
							</span>
							<Textarea
								rows={12}
								value={textPrompt}
								onChange={(e) => setTextPrompt(e.currentTarget.value)}
								placeholder="Type your prompt here."
								className="resize-none"
								id="prompt"
							/>
						</div>
					</TabsContent>
					<TabsContent value="voice">
						<RecordingButton handleSetAudioFile={handleSetAudioFile} />
					</TabsContent>
					<TabsContent value="image">
						<ImageForm
							handleSetImageFileWithPrompt={handleSetImageFileWithPrompt}
						/>
					</TabsContent>
				</Tabs>
				<Button className="w-fit" onClick={generateSurvey}>
					<GenerateFormIcon className="!h-[20px] !w-[20px]" />
					<span>Generate</span>
				</Button>
			</div>
		</div>
	);
};

export default FormGenerator;
