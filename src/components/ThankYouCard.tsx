import React from "react";
import { Sparkles } from "lucide-react";

const ThankYouCard = ({
	title = "THANK YOU FOR USING",
	productName = "Talk-a-Bot:",
	subProduct = "AI-gen Surveys",
	tagline = "Let's generate together!",
}) => {
	return (
		<div className="justify-centerp-4 flex min-h-[600px] w-full max-w-[600px] items-center">
			{/* Card Container */}
			<div className="relative w-full overflow-hidden rounded-3xl bg-white p-8 shadow-lg">
				{/* Sparkles decoration */}
				<div className="absolute right-4 top-4 flex gap-2">
					{[...Array(3)].map((_, i) => (
						<Sparkles
							key={i}
							className={`h-6 w-6 rotate-45 transform ${
								i === 0
									? "text-gray-300"
									: i === 1
										? "text-rose-300"
										: "text-rose-900"
							}`}
						/>
					))}
				</div>

				{/* Content Container */}
				<div className="flex flex-col items-center gap-8 space-y-6 pt-12 text-center">
					{/* Main Title */}
					<h1 className="text-3xl font-bold tracking-wide text-rose-900">
						{title}
					</h1>

					{/* Product Name */}
					<div className="space-y-2">
						<h2 className="text-3xl font-bold text-rose-900">{productName}</h2>
						<h3 className="text-3xl font-bold text-rose-900">{subProduct}</h3>
					</div>

					{/* Tagline */}
					<p className="mt-8 text-3xl font-medium text-rose-200">{tagline}</p>
				</div>

				{/* Background Pattern */}
				<div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full opacity-20">
					<div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-rose-300 to-orange-200 blur-xl" />
					<div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-tr from-rose-400 to-rose-200 blur-xl" />
				</div>
			</div>
		</div>
	);
};

export default ThankYouCard;
