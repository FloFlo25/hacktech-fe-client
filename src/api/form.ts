import axios from "axios";
import { API_PATHS } from "./API_PATH";
import { type ImageTextPair } from "~/types/requests";

export const analyseVoice = async (audioFile: Blob) => {
	try {
		const formData = new FormData();
		formData.append("audio_file", audioFile); // Ensure the key matches the backend expectation

		const response = await axios.post(API_PATHS.voice, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json",
			},
		});
	} catch (error) {
		console.error("Failed to analyze voice:", error);
		throw error;
	}
};

export const analyseText = async (text: string) => {
	try {
		await axios.post(API_PATHS.text, { text: text });
	} catch (error) {
		console.error("Failed to send text prompt:", error);
		throw error; // Optional: re-throw to handle errors in the calling code
	}
};

export const analyseImage = async ({ text, image }: ImageTextPair) => {
	try {
		const formData = new FormData();
		formData.append("input_data", text); // Adding the input data string
		formData.append("file", image, "image.jpg"); // Adding the image file as binary
		// Send the FormData with `multipart/form-data` headers
		await axios.post(API_PATHS.image, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	} catch (error) {
		console.error("Failed to send image analysis request:", error);
		throw error; // Optional: re-throw to handle errors in the calling code
	}
};
