import axios from "axios";
import { API_PATHS } from "./API_PATH";

export const analyseVoice = async (audioBlob: Blob) => {
	try {
		const formData = new FormData();
		formData.append("file", audioBlob, "recording.wav"); // Key name should match the server expectation

		// Send the FormData with `multipart/form-data` headers
		await axios.post(API_PATHS.voice, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log("Audio file sent successfully!");
	} catch (error) {
		console.error("Failed to send audio file:", error);
		throw error; // Optional: re-throw to handle errors in the calling code
	}
};

export const analyseText = async (text: string) => {
	try {
		await axios.post(API_PATHS.text, { text: text });

		console.log("Text sent successfully!");
	} catch (error) {
		console.error("Failed to send text prompt:", error);
		throw error; // Optional: re-throw to handle errors in the calling code
	}
};
export const analyseImage = async (imageBlob: Blob, inputData: string) => {
	try {
		const formData = new FormData();
		formData.append("input_data", inputData); // Adding the input data string
		formData.append("file", imageBlob, "image.jpg"); // Adding the image file as binary

		// Send the FormData with `multipart/form-data` headers
		await axios.post("YOUR_ANALYSE_IMAGE_ENDPOINT", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log("Image analysis request sent successfully!");
	} catch (error) {
		console.error("Failed to send image analysis request:", error);
		throw error; // Optional: re-throw to handle errors in the calling code
	}
};
