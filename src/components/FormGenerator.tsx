import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const FormGenerator = () => {
	return (
		<div className="bg-primary-secondary">
			<span className="text-[64px]">AI Survey Generator</span>
			<Tabs defaultValue="text" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="text">Account</TabsTrigger>
					<TabsTrigger value="voice">Password</TabsTrigger>
					<TabsTrigger value="image">Password</TabsTrigger>
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
