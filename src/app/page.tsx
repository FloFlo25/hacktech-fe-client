"use client";

import Image from "next/image";
import { useState } from "react";
import FormGenerator from "~/components/FormGenerator";
import UserForm, { SurveyList } from "~/components/UserForm";
import UserSelector from "~/components/UserSelector";
import { type UserType } from "~/types/user";
import SurveyCard from "~/components/SurveyCard";
import ThankYouCard from "~/components/ThankYouCard";
import { sampleQuestions, surveyJson, surveys } from "~/lib/utils";
import LoadingComponent from "~/components/LoadingComponent";
import LoadingPage from "~/components/LoadingPage";

export default function HomePage() {
	const [userType, setUserType] = useState<UserType>("hr");
	return (
		<>
			<UserSelector setUserType={setUserType} userType={userType} />
			{userType == "hr" ? (
				<FormGenerator />
			) : (
				<>
					<SurveyCard surveyData={surveyJson.survey[0]} />
				</>
			)}
		</>
	);
}

// Examples:
/*<SurveyList
  surveys={surveys}
  onSurveyClick={(id) => {
    // Handle navigation or other actions
    console.log(`Navigate to survey: ${id}`);
  }}
/>*/
// <LoadingPage />
// ThankYouCard
