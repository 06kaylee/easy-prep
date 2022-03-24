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
				<base-card>
					<h2>Mon</h2>
					<div class="breakfast-container">
						<p>Eggs and Bacon</p>
						<p>700 calories</p>
					</div>
					<div class="lunch-container">
						<p>Sandwich</p>
						<p>600 calories</p>
					</div>
					<div class="dinner-container">
						<p>Steak and potatoes</p>
						<p>1000 calories</p>
					</div>
				</base-card>

				<base-card>
					<h2>Tues</h2>
					<div class="breakfast-container">
						<p>Eggs and Bacon</p>
						<p>700 calories</p>
					</div>
					<div class="lunch-container">
						<p>Sandwich</p>
						<p>600 calories</p>
					</div>
					<div class="dinner-container">
						<p>Steak and potatoes</p>
						<p>1000 calories</p>
					</div>
				</base-card>

				<base-card>
					<h2>Wed</h2>
					<div class="breakfast-container">
						<p>Eggs and Bacon</p>
						<p>700 calories</p>
					</div>
					<div class="lunch-container">
						<p>Sandwich</p>
						<p>600 calories</p>
					</div>
					<div class="dinner-container">
						<p>Steak and potatoes</p>
						<p>1000 calories</p>
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

.breakfast-container {
	grid-column: 2 / 3;
	text-align: center;
	padding: 1rem;
	border-right: 2px solid black;
}

.lunch-container {
	grid-column: 3 / 4;
	text-align: center;
	border-right: 2px solid black;
	padding: 1rem;
}

.dinner-container {
	grid-column: 4 / 5;
	text-align: center;
	padding: 1rem;
}

a:hover {
	color: grey;
}
</style>
