<template>
	<form @submit.prevent="submitForm">
		<div class="form-control">
			<label for="item" id="item-label">Item</label>
			<input type="text" id="item" v-model="selectedMeal.item" :readonly="selectedMeal.recipeUrl" />
		</div>

		<!--
			if user created recipe: name, image, nutrition facts, ingredient list, steps, notes
			if user got recipe from someone else: notes
		-->
		<h3>Image</h3>
		<div class="form-control">
			<input type="file" id="item-image" name="item-image" accept="image/png, image/jpeg, image/jpg" :readonly="selectedMeal.recipeUrl">
		</div>

		<h3>Nutrition Facts</h3>
		<div class="form-control">
			<label for="total-fat">Total Fat</label>
			<input type="text" id="total-fat" name="total-fat" v-model="selectedMeal.nutritionFacts.totalFat" :readonly="selectedMeal.recipeUrl">

			<label for="cholesterol">Cholesterol</label>
			<input type="text" id="cholesterol" name="cholesterol" v-model="selectedMeal.nutritionFacts.cholesterol" :readonly="selectedMeal.recipeUrl">

			<label for="sodium">Sodium</label>
			<input type="text" id="sodium" name="sodium" v-model="selectedMeal.nutritionFacts.sodium" :readonly="selectedMeal.recipeUrl">

			<label for="total-carbs">Total Carbohydrates</label>
			<input type="text" id="total-carbs" name="total-carbs" v-model="selectedMeal.nutritionFacts.totalCarbs" :readonly="selectedMeal.recipeUrl">

			<label for="protein">Protein</label>
			<input type="text" id="protein" name="protein" v-model="selectedMeal.nutritionFacts.protein" :readonly="selectedMeal.recipeUrl">
		</div>

		<h3>Ingredients</h3>
		<div class="form-control">
			<input type="text" v-for="ingredient in selectedMeal.ingredients" :key="ingredient" :value="ingredient" :readonly="selectedMeal.recipeUrl">
		</div>

		<h3>Steps</h3>
		<div class="form-control">
			<textarea v-for="step in selectedMeal.steps" :key="step" :value="step" :readonly="selectedMeal.recipeUrl"></textarea>
		</div>

		<h3 v-if="selectedMeal.notes">Notes</h3>
		<div class="form-control" v-if="selectedMeal.notes">
			<textarea v-for="note in selectedMeal.notes" :key="note" :value="note"></textarea>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			selectedMeal: null,
		};
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	methods: {
		submitForm() {
			this.$router.replace("/upcoming-meals");
		},
	},
	created() {
		const { dayOfWeek } = this.$route.params;
		const allMealsForWeek = this.$store.getters["upcomingMeals/upcomingMeals"];
		const mealsForDay = allMealsForWeek.find(
			(meals) => meals.dayOfWeek === dayOfWeek
		).meals;
		this.selectedMeal = mealsForDay.find((meal) => meal.id === this.id);
	},
};
</script>

<style scoped>
form {
	padding-top: 0.6rem;
}

#item-label,
#start-date-label,
#end-date-label {
	display: block;
	font-weight: bold;
	padding-bottom: 0.3rem;
}

h3 {
	font-size: 1rem;
	padding-bottom: 0.3rem;
}

.form-control {
	margin-bottom: 1rem;
}

.form-control:nth-of-type(2) label {
	padding: 0 1.5rem 0 0.3rem;
}

.form-control:nth-of-type(3) {
	display: grid;
	grid-template-areas:
		"start end"
		"start-date end-date";
	column-gap: 2rem;
}

#start-date-label {
	grid-area: start;
}

#end-date-label {
	grid-area: end;
}

#start-date {
	grid-area: start-date;
}

#end-date {
	grid-area: end-date;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
}
</style>
