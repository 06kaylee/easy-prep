<template>
	<div class="edit-favorite-meal-container">
		<h2>Edit a Favorite Meal</h2>
		<base-card class="edit-favorite-meal-form-container">
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
.edit-favorite-meal-container {
	margin: auto;
	padding: 3rem;
}

div .edit-favorite-meal-form-container {
	background: white;
	max-height: 45rem;
	max-width: 40rem;
	width: 40rem;
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
