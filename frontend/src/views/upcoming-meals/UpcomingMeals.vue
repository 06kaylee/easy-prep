<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Upcoming Meals</h2>
			</header>

			<upcoming-meal-day
				v-for="upcomingMeal in upcomingMeals"
				:key="upcomingMeal.dayOfWeek"
				:dayOfWeek="upcomingMeal.dayOfWeek"
			></upcoming-meal-day>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";
import UpcomingMealDay from "../../components/upcoming-meals/UpcomingMealDay.vue";

export default {
	components: {
		DashboardLayout,
		UpcomingMealDay,
	},
	computed: {
		upcomingMeals() {
			return this.$store.getters["upcomingMeals/upcomingMeals"];
		},
	},
};
</script>

<style scoped>
.main-container {
	display: grid;
	grid-template-columns: 1fr;
	padding: 1.5rem;
	gap: 2rem;
}

.main-container header {
	grid-column: 1 / 2;
}

@media screen and (min-width: 55rem) {
	.main-container {
		grid-template-columns: repeat(2, 1fr);
	}

	.main-container header {
		grid-column: 1 / 3;
	}
}

@media screen and (min-width: 80rem) {
	.main-container {
		grid-template-columns: repeat(3, 1fr);
	}

	.main-container header {
		grid-column: 1 / 4;
	}
}

a:hover {
	color: grey;
}
</style>
