<template>
	<form @submit.prevent="submitForm" v-if="selectedMeal">
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item" id="item-label">Item Name</label>
			<input
				type="text"
				id="item"
				v-model="selectedMeal.itemName"
				:readonly="recipeUrlExists"
			/>
		</div>

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
			/>
		</div>

		<!-- servings -->
		<div class="form-control">
			<label for="servings" id="servings-label">Servings</label>
			<input type="number" id="servings" v-model="selectedMeal.servings" :readonly="recipeUrlExists" />
		</div>

		<!-- ready time -->
		<div class="form-control">
			<label for="ready-time" id="ready-time-label">Ready Time</label>
			<input type="number" id="ready-time" v-model="selectedMeal.readyTime" :readonly="recipeUrlExists" />
		</div>

		<!-- Nutrition Facts -->
		<h3>Nutrition Facts</h3>
		<div class="form-control nutrition-facts">
			<label for="calories">Calories</label>
			<input
				type="text"
				id="calories"
				name="calories"
				v-model="selectedMeal.nutritionFacts.calories"
				:readonly="recipeUrlExists"
			/>

			<label for="total-fat">Total Fat(g)</label>
			<input
				type="text"
				id="total-fat"
				name="total-fat"
				v-model="selectedMeal.nutritionFacts.totalFat"
				:readonly="recipeUrlExists"
			/>

			<label for="cholesterol">Cholesterol(mg)</label>
			<input
				type="text"
				id="cholesterol"
				name="cholesterol"
				v-model="selectedMeal.nutritionFacts.cholesterol"
				:readonly="recipeUrlExists"
			/>

			<label for="sodium">Sodium(mg)</label>
			<input
				type="text"
				id="sodium"
				name="sodium"
				v-model="selectedMeal.nutritionFacts.sodium"
				:readonly="recipeUrlExists"
			/>

			<label for="total-carbs">Total Carbohydrates(g)</label>
			<input
				type="text"
				id="total-carbs"
				name="total-carbs"
				v-model="selectedMeal.nutritionFacts.totalCarbs"
				:readonly="recipeUrlExists"
			/>

			<label for="protein">Protein(g)</label>
			<input
				type="text"
				id="protein"
				name="protein"
				v-model="selectedMeal.nutritionFacts.protein"
				:readonly="recipeUrlExists"
			/>
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div
			class="form-control ingredients"
			v-for="(ingredient, index) in selectedMeal.ingredients"
			:key="index"
		>
			<input type="text" v-model="selectedMeal.ingredients[index]" :readonly="selectedMeal.recipeUrl" />
			<a @click="addField(selectedMeal.ingredients)" @keyup.enter="addField(selectedMeal.ingredients)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, selectedMeal.ingredients)" @keyup.enter="removeField(index, selectedMeal.ingredients)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div class="form-control steps" v-for="(step, index) in selectedMeal.steps" :key="index">
			<textarea v-model="selectedMeal.steps[index]" cols="10" rows="5" :readonly="selectedMeal.recipeUrl"></textarea>
			<a @click="addField(selectedMeal.steps)" @keyup.enter="addField(selectedMeal.steps)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, selectedMeal.steps)" @keyup.enter="removeField(index, selectedMeal.steps)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Notes -->
		<h3 v-if="selectedMeal.notes">Notes</h3>
		<div class="form-control notes" v-for="(note, index) in selectedMeal.notes" :key="index">
			<textarea v-model="selectedMeal.notes[index]" cols="30" rows="10"></textarea>
			<a @click="addField(selectedMeal.notes)" @keyup.enter="addField(selectedMeal.notes)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, selectedMeal.notes)" @keyup.enter="removeField(index, selectedMeal.notes)" tabindex="0">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	data() {
		return {
			selectedMeal: null,
			imageOption: "",
			recipeUrlExists: true
		};
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	methods: {
		async submitForm() {
			await UpcomingMealService.edit(this.id, this.selectedMeal);
			const allMealsLink = `/upcoming-meals/${this.$route.params.dayOfWeek}/meals`;
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
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
	},
	async created() {
		const { dayOfWeek } = this.$route.params;
		// get all upcoming meals for mon-sun
		const res = await UpcomingMealService.getAllForDay(dayOfWeek);
		const allMealsForDay = res.data;

		// find the meal that the user wanted to edit
		this.selectedMeal = allMealsForDay.find((meal) => meal._id === this.id);
		if(this.selectedMeal.recipeUrl === null || this.selectedMeal.recipeUrl === undefined) {
			this.recipeUrlExists = false;
		}
		console.log(this.selectedMeal.itemName);
	},
};
</script>

<style scoped>
form {
	padding-top: 0.6rem;
}

#item-label,
#servings-label,
#ready-time-label {
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
	grid-template-columns: repeat(3, auto);
}


.ingredients input,
textarea {
	width: 11rem;
}

a .fa-plus {
	color: #70a86d;
}

a .fa-plus:hover {
	color: #8ed48a;
	transition: 0.5s;
}

a .fa-minus {
	color: #fa0000;
}

a .fa-minus:hover {
	color: #fc8181;
	transition: 0.5s;
}

a {
	display: block;
	width: fit-content;
	height: fit-content;
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
