<template>
	<base-modal @close="closeImportModal" class="favoriteMealImportModal">
		<template v-slot:header>
			<h2>Paste the URL of the recipe you would like to import</h2>
		</template>
		<template v-slot:body>
			<form @submit.prevent="submitImportModal">
				<input type="text" v-model="importedRecipeUrl" placeholder="URL" />
				<div>
					<base-button>Submit</base-button>
				</div>
			</form>
		</template>
	</base-modal>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
	data() {
		return {
			itemName: "",
			img: null,
			servings: null,
			readyTime: null,
			nutritionFacts: {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			},
			ingredients: [""],
			steps: [""],
			recipeUrl: null,
			importedRecipeUrl: "",
			importedRecipeResults: null,
		};
	},
	methods: {
		closeImportModal() {
			this.$emit("close");
		},
		async submitImportModal() {
			const res = await FavoriteMealService.extractRecipe(
				this.importedRecipeUrl
			);
			this.importedRecipeResults = res.data;
			if (this.importedRecipeResultsSet) {
				this.setVariablesWithImported();
			}
			const importedData = {
				itemName: this.itemName,
				img: this.img,
				servings: this.servings,
				readyTime: this.readyTime,
				nutritionFacts: this.nutritionFacts,
				ingredients: this.ingredients,
				steps: this.steps,
				recipeUrl: this.recipeUrl,
			};

			this.$emit("form-submitted", importedData);
		},
		setVariablesWithImported() {
			console.log(this.importedRecipeResults);
			this.itemName = this.importedRecipeResults.title;
			this.servings =
				this.importedRecipeResults.servings === -1
					? ""
					: this.importedRecipeResults.servings;
			this.readyTime =
				this.importedRecipeResults.readyInMinutes === -1
					? ""
					: this.importedRecipeResults.readyInMinutes;
			this.ingredients = this.setImportedIngredients();
			this.steps = this.setImportedSteps();
			this.nutritionFacts = this.setNutritionFacts("imported");
			this.img = this.importedRecipeResults.image;
			this.recipeUrl = this.importedRecipeResults.sourceUrl;
		},
		setImportedIngredients() {
			const importedIngredients = [];
			for (const ingredient of this.importedRecipeResults.extendedIngredients) {
				if (ingredient.original !== "") {
					importedIngredients.push(ingredient.original);
				}
			}
			return importedIngredients;
		},
		setImportedSteps() {
			const importedSteps = [];
			const instructions =
				this.importedRecipeResults?.analyzedInstructions?.[0]?.steps;
			if (instructions) {
				for (const instruction of instructions) {
					if (instruction.step !== "") {
						importedSteps.push(instruction.step);
					}
				}
			}
			return importedSteps;
		},
		setNutritionFacts(type) {
			const nutritionFacts = {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			};
			const results =
				type === "imported"
					? this.importedRecipeResults
					: this.analyzedRecipeResults;

			for (const fact of results.nutrition.nutrients) {
				let lowercaseLabel;
				if (this.capitalizedNutritionLabels.includes(fact.name)) {
					lowercaseLabel = this.lowercaseNutritionLabel(fact.name);
					nutritionFacts[lowercaseLabel] = Math.round(fact.amount);
				}
			}
			return nutritionFacts;
		},
		lowercaseNutritionLabel(label) {
			return label[0].toLowerCase() + label.slice(1);
		},
	},
	computed: {
		importedRecipeResultsSet() {
			return (
				this.importedRecipeResults &&
				Object.keys(this.importedRecipeResults).length !== 0
			);
		},
		capitalizedNutritionLabels() {
			const keys = Object.keys(this.nutritionFacts);
			return keys.map((key) => key[0].toUpperCase() + key.slice(1));
		},
	},
};
</script>

<style lang="scss">
.favoriteMealImportModal {
	form {
		display: grid;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;

		input {
			padding: 0.4rem;
			border-radius: 0.2rem;
			border: 1px solid black;
			width: fit-content;
			margin-bottom: 0.5rem;
		}
	}
}
</style>
