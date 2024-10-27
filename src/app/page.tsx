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
		<main
			style={{
				backgroundImage: `url("/Waves.png")`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPositionX: "-65px",
				backgroundAttachment: "fixed",
			}}
			className="flex min-h-screen flex-col items-center justify-center bg-primary-main"
		>
			{/* <Image alt="waves" src="/Waves.png" width={100} height={100}/> */}

			<UserSelector setUserType={setUserType} userType={userType} />
			{userType == "hr" ? <FormGenerator /> : <><UserForm /></>}
		</main>
	);
}
