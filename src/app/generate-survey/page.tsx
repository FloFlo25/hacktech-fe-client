"use client";
import { useEffect, useState } from "react";
import { generateSurvey } from "~/api/form";
import SurveyCard from "~/components/SurveyCard";
import { surveyJson } from "../../lib/utils";

const GenerateSurvey = () => {
	const [surveyJson, setSurveyJson] = useState(null);
	useEffect(() => {
		try {
			if (localStorage.getItem("extractedKeywords")) {
				const response = generateSurvey({
					keywords: localStorage.getItem("extractedKeywords"),
				});
				console.log(response);
				// setSurveyJson(response);
			}
		} catch (error) {
			console.error("Error generating survey:", error);
		}
	}, []);

	return (
		<div className="w-full p-8">
			<div className="w-fit rounded-[24px] bg-primary-secondary p-8">
				<div className="flex min-h-[800px] min-w-[917px] flex-col items-center gap-8 rounded-[12px] bg-white p-8">
					{/* <SurveyCard surveyData={surveyJson.survey[0]} /> */}
				</div>
			</div>
		</div>
	);
};

export default GenerateSurvey;
