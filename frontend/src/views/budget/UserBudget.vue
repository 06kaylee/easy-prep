<template>
	<div class="all-budgets-container">
		<header class="all-budgets-header">
			<h2>Your Budget</h2>
		</header>
		<div
			class="budget-category-container"
			v-for="budget in budgets"
			:key="budget.id"
		>
			<h3 class="category-title">
				{{ budget.category }}
				<router-link :to="'/edit-budget/' + budget.id">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</router-link>
			</h3>
			<base-card class="budget-content-container">
				<div class="budget-content-item">
					<p class="budget-item-title">Target Amount</p>
					<p class="budget-item-value">
						${{ budget.stats.targetAmount }}/{{ budget.stats.timeline }}
					</p>
				</div>
				<div class="budget-content-item">
					<p class="budget-item-title">Current Total</p>
					<p class="budget-item-value">${{ budget.stats.currentTotal }}</p>
				</div>
				<div class="budget-content-item">
					<p class="budget-item-title">Average Spent</p>
					<p class="budget-item-value">${{ budget.stats.avgSpent }}/week</p>
				</div>
				<div class="budget-content-item">
					<p class="budget-item-title">Most Expensive Ingredients</p>
					<ol>
						<li
							v-for="expensiveItem in budget.stats.mostExpensive"
							:key="expensiveItem"
						>
							{{ expensiveItem }}
						</li>
					</ol>
				</div>
			</base-card>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		budgets() {
			return this.$store.getters["budget/budgets"];
		},
	},
};
</script>

<style scoped>
.all-budgets-container {
	display: grid;
	height: fit-content;
	margin: 0.5rem 2rem 2rem 2rem;
	grid-gap: 2rem;
}

.all-budgets-header {
	display: flex;
	justify-content: space-between;
}

.budget-category-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-bottom: 1rem;
}

.budget-category-container > .budget-content-container {
	margin: 0;
	display: grid;
	grid-template-areas:
		"target target"
		"current current"
		"average average"
		"most-expensive most-expensive";
	padding: 1rem;
	grid-column: 1 / 3;
	border-color: #ccc8c6;
}

.category-title {
	grid-column: 1 / 3;
	padding-bottom: 1rem;
}

.category-title a {
	padding-left: 0.5rem;
}

@media screen and (min-width: 60rem) {
	.budget-category-container > .budget-content-container {
		max-width: 33rem;
		grid-template-areas:
			"target target target"
			"current current current"
			"average average average"
			"most-expensive most-expensive most-expensive";
	}
}

@media screen and (min-width: 80rem) {
	.budget-category-container > .budget-content-container {
		max-width: fit-content;
		grid-template-areas: "target current average most-expensive";
	}
}

.budget-content-item {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	background-color: grey;
}

.budget-item-title {
	grid-column: 1 / 3;
}

.budget-item-value {
	grid-column: 1 / 3;
	grid-row: 2 / 3;
}

.budget-category-container:nth-child(even) .budget-content-item {
	background-color: #efd9c1;
}

.budget-category-container:nth-child(odd) .budget-content-item {
	background-color: #c7d8c6;
}

.budget-content-item:nth-of-type(1) {
	grid-area: target;
	text-align: center;
}

.budget-content-item:nth-of-type(2) {
	grid-area: current;
	text-align: center;
}

.budget-content-item:nth-of-type(3) {
	grid-area: average;
	text-align: center;
}

.budget-content-item:nth-of-type(4) {
	grid-area: most-expensive;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.budget-content-item:nth-of-type(4) .budget-item-title {
	grid-column: 1 / 5;
	text-align: center;
}

.budget-content-item:nth-of-type(4) ol {
	grid-column: 1 / 5;
	margin: auto;
}

.fa-pen {
	color: black;
	font-size: 1rem;
}

.fa-pen:hover {
	color: grey;
}
</style>
