<template>
	<div class="edit-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allMealsLink"
				>Back to all meals</base-button
			>
		</div>

		<base-card>
			<h2>Edit an Upcoming Meal</h2>
			<edit-upcoming-meal-form :id="id"></edit-upcoming-meal-form>
		</base-card>
	</div>
</template>

<script>
import EditUpcomingMealForm from "../../components/upcoming-meals/EditUpcomingMealForm.vue";

export default {
	components: {
		EditUpcomingMealForm,
	},
	props: ["id"],
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
.edit-container > .card {
	background: white;
}
.back-btn {
	height: fit-content;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}
</style>
