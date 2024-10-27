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
import LoadingComponent from "./LoadingComponent";
import { useRouter } from "next/navigation";

const FormGenerator = () => {
	const [audioFile, setAudioFile] = useState<Blob | null>(null);
	const [imageTextPair, setImageTextPair] = useState<{
		text: string;
		image: Blob;
	}>();
	const [fileType, setFileType] = useState<string>("text");
	const [textPrompt, setTextPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSetAudioFile = (audioBlob: Blob) => {
		setAudioFile(audioBlob);
	};

	const handleSetImageFileWithPrompt = (imageTextPair: {
		text: string;
		image: Blob;
	}) => setImageTextPair(imageTextPair);

	//TODO: Add logic for keywords
	const generateSurvey = async () => {
		setIsLoading(true);
		try {
			let response;
			if (fileType === "text") {
				response = await analyseText(textPrompt);
				console.log(response);
			} else if (fileType === "voice" && audioFile) {
				response = await analyseVoice(audioFile);
				console.log(response);
			} else if (imageTextPair) {
				response = await analyseImage(imageTextPair);
				console.log(response);
			}
			if (response)
				localStorage.setItem(
					"extractedKeywords",
					JSON.stringify(response.data.extractedKeywords),
				);
		} catch (error) {
			console.error("Error generating survey:", error);
		} finally {
			setIsLoading(false);
			router.push("generate-survey"); // Set loading to false when the request completes
		}
	};

	return (
		<div className="w-fit rounded-[24px] bg-primary-secondary p-8">
			<div className="flex min-h-[800px] min-w-[917px] flex-col items-center gap-8 rounded-[12px] bg-white p-8">
				{isLoading ? (
					<>
						<LoadingComponent />
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	);
};

export default FormGenerator;
