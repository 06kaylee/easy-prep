<template>
	<dashboard-layout>
		<div class="FavoriteMeals">
			<header class="FavoriteMeals_header">
				<h2>My Favorite Meals</h2>
				<h4>
					<router-link
						to="/favorite-meals/add"
						class="FavoriteMeals_header_addMeal"
					>
						Add a favorite meal
						<font-awesome-icon :icon="['fas', 'plus']" />
					</router-link>
				</h4>
			</header>

			<div class="FavoriteMeals_container">
				<favorite-meal-item
					v-for="favoriteMeal in favoriteMeals"
					:key="favoriteMeal._id"
					:id="favoriteMeal._id"
					:item-name="favoriteMeal.itemName"
					:img="favoriteMeal.img"
					:ready-time="favoriteMeal.readyTime"
					:rating="favoriteMeal.rating"
					:label="favoriteMeal.label"
					:servings="favoriteMeal.servings"
				></favorite-meal-item>
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";
import FavoriteMealItem from "../../components/favorite-meals/FavoriteMealItem.vue";
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
	components: {
		DashboardLayout,
		FavoriteMealItem,
	},
	data() {
		return {
			favoriteMeals: null,
		};
	},
	async created() {
		const res = await FavoriteMealService.getAll();
		console.log(res);
		const meals = res.data;
		this.favoriteMeals = meals;
	},
};
</script>

<style lang="scss" scoped>
.FavoriteMeals {
	padding: 1.5rem;

	&_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;

		&_addMeal {
			text-decoration: none;
			color: black;
		}
	}

	&_container {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2.5rem;
		margin-top: 4rem;

		@media screen and (min-width: 700px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (min-width: 980px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
