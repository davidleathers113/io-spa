import { printCurrentPage } from '../lib/printing';

type PrintButtonProps = {
	className?: string;
	label?: string;
};

const PrintButton = ({ className, label = 'Print' }: PrintButtonProps) => {
	return (
		<button
			type="button"
			onClick={printCurrentPage}
			className={className ? `${className} print:hidden` : 'print:hidden'}
		>
			{label}
		</button>
	);
};

export default PrintButton;
