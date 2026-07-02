/** Recipe as stored in localStorage — ingredients are numeric IDs */
export interface Recipe {
	id: number;
	name: string;
	image: string;
	description: string;
	rating: number;
	ingredients: number[];
}

/** Recipe as displayed to the user — ingredients are resolved strings */
export interface MappedRecipe {
	id: number;
	name: string;
	image: string;
	description: string;
	rating: number;
	ingredients: string[];
}
