interface IngredientsProps {
	ingredients: string[];
}

const styles = {
	ingredients: {
		textAlign: "left" as const,
	},
	title: {
		padding: 0,
		margin: 0,
	},
	list: {
		margin: 0,
	},
};

const Ingredients = ({ ingredients }: IngredientsProps) => {
	return (
		<div style={styles.ingredients}>
			<h4 style={styles.title}>Ingredients</h4>
			<ul style={styles.list}>
				{ingredients.map((name, idx) => (
					<li key={idx}>{name}</li>
				))}
			</ul>
		</div>
	);
};

export default Ingredients;
