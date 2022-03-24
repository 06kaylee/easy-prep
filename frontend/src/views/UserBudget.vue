<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Budget</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
			</header>
			<div class="budget-category-container">
				<h3 class="category-title">Groceries</h3>
				<base-card>
					<div class="budget-card-item">
						<p>Target Amount</p>
						<p>$80/week</p>
					</div>
					<div class="budget-card-item">
						<p>Current Total</p>
						<p>$40</p>
					</div>
					<div class="budget-card-item">
						<p>Average Spent</p>
						<p>$77/week</p>
					</div>
					<div class="budget-card-item">
						<p>Most Expensive Ingredients</p>
						<ol>
							<li>Almonds</li>
							<li>Olive Oil</li>
							<li>Eggs</li>
						</ol>
					</div>
				</base-card>
			</div>

			<div class="budget-category-container">
				<h3 class="category-title">Dining Out</h3>
				<base-card>
					<div class="budget-card-item">
						<p>Target Amount</p>
						<p>$80/week</p>
					</div>
					<div class="budget-card-item">
						<p>Current Total</p>
						<p>$40</p>
					</div>
					<div class="budget-card-item">
						<p>Average Spent</p>
						<p>$77/week</p>
					</div>
					<div class="budget-card-item">
						<p>Most Expensive Ingredients</p>
						<ol>
							<li>Almonds</li>
							<li>Olive Oil</li>
							<li>Eggs</li>
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
	grid-template-columns: repeat(4, 1fr);
	margin-bottom: 1rem;
}

.budget-category-container .card {
	margin: 0;
}

.category-title {
	grid-column: 1 / 5;
	padding-bottom: 1rem;
}

.budget-category-container .card {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 2fr;
	grid-template-areas: "target current average most-expensive";
	padding: 1rem;
	grid-column: 1 / 5;
}

.budget-card-item {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 1rem;
	/* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
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
