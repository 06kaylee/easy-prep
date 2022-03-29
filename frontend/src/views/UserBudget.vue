<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Budget</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
			</header>
			<div class="budget-category-container" v-for="budget in budgets" :key="budget.category">
				<h3 class="category-title">{{ budget.category }}</h3>
				<base-card>
					<div class="budget-card-item">
						<p>Target Amount</p>
						<p>${{ budget.stats.targetAmount }}/week</p>
					</div>
					<div class="budget-card-item">
						<p>Current Total</p>
						<p>${{ budget.stats.currentTotal }}</p>
					</div>
					<div class="budget-card-item">
						<p>Average Spent</p>
						<p>${{ budget.stats.avgSpent }}/week</p>
					</div>
					<div class="budget-card-item">
						<p>Most Expensive Ingredients</p>
						<ol>
							<li v-for="expensiveItem in budget.stats.mostExpensive" :key="expensiveItem">
								{{expensiveItem}}
							</li>
						</ol>
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
		budgets() {
			return this.$store.getters['budget/budgets'];
		}
	}
};
</script>

<style scoped>
.main-container {
	display: grid;
	height: fit-content;
	margin: 0.5rem 2rem 2rem 2rem;
	grid-gap: 2rem;
}

.main-container header {
	display: flex;
	justify-content: space-between;
}

.fa-pen {
	color: black;
	font-size: 1.1rem;
}

.fa-pen:hover {
	color: grey;
}

.budget-category-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-bottom: 1rem;
}

.budget-category-container .card {
	margin: 0;
}

.category-title {
	grid-column: 1 / 3;
	padding-bottom: 1rem;
}

.budget-category-container .card {
	display: grid;
	grid-template-areas: 
	'target target'
	'current current'
	'average average'
	'most-expensive most-expensive'
	;
	padding: 1rem;
	grid-column: 1 / 3;
}

@media screen and (min-width: 60rem) {
	.budget-category-container .card {
		max-width: 33rem;
		grid-template-areas: 
		'target target target'
		'current current current'
		'average average average'
		'most-expensive most-expensive most-expensive'
		;
	}
}

@media screen and (min-width: 80rem) {
	.budget-category-container .card {
		max-width: fit-content;
		grid-template-areas: 'target current average most-expensive';
	}
}

.budget-card-item {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.budget-card-item p:nth-of-type(1) {
	grid-column: 1 / 3;
}

.budget-card-item p:nth-of-type(2) {
	grid-column: 1 / 3;
	grid-row: 2 / 3;
}

.budget-card-item:nth-of-type(1) {
	grid-area: target;
	text-align: center;
}

.budget-card-item:nth-of-type(2) {
	grid-area: current;
	text-align: center;
}

.budget-card-item:nth-of-type(3) {
	grid-area: average;
	text-align: center;
}

.budget-card-item:nth-of-type(4) {
	grid-area: most-expensive;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.budget-card-item:nth-of-type(4) p {
	grid-column: 1 / 5;
	text-align: center;
}

.budget-card-item:nth-of-type(4) ol {
	grid-column: 1 / 5;
	margin: auto;
}

a:hover {
	color: grey;
}
</style>
