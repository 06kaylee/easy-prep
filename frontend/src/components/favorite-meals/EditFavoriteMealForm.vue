<template>
	<form class="edit-favorite-meal-form" @submit.prevent="submitForm" v-if="selectedMeal">
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item-name" id="item-name-label">Item Name</label>
			<input
				type="text"
				id="item-name"
				v-model="selectedMeal.itemName"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Image -->
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
			/>
		</div>

		<!-- servings -->
		<div class="form-control">
			<label for="servings" id="servings-label">Servings</label>
			<input
				type="number"
				id="servings"
				v-model="selectedMeal.servings"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- ready time -->
		<div class="form-control">
			<label for="ready-time" id="ready-time-label">Ready Time(minutes)</label>
			<input
				type="number"
				id="ready-time"
				v-model="selectedMeal.readyTime"
				:readonly="selectedMeal.recipeUrl"
			/>
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
				:readonly="selectedMeal.recipeUrl"
			/>

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
		<div
			class="form-control ingredients"
			v-for="(ingredient, index) in selectedMeal.ingredients"
			:key="index"
		>
			<input
				type="text"
				v-model="selectedMeal.ingredients[index]"
				:readonly="selectedMeal.recipeUrl"
			/>
			<a
				@click="addField(selectedMeal.ingredients)"
				@keyup.enter="addField(selectedMeal.ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.ingredients)"
				@keyup.enter="removeField(index, selectedMeal.ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div
			class="form-control steps"
			v-for="(step, index) in selectedMeal.steps"
			:key="index"
		>
			<textarea
				v-model="selectedMeal.steps[index]"
				cols="10"
				rows="5"
				:readonly="selectedMeal.recipeUrl"
			></textarea>
			<a
				@click="addField(selectedMeal.steps)"
				@keyup.enter="addField(selectedMeal.steps)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.steps)"
				@keyup.enter="removeField(index, selectedMeal.steps)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Notes -->
		<div v-if="selectedMeal.notes.length === 0" class="form-control notes">
			<h3 class="notes-heading">Notes</h3>
			<a
				@click="addField(selectedMeal.notes)"
				@keyup.enter="addField(selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
		</div>
		<h3 v-else>Notes</h3>
		<div
			class="form-control notes"
			v-for="(note, index) in selectedMeal.notes"
			:key="index"
		>
			<textarea
				v-model="selectedMeal.notes[index]"
				cols="30"
				rows="10"
			></textarea>
			<a
				@click="addField(selectedMeal.notes)"
				@keyup.enter="addField(selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.notes)"
				@keyup.enter="removeField(index, selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";

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
		async submitForm() {
			const res = await FavoriteMealService.edit(this.id, this.selectedMeal);
			console.log(res.data);
			this.$router.replace(`/favorite-meals/${this.id}`);
		},
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
	},
	async created() {
		const res = await FavoriteMealService.get(this.id);
		this.selectedMeal = res.data;
	},
};
</script>

<style scoped>
.edit-favorite-meal-form {
	padding-top: 0.6rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	margin-bottom: 0.5rem;
}

#item-name-label,
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

.notes {
	display: flex;
}

.notes-heading {
	margin-right: 0.5rem;
}

.ingredients input,
textarea {
	width: 11rem;
}

textarea {
	margin-bottom: 0.5rem;
}

.add-btn {
	color: #70a86d;
}

.add-btn:hover {
	color: #8ed48a;
	transition: 0.5s;
}

.remove-btn {
	color: #fa0000;
}

.remove-btn:hover {
	color: #fc8181;
	transition: 0.5s;
}

a {
	display: block;
	width: fit-content;
	height: fit-content;
}
</style>
