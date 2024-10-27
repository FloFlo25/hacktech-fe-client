import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { type ImageTextPair } from "~/types/requests";
import { Input } from "./ui/input";

type Props = {
	handleSetImageFileWithPrompt: (imageTextPair: ImageTextPair) => void;
};

const ImageForm = ({ handleSetImageFileWithPrompt }: Props) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [textBlobPair, setTextBlobPair] = useState<ImageTextPair>();

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Convert image file to a URL
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
			setTextBlobPair({ image: file, text: "" });
			handleSetImageFileWithPrompt({ image: file, text: "" });
		}
	};

	const handleTextPromptEnter = (text: string) => {
		if (textBlobPair?.image) {
			setTextBlobPair((prevState) => ({
				image: prevState!.image,
				text: text,
			}));

			handleSetImageFileWithPrompt({ image: textBlobPair.image, text: text });
		}
	};

	const handleImageClear = () => setSelectedImage(null);

	const openFileInput = () => {
		document.getElementById("fileInput")?.click();
	};

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{selectedImage ? (
				<div className="flex w-full flex-col items-center justify-center gap-2">
					<div className="relative w-fit">
						<Image
							src={selectedImage}
							alt="Uploaded"
							className="h-48 w-48 rounded-lg object-cover shadow-md"
							width={250}
							height={150}
						/>
						<Button
							className="absolute right-0 top-0 rounded-full"
							variant="destructive"
							size="icon"
							onClickCapture={handleImageClear}
						>
							X
						</Button>
					</div>
					<Input
						type="text"
						className="w-full"
						value={textBlobPair?.text}
						onChange={(e) => handleTextPromptEnter(e.currentTarget.value)}
						placeholder="(Optional) Enter an additional prompt..."
					/>
				</div>
			) : (
				<button
					onClick={openFileInput}
					className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
				>
					Upload Image
				</button>
			)}
			<input
				type="file"
				id="fileInput"
				accept="image/*"
				onChange={handleImageUpload}
				className="hidden"
			/>
		</div>
	);
};

export default ImageForm;
