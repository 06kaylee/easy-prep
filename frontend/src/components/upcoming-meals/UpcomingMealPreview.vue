<template>
	<div class="upcomingMealPreview">
		<div class="upcomingMealPreview_topContent">
			<h2>{{ mealType }}</h2>
			<font-awesome-icon :icon="['fas', 'plus']" />
		</div>

		<div
			class="upcomingMealPreview_contentContainer"
			v-if="meals && meals.length"
		>
			<base-carousel @next="nextMeal" :items="meals">
				<template v-slot:content>
					<UpcomingMealPreviewCard :meal="this.currentMeal" />
				</template>
			</base-carousel>
		</div>
		<base-card v-else class="upcomingMealPreview_defaultCard">
			<h3>No meals selected for this day!</h3>
		</base-card>
	</div>
</template>

<script>
import UpcomingMealPreviewCard from "./UpcomingMealPreviewCard.vue";

export default {
	components: {
		UpcomingMealPreviewCard,
	},
	props: {
		day: {
			type: String,
			required: true,
		},
		mealType: {
			type: String,
			required: true,
		},
		meals: {
			type: Array,
			default: null,
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
			ingredientLabels: {
				calories: {
					label: "Calories",
					units: "",
				},
				fat: {
					label: "Fat",
					units: "g",
				},
				cholesterol: {
					label: "Cholesterol",
					units: "mg",
				},
				carbohydrates: {
					label: "Carbs",
					units: "g",
				},
				protein: {
					label: "Protein",
					units: "g",
				},
				sodium: {
					label: "Sodium",
					units: "mg",
				},
			},
			currentIndex: 0,
		};
	},
	methods: {
		quickNutritionInfo(meal) {
			console.log(meal);
			const fields = ["fat", "carbohydrates", "protein"];
			const filteredNutritionInfo = {};
			for (const key in meal.nutritionFacts) {
				if (fields.includes(key)) {
					filteredNutritionInfo[key] = meal.nutritionFacts[key];
				}
			}
			return filteredNutritionInfo;
		},
		getNutritionLabel(name) {
			return this.ingredientLabels[name].label;
		},
		getNutritionUnits(name) {
			return this.ingredientLabels[name].units;
		},
		nextMeal() {
			if (this.currentIndex + 1 === this.meals.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex += 1;
			}
		},
	},
	computed: {
		currentMeal() {
			return this.meals?.[this.currentIndex];
		},
	},
};
</script>

<style lang="scss" scoped>
.upcomingMealPreview {
	display: grid;
	gap: 1rem;

	&_topContent {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media screen and (min-width: 1024px) {
			justify-content: start;
			gap: 1.5rem;
		}
	}

	// &_contentContainer {
	// 	display: grid;
	// 	gap: 2rem;

	// 	@media screen and (min-width: 1200px) {
	// 		width: 85%;
	// 	}
	// }

	div &_defaultCard {
		max-width: 30rem;
		width: 20rem;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 10rem;
		padding: 2rem;
		margin: 0;

		@media screen and (min-width: 768px) {
			height: 12rem;
		}

		@media screen and (min-width: 1024px) {
			height: 20rem;
			width: 15rem;
		}

		@media screen and (min-width: 1200px) {
			width: 20rem;
		}
	}
}
</style>
