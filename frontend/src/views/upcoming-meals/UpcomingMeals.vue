<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Upcoming Meals</h2>
			</header>
			<div class="meal-schedule">
				<upcoming-meal-day
					v-for="upcomingMeal in upcomingMeals"
					:key="upcomingMeal.dayOfWeek"
					:dayOfWeek="upcomingMeal.dayOfWeek"
				></upcoming-meal-day>
			</div>
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
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: min-content;
	padding: 1.5rem;
}

.main-container header {
	grid-column: 1 / 5;
	display: flex;
	justify-content: space-between;
}

.meal-schedule {
	grid-column: 1 / 5;
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	row-gap: 3rem;
}

.meal-container {
	text-align: center;
	padding: 1rem;
	border-right: 2px solid black;
}

.meal-container:last-child {
	border-right: none;
	scroll-snap-stop: always;
}

a:hover {
	color: grey;
}
</style>
