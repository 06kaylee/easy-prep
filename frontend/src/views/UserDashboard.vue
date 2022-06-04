<template>
	<dashboard-layout>
		<div class="dashboard-container" v-if="upcomingMeals">
			<header id="welcome-msg">
				<h2>Welcome, name</h2>
			</header>

			<base-card>
				<div class="favmeal-container">
					<a>
						<h2 v-if="numFavoriteMeals > 1">{{ numFavoriteMeals }} Favorite Meals</h2>
						<h2 v-else>{{ numFavoriteMeals }} Favorite Meal</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="goal-container">
					<a>
						<h2 v-if="numGoals > 1">{{ numGoals }} Goals</h2>
						<h2 v-else>{{ numGoals }} Goal</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="restriction-container">
					<a>
						<h2 v-if="numDietaryRestrictions > 1">{{ numDietaryRestrictions }} Dietary Restrictions</h2>
						<h2 v-else>{{ numDietaryRestrictions }} Dietary Restriction</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="upcoming-meals-container">
					<ul>
						<li
							v-for="(summary, dayOfWeek) in upcomingMealsSummary"
							:key="summary"
						>
							<h3 class="day-of-week">{{ dayOfWeek }}</h3>
							<p v-if="summary.numMeals > 1 || summary.numMeals === 0" class="sublist">
								{{ summary.numMeals}} meals planned
							</p>
							<p v-else class="sublist">
								{{ summary.numMeals}} meal planned
							</p>
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
import FavoriteMealService from "../services/FavoriteMealService";
import GoalService from "../services/GoalService";
import UpcomingMealService from "../services/UpcomingMealService";

export default {
	components: {
		DashboardLayout,
	},
	data() {
		return {
			favoriteMeals: null,
			goals: null,
			upcomingMeals: null
		}
	},
	computed: {
		numFavoriteMeals() {
			return this.favoriteMeals.length;
		},
		numGoals() {
			return this.goals.length;
		},
		numDietaryRestrictions() {
			return this.$store.getters["dashboardPage/numDietaryRestrictions"];
		},
		currentMonthMoneySpent() {
			return this.$store.getters["dashboardPage/currentMonthMoneySpent"];
		},
		lastMonthMoneySpent() {
			return this.$store.getters["dashboardPage/lastMonthMoneySpent"];
		},
		upcomingMealsSummary() {
			const upcomingMealsSummary = {};
			const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
			for(const day of days) {
				upcomingMealsSummary[day] = {
					numMeals: 0
				};
			}
			for(const meal of this.upcomingMeals) {
				upcomingMealsSummary[meal.dayOfWeek].numMeals = upcomingMealsSummary[meal.dayOfWeek].numMeals + 1;
			}
			return upcomingMealsSummary;
		},
	},
	async created() {
		const favoriteMealsRes = await FavoriteMealService.getAll();
		this.favoriteMeals = favoriteMealsRes.data;

		const goalsRes = await GoalService.getAll();
		this.goals = goalsRes.data;

		const upcomingMealsRes = await UpcomingMealService.getAll();
		this.upcomingMeals = upcomingMealsRes.data;
	}
};
</script>

<style scoped>
.dashboard-container .card {
	margin: 0;
	max-width: none;
}

.dashboard-container .card h2 {
	display: flex;
	justify-content: center;
}

.dashboard-container {
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

.dashboard-container .card:nth-of-type(1),
.dashboard-container .card:nth-of-type(2),
.dashboard-container .card:nth-of-type(3) {
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

.dashboard-container .card:nth-of-type(1) {
	grid-area: favorite-meals;
}

.dashboard-container .card:nth-of-type(2) {
	grid-area: goals;
}

.dashboard-container .card:nth-of-type(3) {
	grid-area: dietary-restrictions;
}

.dashboard-container .card:nth-of-type(4) {
	grid-area: upcoming-meals;
}

.dashboard-container .card:nth-of-type(5) {
	grid-area: budget;
}

/* min width means that if the device width is greater than or equal to 50 rem... */

@media screen and (min-width: 60rem) {
	.dashboard-container {
		grid-template-areas:
			"welcome welcome welcome"
			"favorite-meals goals goals"
			"upcoming-meals dietary-restrictions dietary-restrictions"
			"upcoming-meals budget budget";
	}
}

@media screen and (min-width: 90em) {
	.dashboard-container {
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
