<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Goals</h2>
				<h4>
					<a href="" class="new-goal">
						Add a new goal
						<font-awesome-icon :icon="['fas', 'plus']" />
					</a>
				</h4>
			</header>
			<base-card>
				<h2 class="goal-title">Lose 10 pounds</h2>
				<div class="icons">
					<a href="">
						<font-awesome-icon :icon="['fas', 'pen']" />
					</a>
					<a href="">
						<font-awesome-icon :icon="['fas', 'trash']" />
					</a>
				</div>
				<h4 class="goal-started-date">Started 10 months ago</h4>
			</base-card>
			<base-card>
				<h2 class="goal-title">Lose 10 pounds</h2>
				<div class="icons">
					<a href="">
						<font-awesome-icon :icon="['fas', 'pen']" />
					</a>
					<a href="">
						<font-awesome-icon :icon="['fas', 'trash']" />
					</a>
				</div>
				<h4 class="goal-started-date">Started 10 months ago</h4>
			</base-card>
			<base-card>
				<h2 class="goal-title">Lose 10 pounds</h2>
				<div class="icons">
					<a href="">
						<font-awesome-icon :icon="['fas', 'pen']" />
					</a>
					<a href="">
						<font-awesome-icon :icon="['fas', 'trash']" />
					</a>
				</div>
				<h4 class="goal-started-date">Started 10 months ago</h4>
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
.main-container {
	padding-left: 2rem;
	display: grid;
	grid-auto-rows: min-content;
	padding: 1rem 2rem 2rem 2rem;
	row-gap: 2rem;
}

.main-container header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	height: min-content;
}

.main-container header i {
	padding-left: 0.5rem;
}

.main-container .card {
	margin: 0;
}

.new-goal {
	text-decoration: none;
	color: black;
}

.main-container .card {
	width: 40rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

@media screen and (min-width: 70rem) {
	.main-container .card {
		max-width: 50rem;
		width: 30rem;
	}
}

@media screen and (min-width: 80rem) {
	.main-container .card {
		max-width: 50rem;
		width: 50rem;
	}
}

.goal-title {
	grid-column: 1 / 4;
}

.icons {
	grid-column: 4 / 5;
	display: flex;
	justify-content: flex-end;
}

.icons a {
	padding: 0.8rem 1rem 0.5rem 1rem;
	color: black;
}

.goal-started-date {
	grid-column: 1 / 5;
	grid-row: 2 / 3;
	text-indent: 1rem;
	font-size: 0.8rem;
}

a:hover {
	color: grey;
}
</style>
