import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

const ImageForm = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Convert image file to a URL
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const handleImageClear = () => setSelectedImage(null);

	const openFileInput = () => {
		document.getElementById("fileInput")?.click();
	};

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{selectedImage ? (
				<div className="relative">
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
