<template>
	<dashboard-layout changeWidth isActive="upcoming-meals">
		<div class="all-upcoming-days-container">
			<header>
				<h2>Your Upcoming Meals</h2>
			</header>

			<upcoming-meal-day
				v-for="dayOfWeek in daysOfWeek"
				:key="dayOfWeek"
				:dayOfWeek="dayOfWeek"
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
	data() {
		return {
			daysOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
		}
	}
};
</script>

<style scoped>
.all-upcoming-days-container {
	display: grid;
	grid-template-columns: 1fr;
	padding: 1.5rem;
	gap: 2rem;
}

.all-upcoming-days-container header {
	grid-column: 1 / 2;
}

@media screen and (min-width: 55rem) {
	.all-upcoming-days-container {
		grid-template-columns: repeat(2, 1fr);
	}

	.all-upcoming-days-container header {
		grid-column: 1 / 3;
	}
}

@media screen and (min-width: 80rem) {
	.all-upcoming-days-container {
		grid-template-columns: repeat(3, 1fr);
	}

	.all-upcoming-days-container header {
		grid-column: 1 / 4;
	}
}

a:hover {
	color: grey;
}
</style>
