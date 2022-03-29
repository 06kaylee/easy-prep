<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Upcoming Meals</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
			</header>
			<div class="meal-schedule">
				<base-card v-for="upcomingMeal in upcomingMeals" :key="upcomingMeal.dayOfWeek">
					<h2>{{ upcomingMeal.dayOfWeek }}</h2>
					<div class="meal-container" v-for="meal in upcomingMeal.meals" :key="meal">
						<p>{{ meal.item }}</p>
						<p>{{ meal.calorieCount }}</p>
					</div>
				</base-card>
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../components/layout/DashboardLayout.vue";

export default {
	components: {
		DashboardLayout,
	},
	computed: {
		upcomingMeals() {
			return this.$store.getters['upcomingMeals/upcomingMeals'];
		}
	}
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

.main-container .card {
	margin: 0;
}

.fa-pen {
	margin-right: 1.5rem;
	color: black;
}

.fa-pen:hover {
	color: grey;
}

.meal-schedule {
	grid-column: 1 / 5;
	margin-top: 2rem;
	display: grid;
	grid-gap: 2rem;
}

.meal-schedule .card {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.meal-schedule .card h2 {
	text-align: center;
	border-right: 2px solid black;
	padding: 1rem;
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
