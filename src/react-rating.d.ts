declare module "react-rating" {
	import type { ComponentType } from "react";

	interface RatingProps {
		start?: number;
		stop?: number;
		step?: number;
		fractions?: number;
		initialRating?: number;
		readonly?: boolean;
		emptySymbol?: string | JSX.Element;
		placeholderSymbol?: string | JSX.Element;
		fullSymbol?: string | JSX.Element;
		onChange?: (value: number) => void;
	}

	const Rating: ComponentType<RatingProps>;
	export default Rating;
}
