<template>
	<div class="add-meal-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allMealsLink"
				>Back to all meals</base-button
			>
		</div>

		<base-card>
			<h2>Add an Upcoming Meal</h2>
			<add-upcoming-meal-form></add-upcoming-meal-form>
		</base-card>
	</div>
</template>

<script>
import AddUpcomingMealForm from "../../components/upcoming-meals/AddUpcomingMealForm.vue";

export default {
	components: {
		AddUpcomingMealForm,
	},
	data() {
		return {
			dayOfWeek: this.$route.params.dayOfWeek,
		};
	},
	computed: {
		allMealsLink() {
			return `/upcoming-meals/${this.dayOfWeek}/meals`;
		},
	},
};
</script>

<style scoped>
.add-meal-container .card {
	background: white;
}
.back-btn {
	height: fit-content;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}
</style>
