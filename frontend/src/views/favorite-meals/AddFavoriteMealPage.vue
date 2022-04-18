<template>
	<div class>
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allFavoriteMealsLink"
				>Back to all favorite meals</base-button
			>
		</div>

		<base-card>
			<h2>Add a Favorite Meal</h2>
			<add-favorite-meal-form></add-favorite-meal-form>
		</base-card>
	</div>
</template>

<script>
import AddFavoriteMealForm from "../../components/favorite-meals/AddFavoriteMealForm.vue";

export default {
	components: {
		AddFavoriteMealForm,
	},
    computed: {
        allFavoriteMealsLink() {
            return '/favorite-meals';
        }
    }
};
</script>

<style scoped>
.back-btn {
	height: fit-content;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}
</style>
