<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Personal Information</h2>
			</header>
			<div class="card-container">
				<base-card>
					<header>
						<h3>Dietary Restrictions</h3>
						<a href="">
							<i class="fa-solid fa-pen"></i>
						</a>
					</header>
					<ul>
						<li>Gluten Free</li>
						<li>Vegan</li>
					</ul>
				</base-card>

				<base-card>
					<header>
						<h3>Dietary Restrictions</h3>
						<a href="">
							<i class="fa-solid fa-pen"></i>
						</a>
					</header>
					<ul>
						<li>Gluten Free</li>
						<li>Vegan</li>
					</ul>
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
	padding: 0.5rem 2rem 0 2rem;
}

.card-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}

.card-container .card {
	margin: 2rem 0;
}

.card-container .card header {
	display: flex;
	justify-content: space-between;
}

.card-container .card ul {
	list-style-type: none;
	padding-top: 1.5rem;
}

.card-container .card li {
	padding-bottom: 1.5rem;
}

.fa-pen {
	color: black;
}

a:hover,
.fa-pen:hover {
	color: grey;
}
</style>
