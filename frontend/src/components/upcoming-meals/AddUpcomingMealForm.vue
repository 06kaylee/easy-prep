<template>
	<form @submit.prevent="submitForm">
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item" id="item-label">Item Name</label>
			<input type="text" id="item" v-model="itemName" />
		</div>

		<!-- Image selection -->
		<h3>Image</h3>
		<div class="form-control">
			<input
				type="file"
				id="item-image"
				name="item-image"
				accept="image/png, image/jpeg, image/jpg"
				@change="onFileChange"
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
				v-model="nutritionFacts.totalFat"
			/>

			<label for="cholesterol">Cholesterol(mg)</label>
			<input
				type="text"
				id="cholesterol"
				name="cholesterol"
				v-model="nutritionFacts.cholesterol"
			/>

			<label for="sodium">Sodium(mg)</label>
			<input
				type="text"
				id="sodium"
				name="sodium"
				v-model="nutritionFacts.sodium"
			/>

			<label for="total-carbs">Total Carbohydrates(g)</label>
			<input
				type="text"
				id="total-carbs"
				name="total-carbs"
				v-model="nutritionFacts.totalCarbs"
			/>

			<label for="protein">Protein(g)</label>
			<input
				type="text"
				id="protein"
				name="protein"
				v-model="nutritionFacts.protein"
			/>
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div class="form-control ingredients">
			<input type="text" @change="setIngredient" />
			<button>Add ingredient</button>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div class="form-control steps">
			<textarea
				name="steps"
				id="steps"
				@change="setStep"
				cols="30"
				rows="10"
			></textarea>
		</div>

		<!-- Notes -->
		<h3>Notes</h3>
		<div class="form-control">
			<textarea
				name="notes"
				id="notes"
				@change="setNote"
				cols="30"
				rows="10"
			></textarea>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			itemName: "",
			calorieCount: null,
			img: "",
			nutritionFacts: {
				totalFat: "",
				cholesterol: "",
				sodium: "",
				totalCarbs: "",
				protein: "",
			},
			ingredients: [],
			steps: [],
			notes: [],
			userInput: true,
		};
	},
	methods: {
		setIngredient(event) {
			const newIngredient = event.target.value;
			this.ingredients.push(newIngredient);
		},
		setStep(event) {
			const newStep = event.target.value;
			this.steps.push(newStep);
		},
		setNote(event) {
			const newNote = event.target.value;
			this.notes.push(newNote);
		},
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
