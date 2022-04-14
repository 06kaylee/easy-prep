<template>
	<router-link :to="upcomingMealDetailLink">
		<base-card>
			<h2>{{ dayOfWeek }}</h2>
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
div .card {
	margin: 0;
	max-width: 30rem;
	width: 16rem;
	height: 13rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

div .card a {
	text-decoration: none;
	color: black;
}

div .card h2 {
	font-size: 1.6rem;
}

div .card:hover {
	opacity: 0.8;
}
</style>
