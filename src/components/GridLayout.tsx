import type { ReactNode } from "react";

interface GridLayoutProps {
	items: ReactNode[];
	columns: number;
}

const GridLayout = ({ items, columns }: GridLayoutProps) => {
	const row = (item: ReactNode, idx: number) => (
		<div key={idx} className="row">
			{item}
		</div>
	);

	const col = (item: ReactNode, idx: number) => {
		const sizeName = `col-${12 / columns}`;
		return (
			<div key={idx} className={sizeName}>
				{item}
			</div>
		);
	};

	const rows: ReactNode[] = [];
	let group: ReactNode[] = [];
	items.forEach((element, idx) => {
		if (idx > 0 && idx % columns === 0) {
			rows.push(row(group, idx));
			group = [];
		}
		group.push(col(element, idx));
	});
	if (group.length > 0) {
		rows.push(row(group, items.length));
	}

	return <div>{rows}</div>;
};

export default GridLayout;
