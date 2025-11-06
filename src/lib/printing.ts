// Simple printing helpers for the form.
// Manually kept minimal; print layout CSS can live in Tailwind via `print:` variants.

export function printCurrentPage(): void {
	if (typeof window !== 'undefined' && window.print) {
		window.print();
	}
}

export default {
	printCurrentPage,
};
