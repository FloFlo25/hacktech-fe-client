import React from "react";
import { ChevronRight } from "lucide-react";

// Type definition for survey data
type Survey = {
	id: string;
	title: string;
};

// Type for the component props
type SurveyListProps = {
	surveys: Survey[];
	onSurveyClick?: (id: string) => void;
};

const SurveyList = ({ surveys, onSurveyClick }: SurveyListProps) => {
	const handleClick = (id: string) => {
		if (onSurveyClick) {
			onSurveyClick(id);
		}
	};

	return (
		<div className="relative min-h-[852px] w-full max-w-[600px] overflow-hidden bg-white">
			{/* Main container with rounded corners */}
			<div className="relative h-full w-full rounded-3xl bg-gradient-to-b from-red-200/40 to-red-100/40 p-6">
				{/* Title */}
				<h1 className="mb-6 text-2xl font-bold text-black sm:text-3xl">
					Surveys
				</h1>

				{/* Survey list */}
				<div className="space-y-4">
					{surveys.map((survey) => (
						<button
							key={survey.id}
							onClick={() => handleClick(survey.id)}
							className="group relative w-full rounded-2xl bg-red-200/50 p-4 text-left transition-all hover:bg-red-200/70 focus:outline-none focus:ring-2 focus:ring-red-300"
							tabIndex={0}
							aria-label={`Open ${survey.title}`}
						>
							<div className="flex items-center justify-between">
								<span className="text-lg font-medium text-gray-800">
									{survey.title}
								</span>
								<ChevronRight className="h-6 w-6 text-gray-600 transition-transform group-hover:translate-x-1" />
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

// Usage example with sample data
const SampleSurveyList = () => {
	// Sample data - this would typically come from an API/backend
	const sampleSurveys: Survey[] = [
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

	const handleSurveyClick = (id: string) => {
		console.log(`Survey clicked: ${id}`);
		// Handle navigation or other actions
	};

	return (
		<SurveyList surveys={sampleSurveys} onSurveyClick={handleSurveyClick} />
	);
};

export default SampleSurveyList;
export { SurveyList };
