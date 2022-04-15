<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Favorite Meals</h2>
			</header>

			<favorite-meal-item
				v-for="favoriteMeal in favoriteMeals"
				:key="favoriteMeal.id"
				:id="favoriteMeal.id"
				:title="favoriteMeal.title"
				:imgLink="favoriteMeal.imgLink"
			></favorite-meal-item>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";
import FavoriteMealItem from "../../components/favorite-meals/FavoriteMealItem.vue";

export default {
	components: {
		DashboardLayout,
		FavoriteMealItem,
	},
	computed: {
		favoriteMeals() {
			return this.$store.getters["favoriteMeals/favoriteMeals"];
		},
	},
};
</script>

<style scoped>
.main-container {
	padding: 0.5rem 0rem 0 1.5rem;
	display: grid;
	grid-template-columns: 1fr;
}

.main-container header {
	grid-column: 1 / 2;
	display: flex;
	justify-content: space-between;
}

/* if greater than or equal to 60rem */
@media screen and (min-width: 45rem) {
	.main-container {
		grid-template-columns: repeat(2, 1fr);
	}

	.main-container header {
		grid-column: 1 / 3;
	}
}

/* if greater than or equal to 60rem */
@media screen and (min-width: 60rem) {
	.main-container {
		grid-template-columns: repeat(3, 1fr);
	}

	.main-container header {
		grid-column: 1 / 4;
	}
}
</style>
