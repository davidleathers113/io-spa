import type { IoPayload } from '../features/io/schema';

type JsonExportButtonProps = {
	data: Partial<IoPayload> | Record<string, unknown>;
	filename?: string;
	className?: string;
};

const JsonExportButton = ({ data, filename = 'insertion-order.json', className }: JsonExportButtonProps) => {
	const handleDownload = () => {
		// Manually generating a download Blob to avoid external deps.
		const json = JSON.stringify(data, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	return (
		<button type="button" onClick={handleDownload} className={className}>
			Export as JSON
		</button>
	);
};

export default JsonExportButton;
