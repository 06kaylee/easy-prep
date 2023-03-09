<template>
	<div class="upcomingMealPreview">
		<div class="upcomingMealPreview_topContent">
			<h2>{{ mealType }}</h2>
			<font-awesome-icon :icon="['fas', 'plus']" />
		</div>

		<div class="upcomingMealPreview_contentContainer" v-if="meals">
			<base-card
				v-for="meal in meals"
				:key="meal"
				class="upcomingMealPreview_cardContent"
			>
				<div class="upcomingMealPreview_cardContent_imgContainer">
					<img :src="meal.img" :alt="meal.itemName" />
				</div>
				<div class="upcomingMealPreview_cardContent_info">
					<h3>{{ meal.itemName }}</h3>
					<div class="upcomingMealPreview_cardContent_info_nutrition">
						<p v-for="(val, name) in quickNutritionInfo(meal)" :key="val">
							<span>{{ val }}</span> {{ ingredientLabels[name].label }}
						</p>
					</div>
				</div>
			</base-card>
		</div>
	</div>
</template>

<script>
export default {
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
			default: function () {
				return [];
			},
		},
	},
	data() {
		return {
			ingredientLabels: {
				calories: {
					label: "Calories",
				},
				totalFat: {
					label: "Fat",
				},
				cholesterol: {
					label: "Cholesterol",
				},
				totalCarbs: {
					label: "Carbs",
				},
				protein: {
					label: "Protein",
				},
				sodium: {
					label: "Sodium",
				},
			},
		};
	},
	methods: {
		quickNutritionInfo(meal) {
			console.log(meal);
			const fields = ["totalFat", "totalCarbs", "protein"];
			const filteredNutritionInfo = {};
			for (const key in meal.nutritionFacts) {
				if (fields.includes(key)) {
					filteredNutritionInfo[key] = meal.nutritionFacts[key];
				}
			}
			return filteredNutritionInfo;
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
	}

	&_contentContainer {
		display: grid;
		gap: 2rem;

		@media screen and (min-width: 760px) {
			display: flex;
			overflow-x: auto;
			padding: 0.5rem;
			gap: 1.5rem;
		}
	}

	div &_cardContent {
		max-width: 30rem;
		width: 20rem;
		margin: 0;
		height: 20rem;

		&_imgContainer {
			display: flex;
			justify-content: center;
			margin-bottom: 0.5rem;

			img {
				max-width: 150px;
				max-height: 150px;
			}
		}

		&_info {
			display: grid;
			gap: 2rem;

			h3 {
				font-size: 1.3rem;
				justify-self: center;
			}

			&_nutrition {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				justify-items: center;

				p {
					text-align: center;

					span {
						display: block;
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
