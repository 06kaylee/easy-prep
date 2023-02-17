<template>
	<div>
		<form class="auto-generate-form" @submit.prevent="submitForm">
			<!-- How many days you want to generate for -->
			<h3>Days to Generate For</h3>
			<div class="form-control days-selection-container">
				<div v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek">
					<input
						type="button"
						:value="dayOfWeek"
						@click="toggleActive(dayOfWeek)"
						:class="{ 'active-btn': isActive[dayOfWeek] }"
					/>

					<!-- if the user chooses to customize the number of meals for each day -->
					<input
						type="number"
						v-if="isActive[dayOfWeek] && numMealsChoice === 'customize'"
						id="num-meals-custom"
						name="num-meals-custom"
						min="1"
						max="10"
						v-model="numMealsCustom[dayOfWeek]"
					/>
				</div>
			</div>

			{{ isActive }}
			<br />
			{{ numMeals }}
			<br />
			{{ numMealsCustom }}
			<!-- choose if all meals will be the same number of meals or if there's a custom amount -->
			<h3>Number of Meals Per Day</h3>
			<div class="form-control num-meals-per-day-container">
				<label for="same-num-meals">
					<input
						type="radio"
						id="same-num-meals"
						name="num-of-meals"
						value="same"
						v-model="numMealsChoice"
					/>
					All the same number of meals
				</label>

				<label for="customize-num-meals">
					<input
						type="radio"
						id="customize-num-meals"
						name="num-of-meals"
						value="customize"
						v-model="numMealsChoice"
					/>
					Customize
				</label>
			</div>

			<!-- if user wants all the chosen days to have the same number of meals -->
			<div
				class="form-control"
				v-if="numMealsChoice === 'same' && !isActiveEmpty"
			>
				<label for="num-meals"></label>
				<input
					type="number"
					id="num-meals"
					name="num-meals"
					min="1"
					:max="maxNumMeals"
					@change="setNumMeals($event)"
				/>
			</div>

			<!-- generation type -->
			<h3>Generation method</h3>
			<div class="form-control generation-method-container">
				<label for="random-generation">
					<input
						type="radio"
						id="random-generation"
						name="generation-method"
						value="random"
						v-model="generationMethod"
					/>
					Random
				</label>

				<label for="customize-generation">
					<input
						type="radio"
						id="customize-generation"
						name="generation-method"
						value="customize"
						v-model="generationMethod"
					/>
					Customize
				</label>
			</div>

			<div
				class="form-control meals-for-generation-container"
				v-if="generationMethod === 'random'"
			>
				<label for="repeat">
					<input
						type="radio"
						id="repeat"
						name="meals-for-generation"
						value="repeat"
						v-model="mealsForGenerationMethod"
					/>
					Repeat meals
				</label>

				<label for="unique">
					<input
						type="radio"
						id="unique"
						name="meals-for-generation"
						value="unique"
						v-model="mealsForGenerationMethod"
					/>
					Only unique meals
				</label>
			</div>

			<div class="btn-container">
				<base-button class="generate-btn" v-if="generationMethod === 'random'"
					>Generate</base-button
				>
				<base-button v-else>Customize</base-button>
			</div>
		</form>

		<!-- TODO fix styling, fix saving by recipe id -->
		<base-modal v-show="modalVisible" @close="closeModal">
			<template v-slot:icons>
				<font-awesome-icon
					class="randomize-btn"
					@click="getRecipes"
					:icon="['fas', 'rotate-left']"
				/>
			</template>
			<template v-slot:body>
				<div class="modal-loading-container" v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<div class="modal-content" v-else>
					<h3 v-if="currentMeal">{{ currentMeal.day }}</h3>
					<auto-generate-recipe-item
						class="modal-auto-generate-card"
						v-if="currentMeal"
						:day="currentMeal.day"
						:recipeName="currentMeal.itemName"
						:img="currentMeal.img"
					></auto-generate-recipe-item>
					<font-awesome-icon
						class="modal-next-btn"
						@click="nextMeal"
						:icon="['fas', 'angle-right']"
					/>
				</div>
				<div class="save-btn-container">
					<base-button @click="saveRecipes">Save</base-button>
				</div>
			</template>
		</base-modal>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";
import UpcomingMealService from "../../services/UpcomingMealService";
import FavoriteMealService from "../../services/FavoriteMealService";
import AutoGenerateRecipeItem from "../auto-generate/AutoGenerateRecipeItem.vue";

export default {
	components: {
		AutoGenerateRecipeItem,
	},
	data() {
		return {
			daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			numMealsChoice: null,
			numMeals: {},
			numMealsCustom: {},
			maxNumMeals: 1,
			generationMethod: null,
			mealsForGenerationMethod: null,
			favoriteMeals: null,
			recipeResults: null,
			currentMeal: null,
			currentIndex: 0,
			isLoading: false,
			modalVisible: false,
			isActive: {},
		};
	},
	watch: {
		isActive: {
			handler() {
				// reset num meals to 1
				this.numMeals = {};

				// TODO tell users the number of favorite meals they have and if the number they choose for each day goes over total, warn them

				this.maxNumMeals = Math.floor(
					this.favoriteMeals.length / Object.keys(this.isActive).length
				);
			},
			deep: true,
		},
	},
	computed: {
		isActiveEmpty() {
			return Object.keys(this.isActive).length === 0;
		},
		numMealsObj() {
			return this.numMealsChoice === "same"
				? this.numMeals
				: this.numMealsCustom;
		},
	},
	methods: {
		openModal() {
			this.modalVisible = true;
		},
		closeModal() {
			this.modalVisible = false;
		},
		nextMeal() {
			if (this.currentIndex + 1 === this.recipeResults.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex += 1;
			}
			this.currentMeal = this.recipeResults[this.currentIndex];
		},
		toggleActive(day) {
			// if isActive already has the day key in it, remove it first because false values shouldn't be kept
			if (Object.prototype.hasOwnProperty.call(this.isActive, day)) {
				delete this.isActive[day];
			} else {
				this.isActive[day] = true;
			}
		},
		setNumMeals(event) {
			for (const day in this.isActive) {
				this.numMeals[day] = event.target.value;
			}
		},
		setNumMealsCustom(event) {
			for (const day in this.isActive) {
				this.numMealsCustom[day] = event.target.value;
			}
		},
		getRandomIndex(obj) {
			const keys = Object.keys(obj);
			return keys[Math.floor(Math.random() * keys.length)];
		},
		getUniqueMeals(numMeals) {
			const uniqueMeals = [];
			const favoriteMealsCopy = { ...this.favoriteMeals };
			for (const [day, value] of Object.entries(numMeals)) {
				for (let i = value; i > 0; i--) {
					let randomIndex = this.getRandomIndex(favoriteMealsCopy);
					let randomRecipe = favoriteMealsCopy[randomIndex];
					randomRecipe.day = day;
					delete favoriteMealsCopy[randomIndex];
					uniqueMeals.push(randomRecipe);
				}
			}
			return uniqueMeals;
		},
		getRecipes(numMeals) {
			let meals = [];
			if (this.mealsForGenerationMethod === "unique") {
				meals = this.getUniqueMeals(numMeals);
			}
			this.recipeResults = meals;
			this.currentMeal = this.recipeResults[0];
		},
		customizeGenerationSetup(numMealsChoice) {
			// if num meals choice is customize, set meals to custom meals
			const numMeals =
				numMealsChoice === "customize" ? this.numMealsCustom : this.numMeals;
			this.$store.dispatch("customizeGeneration/setNumMeals", numMeals);
			this.$store.dispatch("customizeGeneration/setDaysPicked", this.isActive);
			this.$router.push("/upcoming-meals/auto-generate/customize");
		},
		formatToUpcomingMeal(recipe, dayOfWeek) {
			const ingredients = [];
			const steps = [];
			for (const ingredient of recipe.nutrition.ingredients) {
				ingredients.push(ingredient.name);
			}
			for (const step of recipe.analyzedInstructions[0].steps) {
				steps.push(step.step);
			}
			const mealToSave = {
				dayOfWeek,
				itemName: recipe.title,
				img: recipe.image,
				servings: recipe.servings,
				readyTime: recipe.readyInMinutes,
				nutritionFacts: {
					calories: recipe.nutrition.nutrients[0].amount,
					totalFat: recipe.nutrition.nutrients[1].amount,
					cholesterol: recipe.nutrition.nutrients[6].amount,
					sodium: recipe.nutrition.nutrients[7].amount,
					totalCarbs: recipe.nutrition.nutrients[3].amount,
					protein: recipe.nutrition.nutrients[9].amount,
				},
				ingredients: ingredients,
				steps: steps,
				recipeUrl: recipe.sourceUrl,
			};

			return mealToSave;
		},
		async saveRecipes() {
			this.isLoading = true;
			// create days of week array
			const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			// iterate over each recipe in recipe results
			for (const [index, recipe] of Object.entries(this.recipeResults)) {
				// get info for recipe by id
				const res = await SearchService.getInfo(recipe.id);
				const recipeInfo = res.data;
				console.log(recipeInfo);
				const mealToSave = this.formatToUpcomingMeal(
					recipeInfo,
					daysOfWeek[index]
				);
				await UpcomingMealService.add(mealToSave);
			}
			this.isLoading = false;
			this.$router.push("/upcoming-meals");
		},
		async submitForm() {
			if (this.generationMethod === "customize") {
				this.customizeGenerationSetup(this.numMealsChoice);
			} else {
				this.getRecipes(this.numMealsObj);
				this.openModal();
			}
		},
	},
	async created() {
		// get all favorite meals
		const res = await FavoriteMealService.getAll();

		this.favoriteMeals = res.data;
	},
};
</script>

<style scoped>
.modal {
	max-width: 30rem;
	max-height: 30rem;
	width: 29rem;
	height: 24rem;
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	text-align: center;
	margin: auto;
	border-radius: 1rem;
	animation: fadeIn 1s;
	background: white;
}

.modal-content-container {
	display: grid;
	grid-template-columns: 1fr auto;
}

.modal-content {
	display: flex;
	grid-column: 1 / 3;
	justify-content: center;
	gap: 0.5rem;
}

.modal-loading-container {
	grid-column: 1 / 3;
	margin-top: 5rem;
	margin-bottom: 2rem;
}

.modal .btn-container {
	margin-top: 1rem;
	display: flex;
	justify-content: space-evenly;
}

.modal-icons {
	grid-column: 2 / 3;
	display: flex;
	gap: 1rem;
}

.modal-icons svg,
.modal-icons button {
	font-size: 1.2rem;
}

.randomize-btn {
	cursor: pointer;
}

.modal-auto-generate-card {
	justify-self: center;
}

.save-modal-btn {
	height: fit-content;
	justify-self: center;
	margin-top: 1rem;
}

.modal-next-btn {
	align-self: center;
	justify-self: center;
	height: fit-content;
	cursor: pointer;
	width: 1rem;
}

.close-modal-btn {
	border: none;
	background: transparent;
	color: red;
	justify-self: end;
	cursor: pointer;
	grid-column: 2 / 3;
}

.modal::backdrop {
	background: rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

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
.icons {
	display: flex;
	gap: 1rem;
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
.btn-container {
	text-align: center;
}
.days-selection-container {
	display: flex;
	gap: 0.5rem;
}
.num-meals-per-day-container,
.generation-method-container,
.meals-for-generation-container {
	display: flex;
	gap: 2rem;
}
.active-btn {
	background-color: #94618e !important;
	color: white;
	border: 1px solid #94618e !important;
}
.days-selection-container input[type="button"] {
	background-color: #f8eee7;
	border-radius: 0.3rem;
	padding: 0.6rem;
	font-family: inherit;
	width: 4rem;
	border: 1px solid #d6ccc5;
}
#num-meals-custom {
	width: 4rem;
}
</style>
