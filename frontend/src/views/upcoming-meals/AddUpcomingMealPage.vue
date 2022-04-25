<template>
	<div class="add-upcoming-meal-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allMealsLink"
				>Back to all meals</base-button
			>
		</div>

		<base-card class="add-upcoming-meal-form-container">
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
.add-upcoming-meal-form-container {
	background: white;
	max-height: 45rem;
	overflow: auto;
}

::-webkit-scrollbar {
    width: 1.2em;
}

::-webkit-scrollbar-track {
    background: white;
	border-radius: 100vh;
	margin-block: 0.4em;
}

::-webkit-scrollbar-thumb {
    background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}

@supports (scrollbar-color: #c7c4c4 white) {
	* {
		scrollbar-color: #c7c4c4 white;
	}
}

.back-btn {
	height: fit-content;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}
</style>
