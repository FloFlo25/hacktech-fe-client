import LoadingComponent from "~/components/LoadingComponent";

const LoadingPage = () => {
	return (
		<div className="w-fit max-w-[600px] rounded-[24px] bg-primary-secondary p-4">
			<div className="flex min-w-96 flex-col items-center justify-center gap-8 rounded-[12px] bg-white p-4">
				<div>
					<LoadingComponent />
				</div>
			</div>
		</div>
	);
};

export default LoadingPage;
