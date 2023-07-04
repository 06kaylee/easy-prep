<template>
	<div class="upcomingMealsChoose">
		<h2 class="upcomingMealsChoose_title">Choose Your Upcoming Meals</h2>

		<div class="upcomingMealsChoose_container">
			<!-- Favorite meals -->
			<div class="upcomingMealsChoose_favoriteMealsContainer">
				<base-card></base-card>
			</div>

			<!-- Days of the week -->
			<div class="upcomingMealsChoose_upcomingContainer">
				<base-card class="upcomingMealsChoose_upcomingCard">
					<div class="upcomingMealsChoose_header">
						<h3>Monday</h3>
						<base-button
							class="upcomingMealsChoose_btn"
							:disabled="!hasItems"
							@click="next"
						>
							<font-awesome-icon :icon="['fas', 'angle-right']" />
						</base-button>
					</div>
					<div class="upcomingMealsChoose_mealsContainer">
						<div
							class="upcomingMealsChoose_mealType"
							v-for="mealType of mealTypes"
							:key="mealType"
						>
							<h4>{{ mealType }}</h4>
							<div
								v-for="meal of getUpcomingMealsForMealType(mealType)"
								:key="meal._id"
							>
								<base-card class="upcomingMealsChoose_mealCard">
									<div class="upcomingMealsChoose_imgContainer">
										<img :src="meal.img" :alt="meal.itemName" />
									</div>
									<h3 class="upcomingMealsChoose_upcomingMealName">
										{{ meal.itemName }}
									</h3>
								</base-card>
							</div>
						</div>
					</div>
				</base-card>
			</div>
		</div>
	</div>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	data() {
		return {
			upcomingMeals: null,
			favoriteMeals: null,
			currentDay: "Mon",
			mealTypes: ["breakfast", "lunch", "dinner"],
		};
	},
	computed: {
		getUpcomingMealsForDay() {
			if (this.upcomingMeals?.length) {
				return this.upcomingMeals.filter(
					(meal) => meal.dayOfWeek === this.currentDay
				);
			}
			return [];
		},
	},
	methods: {
		getUpcomingMealsForMealType(mealType) {
			return this.getUpcomingMealsForDay?.filter(
				(meal) => meal.mealType === mealType
			);
		},
	},
	async created() {
		const resUpcoming = await UpcomingMealService.getAll();
		const resFavorite = await FavoriteMealService.getAll();
		this.upcomingMeals = resUpcoming.data;
		this.favoriteMeals = resFavorite.data;
	},
};
</script>

<style lang="scss" scoped>
.upcomingMealsChoose {
	&_title {
		text-align: center;
	}

	&_container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		padding: 0 1rem;
	}

	&_favoriteMealsContainer {
		& .card {
			max-width: 100%;
			width: 100%;
			height: 30rem;
			margin: 1rem 0 0;
		}
	}

	div &_upcomingCard {
		max-width: 100%;
		width: 100%;
		height: 30rem;
		margin: 1rem 0;
		margin-top: 1rem;
		justify-content: center;
		display: grid;
		grid-template-rows: auto 1fr;
		overflow-y: auto;
	}

	&_header {
		display: flex;
		height: fit-content;
		gap: 0.5rem;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	&_btn {
		height: fit-content;
		border: none;
	}

	&_mealsContainer {
		display: grid;
	}

	&_imgContainer {
		display: flex;
		justify-content: center;
		width: 100%;

		img {
			width: 100%;
			max-height: 100%;
			object-fit: cover;
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;
		}
	}

	div &_mealCard {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0;
		padding-right: 1rem;
		gap: 1rem;
	}

	&_upcomingMealName {
		align-self: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
