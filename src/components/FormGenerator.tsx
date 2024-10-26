import GenerateFormIcon from "./icons/GenerateFormIcon";
import ImageIcon from "./icons/ImageIcon";
import TextIcon from "./icons/TextIcon";
import VoiceIcon from "./icons/VoiceIcon";
import RecordingButton from "./RecordingButton";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const FormGenerator = () => {
	return (
		<div className="w-fit rounded-[24px] bg-primary-secondary p-8">
			<div className="flex flex-col items-center gap-8 rounded-[12px] bg-white p-8">
				<span className="text-[64px] font-bold text-primary-dark">
					Talk-a-Bot: AI-gen Surveys
				</span>
				<Tabs defaultValue="text" className="w-full">
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
								placeholder="Type your prompt here."
								className="resize-none"
								id="prompt"
							/>
						</div>
					</TabsContent>
					<TabsContent value="voice">
						<RecordingButton recording />
					</TabsContent>
					<TabsContent value="image">image here</TabsContent>
				</Tabs>
				<Button className="w-fit">
					<GenerateFormIcon className="!h-[20px] !w-[20px]" />
					<span>Generate</span>
				</Button>
			</div>
		</div>
	);
};

export default FormGenerator;
