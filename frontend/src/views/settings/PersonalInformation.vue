<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Personal Information</h2>
				<a href="">
					<font-awesome-icon :icon="['fas', 'pen']" />
				</a>
			</header>
			<div class="card-container">
				<base-card v-for="restriction in restrictions" :key="restriction.category">
					<header>
						<h3>{{ restriction.category }}</h3>
						<a href="">
							<i class="fa-solid fa-pen"></i>
						</a>
					</header>
					<ul>
						<li v-for="restrictionItem in restriction.restrictionItems" :key="restrictionItem">
							{{ restrictionItem }}
						</li>
					</ul>
				</base-card>
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";

export default {
	components: {
		DashboardLayout,
	},
	computed: {
		restrictions() {
			return this.$store.getters['personalInfo/restrictions'];
		}
	}
};
</script>

<style scoped>
.main-container {
	padding: 0.5rem 2rem 0 2rem;
}

.main-container header {
	display: flex;
	justify-content: space-between;
}

.fa-pen {
	color: black;
}

.card-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}

@media screen and (max-width: 65rem) {
	.card-container {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (max-width: 45rem) {
	.card-container {
		grid-template-columns: 1fr;
	}
}

.card-container .card {
	max-width: 15rem;
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
