<template>
	<base-modal class="favoriteMealNutritionModal">
		<template v-slot:header>
			<h2>Guess the nutrition info</h2>
		</template>
		<template v-slot:body>
			<div class="nutritionModal_content">
				<p>
					Make sure the name, ingredients, and servings are filled out before
					clicking submit!
				</p>
				<div>
					<base-button @click="submitNutritionModal">Submit</base-button>
				</div>
			</div>
		</template>
	</base-modal>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
	props: {
		itemName: {
			type: String,
			required: true,
		},
		servings: {
			type: Number,
			required: true,
		},
		ingredients: {
			type: Array,
			required: true,
		},
		steps: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			nutritionFacts: {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			},
		};
	},
	methods: {
		async submitNutritionModal() {
			const recipe = {
				title: this.itemName,
				servings: this.servings,
				ingredients: this.ingredients,
				instructions: this.steps,
			};
			const res = await FavoriteMealService.analyzeRecipe(recipe);
			const analyzedRecipeResults = res.data;
			this.nutritionFacts = this.setNutritionFacts(analyzedRecipeResults);
			this.$emit("form-submitted", this.nutritionFacts);
		},
		setNutritionFacts(analyzedRecipeResults) {
			const nutritionFacts = {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			};

			for (const fact of analyzedRecipeResults.nutrition.nutrients) {
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
		capitalizedNutritionLabels() {
			const keys = Object.keys(this.nutritionFacts);
			return keys.map((key) => key[0].toUpperCase() + key.slice(1));
		},
	},
};
</script>

<style lang="scss" scoped>
.favoriteMealNutritionModal {
	&_content {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
		justify-content: center;
	}
}
</style>
