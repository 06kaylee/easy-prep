<template>
	<base-card class="upcomingMealPreviewCard">
		<div class="upcomingMealPreviewCard_imgContainer">
			<img :src="meal.img" :alt="meal.itemName" />
		</div>
		<div class="upcomingMealPreviewCard_info">
			<h3 class="upcomingMealPreviewCard_title">{{ meal.itemName }}</h3>
			<div class="upcomingMealPreviewCard_nutrition">
				<p v-for="(val, name) in quickNutritionInfo(meal)" :key="val">
					<span v-if="getNutritionUnits(name)">
						{{ val }}{{ getNutritionUnits(name) }}
					</span>
					<span v-else>{{ val }}</span>
					<span>
						{{ getNutritionLabel(name) }}
					</span>
				</p>
			</div>
			<div class="upcomingMealPreviewCard_btnContainer">
				<base-button v-if="to" link :to="to"> See Meal </base-button>
			</div>
		</div>
	</base-card>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
	props: {
		meal: {
			type: Object,
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
			favoriteMeals: null,
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
	},
	computed: {
		to() {
			const favoriteMeal = this.favoriteMeals?.find(
				(meal) => meal._id === this.meal.favoriteMealId
			);
			return favoriteMeal ? `/favorite-meals/${favoriteMeal._id}` : "";
		},
	},
	async mounted() {
		const res = await FavoriteMealService.getAll();
		this.favoriteMeals = res.data;
	},
};
</script>

<style lang="scss" scoped>
div .upcomingMealPreviewCard {
	max-width: 30rem;
	width: 20rem;
	margin: 0;
	height: 10rem;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);

	@media screen and (min-width: 768px) {
		max-width: 30rem;
		width: 20rem;
		margin: 0;
		height: 20rem;
		padding: 0;
		grid-template-columns: 1fr;
	}

	@media screen and (min-width: 1024px) {
		width: 15rem;
	}

	@media screen and (min-width: 1200px) {
		width: 20rem;
	}

	&_imgContainer {
		height: 100%;

		@media screen and (min-width: 768px) {
			display: flex;
			justify-content: center;
			margin-bottom: 0.5rem;
			width: 100%;
		}

		img {
			width: 100%;
			max-height: 100%;
			object-fit: cover;
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;

			@media screen and (min-width: 768px) {
				width: 100%;
				max-height: 150px;
				object-fit: cover;
				border-top-left-radius: 12px;
				border-top-right-radius: 12px;
			}
		}
	}

	&_info {
		display: grid;
		gap: 1rem;
		padding: 1rem;
	}

	&_title {
		font-size: 1.3rem;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		align-self: end;

		@media screen and (min-width: 768px) {
			align-self: start;
		}
	}

	&_nutrition {
		display: none;
		justify-items: center;

		@media screen and (min-width: 768px) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		p {
			text-align: center;
			display: grid;
			gap: 0.2rem;

			span {
				display: block;
				font-weight: bold;
			}
		}
	}

	&_btnContainer {
		display: flex;
		justify-content: center;
		width: 8rem;
		height: fit-content;

		@media screen and (min-width: 768px) {
			width: initial;
		}
	}
}
</style>
