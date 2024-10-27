"use client";

import Image from "next/image";
import { useState } from "react";
import FormGenerator from "~/components/FormGenerator";
import UserForm from "~/components/UserForm";
import UserSelector from "~/components/UserSelector";
import { type UserType } from "~/types/user";

export default function HomePage() {
	const [userType, setUserType] = useState<UserType>("hr");
	return (
		<>
			<UserSelector setUserType={setUserType} userType={userType} />
			{userType == "hr" ? (
				<FormGenerator />
			) : (
				<>
					<UserForm />
				</>
			)}
		</>
	);
}
