import React from "react";
import { Slider } from "~/components/ui/slider";

const SurveyCard = ({
	title = "Employee Satisfaction Survey",
	questionNumber = "1",
	questionText = "Slide to express your interest in architecture:",
	defaultSliderValue = 30,
	maxValue = 100,
	stepValue = 1,
}) => {
	const [sliderValue, setSliderValue] = React.useState([defaultSliderValue]);

	const handleSliderChange = (value) => {
		setSliderValue(value);
	};

	return (
		// Main container with responsive width
		<div className="relative min-h-[852px] w-full max-w-[600px] overflow-hidden bg-white p-4">
			{/* Background pattern placeholder */}
			<div className="absolute bottom-0 right-0 h-2/3 w-full opacity-20">
				<div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-red-300 to-orange-200 blur-xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-tr from-red-400 to-red-200 blur-xl" />
			</div>

			{/* Content container */}
			<div className="relative z-10">
				{/* Title */}
				<h1 className="mb-8 text-2xl font-bold text-black sm:text-3xl">
					{title}
				</h1>

				{/* Survey Card */}
				<div className="w-full rounded-3xl bg-white p-6 shadow-lg">
					{/* Question */}
					<div className="mb-6">
						<h2 className="mb-2 text-xl font-bold text-[#8B0000] sm:text-2xl">
							Question {questionNumber}
						</h2>
						<p className="mb-4 text-sm text-gray-800 sm:text-base">
							{questionText}
						</p>

						{/* Slider */}
						<div className="px-2">
							<Slider
								defaultValue={sliderValue}
								max={maxValue}
								step={stepValue}
								onValueChange={handleSliderChange}
								className="w-full"
								aria-label={`Question ${questionNumber} slider`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SurveyCard;
