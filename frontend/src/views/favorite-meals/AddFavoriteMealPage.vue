<template>
	<div class="add-favorite-meal-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allFavoriteMealsLink"
				>Back to all favorite meals</base-button
			>
		</div>

		<base-card class="add-favorite-meal-form-container">
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
			return "/favorite-meals";
		},
	},
};
</script>

<style scoped>
.add-favorite-meal-form-container {
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
