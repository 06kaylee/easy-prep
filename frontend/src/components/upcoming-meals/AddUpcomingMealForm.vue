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
		<div class="form-control ingredients" v-for="(ingredient, index) in ingredients" :key="index">
			<input type="text" v-model="ingredients[index]" />
			<a @click="addField(ingredients)">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, ingredients)">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div class="form-control steps" v-for="(step, index) in steps" :key="index">
			<textarea
				v-model="steps[index]"
				cols="10"
				rows="5"
			></textarea>
			<a @click="addField(steps)">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, steps)">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Notes -->
		<h3>Notes</h3>
		<div class="form-control notes" v-for="(note, index) in notes" :key="index">
			<textarea
				v-model="notes[index]"
				cols="30"
				rows="10"
			></textarea>
			<a @click="addField(notes)">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, notes)">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</a>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			itemName: "",
			img: "",
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
			console.log(fieldType);
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
			console.log(fieldType);
		},
		submitForm() {
			const dayOfWeek = this.$route.params.dayOfWeek;
			const newMeal = {
				id: '19',
				item: this.itemName,
				img: require('../../assets/' + 'sample-logo.jpg'),
				nutritionFacts: this.nutritionFacts,
				ingredients: this.ingredients,
				steps: this.steps,
				notes: this.notes,
				userInput: this.userInput
			}

			this.$store.dispatch('upcomingMeals/addMeal', { dayOfWeek, newMeal });
			this.$router.replace(`/upcoming-meals/${dayOfWeek}/meals`);
		}
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
	grid-template-columns: repeat(3, auto);
}

.ingredients {
	grid-template-columns: repeat(3, auto);
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

.ingredients input,
textarea {
	width: 11rem;
}

textarea {
	margin-bottom: 0.5rem;
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

a:hover {
	cursor: pointer;
}
</style>
