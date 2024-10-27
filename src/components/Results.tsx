"use client";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const Results = () => {
	const [surveyHtml, setSurveyHtml] = useState(`
                  `);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Helper function to clean and format HTML
	const formatHtml = (html: string) => {
		// Remove any escaped HTML entities
		let cleanHtml = html
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&amp;/g, "&")
			.replace(/\\n/g, "\n")
			.replace(/\\"/g, '"');

		// Sanitize the HTML using DOMPurify
		cleanHtml = DOMPurify.sanitize(cleanHtml, {
			USE_PROFILES: { html: true },
			ADD_TAGS: ["canvas"], // Allow canvas elements for charts
			ADD_ATTR: ["class", "id", "style"], // Allow these attributes
		});

		return cleanHtml;
	};

	useEffect(() => {
		const fetchAnthropicStream = async () => {
			setLoading(true);
			setError("");

			try {
				const response = await fetch(
					"https://magnetic-wombat-centrally.ngrok-free.app/api/get_analytics",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							survey_type: "results",
						}),
					},
				);

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(`API error: ${response.status} - ${errorText}`);
				}

				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error("No readable stream available");
				}

				const decoder = new TextDecoder();
				let buffer = "";
				let currentHtml = "";

				while (true) {
					const { done, value } = await reader.read();

					if (done) {
						break;
					}

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() || "";

					for (const line of lines) {
						const trimmedLine = line.trim();
						if (!trimmedLine || trimmedLine === "data: [DONE]") continue;

						if (trimmedLine.startsWith("data: ")) {
							try {
								const jsonData = trimmedLine.slice(6); // Remove 'data: ' prefix
								const json = JSON.parse(jsonData);

								if (
									json.type === "content_block_delta" &&
									json.delta?.type === "text_delta"
								) {
									currentHtml += json.delta.text;
									// Format and sanitize HTML before setting state
									const formattedHtml = formatHtml(currentHtml);
									setSurveyHtml(formattedHtml);
								}
							} catch (e) {
								console.error("Error parsing SSE data:", e, trimmedLine);
							}
						}
					}
				}
			} catch (error: any) {
				console.error("Error fetching from API:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchAnthropicStream();
	}, []);

	return (
		<div className="App">
			{loading && <div className="alert alert-info">Loading content...</div>}
			{error && (
				<div className="alert alert-danger" role="alert">
					Error: {error}
				</div>
			)}
			<div
				dangerouslySetInnerHTML={{ __html: surveyHtml }}
				className="survey-results"
			/>
		</div>
	);
};

export default Results;
