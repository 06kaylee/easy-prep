<template>
	<base-card class="upcoming-meal-day-card" :class="isActiveDayClass">
		<h2 id="day-of-week-name">{{ dayOfWeek }}</h2>
	</base-card>
</template>

<script>
export default {
	props: {
		dayOfWeek: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		upcomingMealDetailLink() {
			return this.$route.path + "/" + this.dayOfWeek + "/meals";
		},
		isActiveDayClass() {
			return {
				active: this.isActive,
			};
		},
	},
};
</script>

<style scoped>
.active {
	border: 2px solid purple;
}

div .upcoming-meal-day-card {
	margin: 0;
	max-width: 8rem;
	width: 5rem;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

div .upcoming-meal-day-card:hover {
	opacity: 0.8;
}

.upcoming-meal-detail-link {
	text-decoration: none;
	color: black;
}

#day-of-week-name {
	font-size: 1.3rem;
}
</style>
