import Image from "next/image";
import React from "react";

const LoadingComponent = () => {
	return (
		<>
			<Image
				alt="loader"
				src="/loadingGif.gif"
				height={800}
				width={900}
				className="h-[736px] w-[800px]"
			/>
		</>
	);
};

export default LoadingComponent;
