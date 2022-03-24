<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Upcoming Meals</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
			</header>
			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="card">
				<a href="">
					<h3 class="recipe-name">Pasta</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
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
	padding: 0.5rem 0rem 0 1.5rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.main-container header {
	grid-column: 1 / 4;
	display: flex;
	justify-content: space-between;
}

.card {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 1rem 0.5rem 1rem 0;
	max-width: 12rem;
}

.card a {
	text-decoration: none;
	color: black;
}

.recipe-name {
	text-align: center;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
	display: flex;
	justify-content: center;
	align-content: center;
}

.img-container img {
	max-width: 80%;
	max-height: 80%;
}
</style>
