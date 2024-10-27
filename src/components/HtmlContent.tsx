interface HtmlContentProps {
	content: string;
	className?: string;
}

export function HtmlContent({ content, className }: HtmlContentProps) {
	return (
		<div className={className} dangerouslySetInnerHTML={{ __html: content }} />
	);
}
