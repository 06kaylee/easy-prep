<template>
	<dashboard-layout changeWidth>
		<div class="content-container">
			<header id="welcome-msg">
				<h2>Welcome, name</h2>
			</header>

			<base-card>
				<div class="favmeal-container">
					<a>
						<h2>4 Favorite Meals</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="goal-container">
					<a>
						<h2>4 Goals</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="restriction-container">
					<a>
						<h2>3 Dietary Restrictions</h2>
					</a>
				</div>
			</base-card>

			<base-card>
				<div class="upcoming-meals-container">
					<ul>
						<li class="day-of-week">Mon</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Tues</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Wed</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Thurs</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Fri</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Sat</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>

						<li class="day-of-week">Sun</li>
						<ul>
							<li class="sublist">Chicken</li>
						</ul>
					</ul>
				</div>
			</base-card>

			<base-card>
				<div class="budget-container">
					<p>Money spent</p>
					<p>This Month</p>
					<p>Last Month</p>
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
};
</script>

<style scoped>
.content-container .card {
	margin: 0;
	max-width: none;
}

.content-container {
	display: grid;
	grid-template-areas:
		"welcome"
		"favorite-meals"
		"goals"
		"dietary-restrictions"
		"upcoming-meals"
		"budget";
	gap: 1.5rem;
	width: min(95%, 70rem);
}

#welcome-msg {
	text-align: left;
	grid-area: welcome;
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

@media screen and (min-width: 30em) {
	.content-container {
		grid-template-areas:
			"welcome welcome"
			"favorite-meals goals"
			"dietary-restrictions upcoming-meals"
			"budget upcoming-meals"
			"budget upcoming-meals";
	}
}

@media screen and (min-width: 50rem) {
	.content-container {
		grid-template-areas:
			"welcome welcome welcome"
			"favorite-meals goals goals"
			"upcoming-meals dietary-restrictions dietary-restrictions"
			"upcoming-meals budget budget";
	}
}

@media screen and (min-width: 70em) {
	.content-container {
		grid-template-areas:
			"welcome welcome welcome welcome"
			"favorite-meals goals dietary-restrictions upcoming-meals"
			"budget budget budget upcoming-meals";
	}
}

/* .content-container {
	padding-left: 2rem;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
} */

/* #welcome-msg {
	text-align: center;
	grid-column: 1 / 13;
	grid-row: 1 / 2;
} */
/* .card:nth-of-type(1) {
	max-width: 10rem;
	background-color: white;
	grid-column: 1 / 3;
	grid-row: 2 / 3;
} */
/* .card:nth-of-type(2) {
	max-width: 10rem;
	background-color: white;
	grid-column: 4 / 6;
	grid-row: 2 / 3;
} */
/* .card:nth-of-type(3) {
	max-width: 10rem;
	background-color: white;
	grid-area: restrictions;
	grid-column: 7 / 9;
	grid-row: 2 / 3;
} */

/* .card:nth-of-type(4) {
	margin: 0 2rem;
	max-width: 40rem;
	background-color: white;
	grid-column: 10 / 13;
	grid-row: 2 / 4;
} */
/* .card:nth-of-type(5) {
	max-width: 28rem;
	background-color: white;
	grid-column: 1 / 10;
	grid-row: 3 / 4;
	margin: 0;
} */

.upcoming-meals-container ul {
	list-style-type: none;
}

.upcoming-meals-container ul > ul {
	padding-bottom: 0.8rem;
}

.day-of-week {
	font-weight: 800;
}
</style>
