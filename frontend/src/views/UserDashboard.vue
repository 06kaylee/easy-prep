<template>
	<dashboard-layout changeWidth>
		<div class="content-container">
			<header id="welcome-msg">
				<h2>Welcome, name</h2>
			</header>

			<base-card>
				<div class="favmeal-container">
					<a>
						<h2>{{ numFavoriteMeals }} Favorite Meals</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="goal-container">
					<a>
						<h2>{{ numGoals }} Goals</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="restriction-container">
					<a>
						<h2>{{ numDietaryRestrictions }} Dietary Restrictions</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="upcoming-meals-container">
					<ul>
						<li v-for="upcomingMeal in upcomingMeals" :key="upcomingMeal.dayOfWeek">
							<h3 class="day-of-week">{{ upcomingMeal.dayOfWeek }}</h3>
							<p class="sublist">{{ upcomingMeal.numOfMealsPlanned }} meals planned</p>
						</li>
					</ul>
				</div>
			</base-card>

			<base-card>
				<div class="budget-container">
					<p>Money spent</p>
					<p>This Month: ${{ currentMonthMoneySpent }}</p>
					<p>Last Month: ${{ lastMonthMoneySpent }}</p>
				</div>
			</base-card>
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
		numFavoriteMeals() {
			return this.$store.getters['dashboardPage/numFavoriteMeals'];
		},
		numGoals() {
			return this.$store.getters['dashboardPage/numGoals'];
		},
		numDietaryRestrictions() {
			return this.$store.getters['dashboardPage/numDietaryRestrictions'];
		},
		currentMonthMoneySpent() {
			return this.$store.getters['dashboardPage/currentMonthMoneySpent'];
		},
		lastMonthMoneySpent() {
			return this.$store.getters['dashboardPage/lastMonthMoneySpent'];
		},
		upcomingMeals() {
			return this.$store.getters['dashboardPage/upcomingMeals'];
		}
	}
};
</script>

<style scoped>
.content-container .card {
	margin: 0;
	max-width: none;
}

.content-container .card h2 {
	display: flex;
	justify-content: center;
}

.content-container {
	padding: 2rem;
	display: grid;
	grid-template-areas:
		"welcome"
		"favorite-meals"
		"goals"
		"dietary-restrictions"
		"upcoming-meals"
		"budget";
	gap: 1.5rem;
	/* width: min(95%, 70rem); */
}

#welcome-msg {
	text-align: left;
	grid-area: welcome;
}

.content-container .card:nth-of-type(1),
.content-container .card:nth-of-type(2),
.content-container .card:nth-of-type(3) {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
}

.favmeal-container,
.goal-container,
.restriction-container {
	width: 60%;
}

.content-container .card:nth-of-type(1) {
	grid-area: favorite-meals;
}

.content-container .card:nth-of-type(2) {
	grid-area: goals;
}

.content-container .card:nth-of-type(3) {
	grid-area: dietary-restrictions;
}

.content-container .card:nth-of-type(4) {
	grid-area: upcoming-meals;
}

.content-container .card:nth-of-type(5) {
	grid-area: budget;
}

/* min width means that if the device width is greater than or equal to 50 rem... */

@media screen and (min-width: 60rem) {
	.content-container {
		grid-template-areas:
			"welcome welcome welcome"
			"favorite-meals goals goals"
			"upcoming-meals dietary-restrictions dietary-restrictions"
			"upcoming-meals budget budget";
	}
}

@media screen and (min-width: 80em) {
	.content-container {
		grid-template-areas:
			"welcome welcome welcome welcome"
			"favorite-meals goals dietary-restrictions upcoming-meals"
			"budget budget budget upcoming-meals";
	}
}

.upcoming-meals-container ul {
	list-style-type: none;
}

.upcoming-meals-container li {
	padding-bottom: 0.8rem;
}

.day-of-week {
	font-weight: 800;
}

.sublist {
	text-indent: 1rem;
}
</style>
