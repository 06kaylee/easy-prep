<template>
	<div class="edit-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allFavoriteMealsLink"
				>Back</base-button
			>
		</div>

		<base-card>
			<h2>Edit a Favorite Meal</h2>
			<edit-favorite-meal-form :id="id"></edit-favorite-meal-form>
		</base-card>
	</div>
</template>

<script>
import EditFavoriteMealForm from "../../components/favorite-meals/EditFavoriteMealForm.vue";

export default {
	components: {
		EditFavoriteMealForm,
	},
	data() {
		return {
			id: this.$route.params.id,
		};
	},
	computed: {
		allFavoriteMealsLink() {
			return `/favorite-meals/${this.id}`;
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
