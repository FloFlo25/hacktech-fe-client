import React from "react";
import { Textarea } from "~/components/ui/textarea";
import { Slider } from "~/components/ui/slider";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";

// Types based on the JSON structure
type Field = {
	name: string;
	label: string;
	type: "slider" | "multiple" | "text" | "checkbox";
	required: boolean;
	options?: string[] | null;
	multiline?: boolean | null;
	min?: number | null;
	max?: number | null;
};

type SurveyData = {
	title: string;
	fields: Field[];
};

// Individual Field Components
const SliderField = ({ field, index }: { field: Field; index: number }) => {
	const [value, setValue] = React.useState([field.min || 1]);

	return (
		<div className="px-2">
			<Slider
				defaultValue={value}
				min={field.min || 1}
				max={field.max || 5}
				step={1}
				onValueChange={setValue}
				className="w-full"
				aria-label={field.label}
			/>
		</div>
	);
};

const TextField = ({ field, index }: { field: Field; index: number }) => {
	if (field.multiline) {
		return (
			<Textarea
				placeholder="Enter your answer..."
				className="w-full"
				aria-label={field.label}
				required={field.required}
			/>
		);
	}

	return (
		<Input
			placeholder="Enter your answer..."
			className="w-full"
			aria-label={field.label}
			required={field.required}
		/>
	);
};

const MultipleChoiceField = ({
	field,
	index,
}: {
	field: Field;
	index: number;
}) => {
	return (
		<RadioGroup className="flex flex-col space-y-2">
			{field.options?.map((option) => (
				<div key={option} className="flex items-center space-x-2">
					<RadioGroupItem
						value={option}
						id={`q${index}-${option}`}
						required={field.required}
					/>
					<Label htmlFor={`q${index}-${option}`}>{option}</Label>
				</div>
			))}
		</RadioGroup>
	);
};

const CheckboxField = ({ field, index }: { field: Field; index: number }) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id={`q${index}-checkbox`} required={field.required} />
			<Label htmlFor={`q${index}-checkbox`}>Yes</Label>
		</div>
	);
};

// Field Card Component
const FieldCard = ({ field, index }: { field: Field; index: number }) => {
	const renderField = () => {
		switch (field.type) {
			case "slider":
				return <SliderField field={field} index={index} />;
			case "text":
				return <TextField field={field} index={index} />;
			case "multiple":
				return <MultipleChoiceField field={field} index={index} />;
			case "checkbox":
				return <CheckboxField field={field} index={index} />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full rounded-3xl bg-white p-6 shadow-lg">
			<div className="mb-6">
				<h2 className="mb-2 text-xl font-bold text-[#8B0000] sm:text-2xl">
					Question {index + 1}
				</h2>
				<p className="mb-4 text-sm text-gray-800 sm:text-base">{field.label}</p>
				{field.required && (
					<span className="mb-2 block text-sm text-red-500">* Required</span>
				)}
				{renderField()}
			</div>
		</div>
	);
};

// Main Survey Component
const SurveyCard = ({ surveyData }: { surveyData: SurveyData }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="relative min-h-[852px] w-full max-w-[600px] overflow-hidden bg-white p-4"
		>
			{/* Background pattern */}
			<div className="absolute bottom-0 right-0 h-2/3 w-full opacity-20">
				<div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-red-300 to-orange-200 blur-xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-tr from-red-400 to-red-200 blur-xl" />
			</div>

			{/* Content container */}
			<div className="relative z-10">
				<h1 className="mb-8 text-2xl font-bold text-black sm:text-3xl">
					{surveyData.title}
				</h1>

				<div className="space-y-6">
					{surveyData.fields.map((field, index) => (
						<FieldCard key={field.name} field={field} index={index} />
					))}
				</div>

				<div className="mt-8">
					<Button type="submit" className="w-full">
						Submit Survey
					</Button>
				</div>
			</div>
		</form>
	);
};

export default SurveyCard;
