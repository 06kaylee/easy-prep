<template>
	<form class="add-upcoming-meal-form" @submit.prevent="submitForm">
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item" id="item-name-label">Item Name</label>
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

		<h3>Meal Type</h3>
		<div class="form-control">
			<label for="breakfast">
				<input
					type="radio"
					id="breakfast"
					name="breakfast"
					value="breakfast"
					v-model="mealType"
				/>
				Breakfast
			</label>

			<label for="lunch">
				<input
					type="radio"
					id="lunch"
					name="lunch"
					value="lunch"
					v-model="mealType"
				/>
				Lunch
			</label>

			<label for="dinner">
				<input
					type="radio"
					id="dinner"
					name="dinner"
					value="dinner"
					v-model="mealType"
				/>
				Dinner
			</label>
		</div>

		<!-- servings -->
		<div class="form-control">
			<label for="servings" id="servings-label">Servings</label>
			<input type="number" id="servings" v-model="servings" />
		</div>

		<!-- ready time -->
		<div class="form-control">
			<label for="ready-time" id="ready-time-label">Ready Time(minutes)</label>
			<input type="number" id="ready-time" v-model="readyTime" />
		</div>

		<!-- Nutrition Facts -->
		<h3>Nutrition Facts</h3>
		<div class="form-control nutrition-facts">
			<label for="calories">Calories</label>
			<input
				type="text"
				id="calories"
				name="calories"
				v-model="nutritionFacts.calories"
			/>

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
		<div
			class="form-control ingredients"
			v-for="(ingredient, index) in ingredients"
			:key="index"
		>
			<input type="text" v-model="ingredients[index]" />
			<a
				@click="addField(ingredients)"
				@keyup.enter="addField(ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, ingredients)"
				@keyup.enter="removeField(index, ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div class="form-control steps" v-for="(step, index) in steps" :key="index">
			<textarea v-model="steps[index]" cols="10" rows="5"></textarea>
			<a @click="addField(steps)" @keyup.enter="addField(steps)" tabindex="0">
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, steps)"
				@keyup.enter="removeField(index, steps)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Notes -->
		<h3>Notes</h3>
		<div class="form-control notes" v-for="(note, index) in notes" :key="index">
			<textarea v-model="notes[index]" cols="30" rows="10"></textarea>
			<a @click="addField(notes)" @keyup.enter="addField(notes)" tabindex="0">
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, notes)"
				@keyup.enter="removeField(index, notes)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
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
			itemName: "",
			img: "",
			mealType: "",
			servings: null,
			readyTime: null,
			nutritionFacts: {
				calories: "",
				totalFat: "",
				cholesterol: "",
				sodium: "",
				totalCarbs: "",
				protein: "",
			},
			ingredients: [""],
			steps: [""],
			notes: [""],
			userInput: true,
		};
	},
	methods: {
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
		onFileChange(event) {
			const files = event.target.files || event.dataTransfer.files;
			if (!files.length) return;
			this.createImage(files[0]);
		},
		createImage(file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				this.img = event.target.result;
			};
			reader.readAsDataURL(file);
		},
		async submitForm() {
			const dayOfWeek = this.$route.params.dayOfWeek;
			const newImg = new Image();
			newImg.src = this.img;
			const newMeal = {
				dayOfWeek: dayOfWeek,
				itemName: this.itemName,
				img: "blah",
				mealType: this.mealType,
				servings: this.servings,
				readyTime: this.readyTime,
				nutritionFacts: this.nutritionFacts,
				ingredients: this.ingredients,
				steps: this.steps,
				notes: this.notes,
				userInput: this.userInput,
			};
			const res = await UpcomingMealService.add(newMeal);
			console.log(res.data);
			this.$router.replace(`/upcoming-meals/${dayOfWeek}/meals`);
		},
	},
};
</script>

<style scoped>
.add-upcoming-meal-form {
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

.ingredients {
	grid-template-columns: repeat(3, auto);
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
	cursor: pointer;
}
</style>
