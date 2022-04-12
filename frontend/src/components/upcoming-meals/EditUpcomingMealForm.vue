<template>
	<form @submit.prevent="submitForm">
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item" id="item-label">Item Name</label>
			<input
				type="text"
				id="item"
				v-model="selectedMeal.item"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Image selection -->
		<h3 v-if="selectedMeal.userInput">Image</h3>
		<div class="form-control" v-if="selectedMeal.userInput">
			<input
				type="radio"
				id="keep"
				name="img-choice"
				v-model="imageOption"
				value="keep"
			/>
			<label for="keep">Keep the same image</label>

			<input
				type="radio"
				id="change"
				name="img-choice"
				v-model="imageOption"
				value="change"
			/>
			<label for="change">Change the image</label>
		</div>

		<div
			class="form-control-optional"
			v-if="imageOption === 'change' && selectedMeal.userInput"
		>
			<input
				type="file"
				id="item-image"
				name="item-image"
				accept="image/png, image/jpeg, image/jpg"
				@change="onFileChange"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Nutrition Facts -->
		<h3>Nutrition Facts</h3>
		<div class="form-control nutrition-facts">
			<label for="total-fat">Total Fat(g)</label>
			<input
				type="text"
				id="total-fat"
				name="total-fat"
				v-model="selectedMeal.nutritionFacts.totalFat"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="cholesterol">Cholesterol(mg)</label>
			<input
				type="text"
				id="cholesterol"
				name="cholesterol"
				v-model="selectedMeal.nutritionFacts.cholesterol"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="sodium">Sodium(mg)</label>
			<input
				type="text"
				id="sodium"
				name="sodium"
				v-model="selectedMeal.nutritionFacts.sodium"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="total-carbs">Total Carbohydrates(g)</label>
			<input
				type="text"
				id="total-carbs"
				name="total-carbs"
				v-model="selectedMeal.nutritionFacts.totalCarbs"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="protein">Protein(g)</label>
			<input
				type="text"
				id="protein"
				name="protein"
				v-model="selectedMeal.nutritionFacts.protein"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div class="form-control ingredients">
			<input
				type="text"
				v-for="ingredient in selectedMeal.ingredients"
				:key="ingredient"
				:value="ingredient"
				@change="setIngredient($event, ingredient)"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div class="form-control steps">
			<textarea
				v-for="step in selectedMeal.steps"
				:key="step"
				:value="step"
				@change="setStep($event, step)"
				:readonly="selectedMeal.recipeUrl"
			></textarea>
		</div>

		<!-- Notes -->
		<h3 v-if="selectedMeal.notes">Notes</h3>
		<div class="form-control notes" v-if="selectedMeal.notes">
			<textarea
				v-for="note in selectedMeal.notes"
				:key="note"
				:value="note"
				@change="setNote($event, note)"
			></textarea>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			selectedMeal: null,
			imageOption: "",
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
			console.log(this.selectedMeal);
			const allMealsLink = `/upcoming-meals/${this.$route.params.dayOfWeek}`;
			this.$router.replace(allMealsLink);
		},
		onFileChange(event) {
			const files = event.target.files || event.dataTransfer.files;
			console.log(files);
			if (!files.length) return;
			this.createImage(files[0]);
		},
		createImage(file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				this.selectedMeal.img = event.target.result;
			};
			reader.readAsDataURL(file);
		},
		setIngredient(event, ingredient) {
			const oldIndex = this.selectedMeal.ingredients.indexOf(ingredient);
			this.selectedMeal.ingredients.splice(oldIndex, 1, event.target.value);
		},
		setStep(event, step) {
			const oldIndex = this.selectedMeal.steps.indexOf(step);
			this.selectedMeal.steps.splice(oldIndex, 1, event.target.value);
		},
		setNote(event, note) {
			const oldIndex = this.selectedMeal.notes.indexOf(note);
			this.selectedMeal.notes.splice(oldIndex, 1, event.target.value);
		},
	},
	created() {
		const { dayOfWeek } = this.$route.params;

		// get all upcoming meals for mon-sun
		const allMealsForWeek = this.$store.getters["upcomingMeals/upcomingMeals"];

		// get just the meals for the day selected
		const mealsForDay = allMealsForWeek.find(
			(meals) => meals.dayOfWeek === dayOfWeek
		).meals;

		// find the meal that the user wanted to edit
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

.nutrition-facts {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.nutrition-facts input {
	justify-self: center;
}

.ingredients,
.steps,
.notes {
	display: grid;
}

.form-control:nth-of-type(2) label {
	padding: 0 1.5rem 0 0.3rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	margin-bottom: 0.5rem;
}

textarea {
	margin-bottom: 0.5rem;
}
</style>
