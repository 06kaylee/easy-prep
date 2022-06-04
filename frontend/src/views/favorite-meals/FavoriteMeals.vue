<template>
	<dashboard-layout>
		<div class="all-favorite-meals-container">
			<header>
				<h2>Your Favorite Meals</h2>
				<h4>
					<router-link to="/favorite-meals/add" class="add-favorite-meal-link">
						Add a favorite meal
						<font-awesome-icon :icon="['fas', 'plus']" />
					</router-link>
				</h4>
			</header>

			<favorite-meal-item
				v-for="favoriteMeal in favoriteMeals"
				:key="favoriteMeal._id"
				:id="favoriteMeal._id"
				:itemName="favoriteMeal.itemName"
				:img="favoriteMeal.img"
			></favorite-meal-item>
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

<style scoped>
.all-favorite-meals-container {
	padding: 0.5rem 0rem 0 1.5rem;
	display: grid;
	grid-template-columns: 1fr;
}

.all-favorite-meals-container header {
	grid-column: 1 / 2;
	display: flex;
	justify-content: space-between;
	padding-right: 2rem;
}

.add-favorite-meal-link {
	text-decoration: none;
	color: black;
}

/* if greater than or equal to 45rem */
@media screen and (min-width: 45rem) {
	.all-favorite-meals-container {
		grid-template-columns: repeat(2, 1fr);
	}

	.all-favorite-meals-container header {
		grid-column: 1 / 3;
	}
}

/* if greater than or equal to 60rem */
@media screen and (min-width: 60rem) {
	.all-favorite-meals-container {
		grid-template-columns: repeat(3, 1fr);
	}

	.all-favorite-meals-container header {
		grid-column: 1 / 4;
	}
}
</style>
