<template>
	<form class="auto-generate-form" @submit.prevent="submitForm">
		<!-- how many meals -->
        <h3>Number of Meals</h3>
		<div class="form-control">
            <input type="text">
		</div>

		<!-- what cuisines -->
		<h3>Cuisines</h3>
		<div class="form-control">
			<input type="text">
		</div>

		<!-- diets -->
        <h3>Diets</h3>
		<div class="form-control">
			<!-- <label for="servings" id="servings-label">Servings</label>
			<input type="number" id="servings" v-model="servings" /> -->
            <input type="text">
		</div>

		<!-- allergies and dislikes -->
        <h3>Allergies and Dislikes</h3>
		<div class="form-control">
			<input type="text">
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div class="form-control ingredients">
			<input type="text" />
			<a @click="addField(ingredients)" @keyup.enter="addField(ingredients)" tabindex="0">
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a @click="removeField(index, ingredients)" @keyup.enter="removeField(index, ingredients)" tabindex="0">
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- meal types -->
		<h3>Meal Type</h3>
		<div class="form-control steps" v-for="(step, index) in steps" :key="index">
			<input type="text">
		</div>

		<!-- max ready time -->
		<h3>Max Ready Time</h3>
		<div class="form-control notes" v-for="(note, index) in notes" :key="index">
			<input type="text">
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
				img: 'blah',
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
.auto-generate-form {
	padding-top: 0.6rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	margin-bottom: 0.5rem;
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
