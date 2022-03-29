<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Favorite Meals</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
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
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import FavoriteMealItem from "../components/favorite-meals/FavoriteMealItem.vue";

export default {
	components: {
		DashboardLayout,
		FavoriteMealItem
	},
	computed: {
		favoriteMeals() {
			return this.$store.getters['favoriteMeals/favoriteMeals'];
		},
	}
};
</script>

<style scoped>
.main-container {
	padding: 0.5rem 0rem 0 1.5rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.main-container header {
	grid-column: 1 / 4;
	display: flex;
	justify-content: space-between;
}

.fa-pen {
	color: black;
}

.fa-pen:hover {
	color: grey;
}
</style>
