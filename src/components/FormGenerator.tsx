import TextIcon from "./icons/TextIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const FormGenerator = () => {
	return (
		<div className="bg-primary-secondary">
			<span className="text-[64px]">AI Survey Generator</span>
			<Tabs defaultValue="text" className="w-[400px]">
				<TabsList>
					<TabsTrigger className="flex gap-2" value="text">
						<TextIcon className="w-4"/>
						<span>Text</span>
					</TabsTrigger>
					<TabsTrigger value="voice">Voice</TabsTrigger>
					<TabsTrigger value="image">Image</TabsTrigger>
				</TabsList>
				<TabsContent value="text">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="voice">Change your password here.</TabsContent>
				<TabsContent value="image">Change your password here.</TabsContent>
			</Tabs>
		</div>
	);
};

export default FormGenerator;
