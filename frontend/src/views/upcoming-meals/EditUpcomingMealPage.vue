<template>
	<base-card>
		<h2>Edit an Upcoming Meal</h2>
		<edit-upcoming-meal-form :id="id"></edit-upcoming-meal-form>
	</base-card>
</template>

<script>
import EditUpcomingMealForm from "../../components/upcoming-meals/EditUpcomingMealForm.vue";

export default {
	components: {
		EditUpcomingMealForm,
	},
	props: ["id"],
};
</script>
