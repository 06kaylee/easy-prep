<template>
	<div class="add-favorite-meal-container">
		<h2>Add a Favorite Meal</h2>

		<base-card class="add-favorite-meal-form-container">
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
.add-favorite-meal-container {
	margin: auto;
	padding: 3rem;
}

div .add-favorite-meal-form-container {
	max-width: 40rem;
	width: 40rem;
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
</style>
