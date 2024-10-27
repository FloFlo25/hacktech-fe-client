"use client";
import { useEffect } from "react";
import { generateSurvey } from "~/api/form";

const GenerateSurvey = () => {
	useEffect(() => {
		try {
			if (localStorage.getItem("extractedKeywords"))
				console.log(
					generateSurvey({
						keywords: JSON.parse(localStorage.getItem("extractedKeywords")),
					}),
				);
		} catch (error) {
			console.error("Error generating survey:", error);
		}
	}, []);

	return (
		<div className="w-full p-8">
			<div className="w-fit rounded-[24px] bg-primary-secondary p-8">
				<div className="flex min-h-[800px] min-w-[917px] flex-col items-center gap-8 rounded-[12px] bg-white p-8"></div>
			</div>
		</div>
	);
};

export default GenerateSurvey;
