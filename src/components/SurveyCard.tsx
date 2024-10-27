import React from "react";
import { Slider } from "~/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";

// Types for our survey items
type BaseQuestionProps = {
	questionNumber: string;
	questionText: string;
};

type SliderQuestion = BaseQuestionProps & {
	type: "slider";
	defaultValue: number;
	maxValue: number;
	stepValue: number;
};

type TextQuestion = BaseQuestionProps & {
	type: "text";
	placeholder: string;
};

type RadioQuestion = BaseQuestionProps & {
	type: "radio";
	options: Array<{ value: string; label: string }>;
};

type CheckboxQuestion = BaseQuestionProps & {
	type: "checkbox";
	options: Array<{ value: string; label: string }>;
};

type QuestionType =
	| SliderQuestion
	| TextQuestion
	| RadioQuestion
	| CheckboxQuestion;

// Individual Question Components
const SliderQuestionComponent = ({
	questionNumber,
	questionText,
	defaultValue,
	maxValue,
	stepValue,
}: SliderQuestion) => {
	const [value, setValue] = React.useState([defaultValue]);

	return (
		<div className="px-2">
			<Slider
				defaultValue={value}
				max={maxValue}
				step={stepValue}
				onValueChange={setValue}
				className="w-full"
				aria-label={`Question ${questionNumber} slider`}
			/>
		</div>
	);
};

const TextQuestionComponent = ({
	questionNumber,
	questionText,
	placeholder,
}: TextQuestion) => {
	return (
		<Input
			placeholder={placeholder}
			className="w-full"
			aria-label={`Question ${questionNumber} input`}
		/>
	);
};

const RadioQuestionComponent = ({
	questionNumber,
	questionText,
	options,
}: RadioQuestion) => {
	return (
		<RadioGroup className="flex flex-col space-y-2">
			{options.map((option) => (
				<div key={option.value} className="flex items-center space-x-2">
					<RadioGroupItem
						value={option.value}
						id={`q${questionNumber}-${option.value}`}
					/>
					<Label htmlFor={`q${questionNumber}-${option.value}`}>
						{option.label}
					</Label>
				</div>
			))}
		</RadioGroup>
	);
};

const CheckboxQuestionComponent = ({
	questionNumber,
	questionText,
	options,
}: CheckboxQuestion) => {
	return (
		<div className="flex flex-col space-y-2">
			{options.map((option) => (
				<div key={option.value} className="flex items-center space-x-2">
					<Checkbox id={`q${questionNumber}-${option.value}`} />
					<Label htmlFor={`q${questionNumber}-${option.value}`}>
						{option.label}
					</Label>
				</div>
			))}
		</div>
	);
};

// Question Card Component
const QuestionCard = ({ question }: { question: QuestionType }) => {
	const renderQuestion = () => {
		switch (question.type) {
			case "slider":
				return <SliderQuestionComponent {...question} />;
			case "text":
				return <TextQuestionComponent {...question} />;
			case "radio":
				return <RadioQuestionComponent {...question} />;
			case "checkbox":
				return <CheckboxQuestionComponent {...question} />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full rounded-3xl bg-white p-6 shadow-lg">
			<div className="mb-6">
				<h2 className="mb-2 text-xl font-bold text-[#8B0000] sm:text-2xl">
					Question {question.questionNumber}
				</h2>
				<p className="mb-4 text-sm text-gray-800 sm:text-base">
					{question.questionText}
				</p>
				{renderQuestion()}
			</div>
		</div>
	);
};

// Main Survey Component
const SurveyCard = ({
	title = "Employee Satisfaction Survey",
	questions,
}: {
	title?: string;
	questions: QuestionType[];
}) => {
	return (
		<div className="relative min-h-[852px] w-full max-w-[600px] overflow-hidden bg-white p-4">
			{/* Background pattern */}
			<div className="absolute bottom-0 right-0 h-2/3 w-full opacity-20">
				<div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-red-300 to-orange-200 blur-xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-tr from-red-400 to-red-200 blur-xl" />
			</div>

			{/* Content container */}
			<div className="relative z-10">
				<h1 className="mb-8 text-2xl font-bold text-black sm:text-3xl">
					{title}
				</h1>

				<div className="space-y-6">
					{questions.map((question) => (
						<QuestionCard key={question.questionNumber} question={question} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SurveyCard;
