<template>
	<router-link class="upcoming-meal-detail-link" :to="upcomingMealDetailLink">
		<base-card class="upcoming-meal-day-card">
			<h2 id="day-of-week-name">{{ dayOfWeek }}</h2>
		</base-card>
	</router-link>
</template>

<script>
export default {
	props: {
		dayOfWeek: {
			type: String,
			required: true,
		},
	},
	computed: {
		upcomingMealDetailLink() {
			return this.$route.path + "/" + this.dayOfWeek + "/meals";
		},
	},
};
</script>

<style scoped>
div .upcoming-meal-day-card {
	margin: 0;
	max-width: 30rem;
	width: 16rem;
	height: 13rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

div .upcoming-meal-day-card:hover {
	opacity: 0.8;
}

.upcoming-meal-detail-link {
	text-decoration: none;
	color: black;
}

#day-of-week-name {
	font-size: 1.6rem;
}
</style>
