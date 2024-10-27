import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sampleQuestions = [
	{
		type: "slider",
		questionNumber: "1",
		questionText: "Rate your interest in architecture:",
		defaultValue: 30,
		maxValue: 100,
		stepValue: 1,
	},
	{
		type: "text",
		questionNumber: "2",
		questionText: "What aspects of architecture interest you the most?",
		placeholder: "Enter your answer here...",
	},
	{
		type: "radio",
		questionNumber: "3",
		questionText: "Which architectural style do you prefer?",
		options: [
			{ value: "modern", label: "Modern" },
			{ value: "classical", label: "Classical" },
			{ value: "contemporary", label: "Contemporary" },
		],
	},
	{
		type: "checkbox",
		questionNumber: "4",
		questionText: "Select all areas you'd like to learn more about:",
		options: [
			{ value: "design", label: "Architectural Design" },
			{ value: "history", label: "Architectural History" },
			{ value: "sustainability", label: "Sustainable Architecture" },
		],
	},
];
export const surveys = [
	{
		id: "emp-sat-1",
		title: "Employee Satisfaction Survey",
	},
	{
		id: "bus-trip-1",
		title: "Business Trip Feedback",
	},
	{
		id: "train-feed-1",
		title: "Training Feedback",
	},
];
