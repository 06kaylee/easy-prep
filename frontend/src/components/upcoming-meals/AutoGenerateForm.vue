<template>
	<div>
		<form class="auto-generate-form" @submit.prevent="submitForm">
		<!-- how many meals -->
		<h3>Number of Meals</h3>
		<div class="form-control">
			<label for="num-meals"></label>
			<input
				type="number"
				id="num-meals"
				name="num-meals"
				min="1"
				max="7"
				v-model="numMeals"
			/>
		</div>

		<!-- what cuisines: american, chinese, french, german, greek, indian, italian, japanese, mediterranean, mexican, thai -->
		<h3>Cuisines</h3>
		<div class="form-control">
			<div
				class="cuisine-container"
				v-for="cuisine in cuisineOptions"
				:key="cuisine"
			>
				<input
					type="checkbox"
					:id="cuisine"
					:name="cuisine"
					:value="cuisine"
					v-model="cuisines"
				/>
				<label :for="cuisine">{{ cuisine }}</label
				><br />
			</div>
		</div>

		<!-- diets: gluten free, ketogenic, vegetarian, vegan, pescetarian, paleo -->
		<h3>Diets</h3>
		<div class="form-control">
			<div class="diet-container" v-for="diet in dietOptions" :key="diet">
				<input
					type="checkbox"
					:id="diet"
					:name="diet"
					:value="diet"
					v-model="diets"
				/>
				<label :for="diet">{{ diet }}</label
				><br />
			</div>
		</div>

		<!-- allergies: dairy, egg, gluten, grain, peanut, seafood -->
		<h3>Allergies</h3>
		<div class="form-control">
			<div
				class="allergy-container"
				v-for="allergy in allergyOptions"
				:key="allergy"
			>
				<input
					type="checkbox"
					:id="allergy"
					:name="allergy"
					:value="allergy"
					v-model="allergies"
				/>
				<label :for="allergy">{{ allergy }}</label
				><br />
			</div>
		</div>

		<!-- dislikes -->
		<h3>Dislikes</h3>
		<div
			class="form-control dislikes"
			v-for="(dislike, index) in dislikes"
			:key="index"
		>
			<input type="text" class="dislike-container" v-model="dislikes[index]" />
			<div class="icons">
				<a
					@click="addField(dislikes)"
					@keyup.enter="addField(dislikes)"
					tabindex="0"
				>
					<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
				</a>
				<a
					@click="removeField(index, dislikes)"
					@keyup.enter="removeField(index, dislikes)"
					tabindex="0"
				>
					<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
				</a>
			</div>
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div
			class="form-control ingredients"
			v-for="(ingredient, index) in ingredients"
			:key="index"
		>
			<input
				type="text"
				class="ingredient-container"
				v-model="ingredients[index]"
			/>
			<div class="icons">
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
		</div>

		<!-- max ready time -->
		<h3>Max Ready Time (minutes)</h3>
		<div class="form-control">
			<label for="max-ready-time"></label>
			<input
				type="number"
				id="max-ready-time"
				name="max-ready-time"
				min="1"
				max="600"
				v-model="maxReadyTime"
			/>
		</div>

		<div class="btn-container">
			<base-button class="generate-btn">Generate</base-button>
		</div>
		</form>

		<!-- modal asking to remove meals -->
		<dialog class="modal" ref="modal">
		<div class="modal-content-container">
			<div class="modal-icons">
				<font-awesome-icon class="randomize-btn" @click="getRecipes" :icon="['fas', 'rotate-left']" />
				<button @click="closeModal" class="close-modal-btn">
					<font-awesome-icon :icon="['fas', 'x']" />
				</button>
			</div>

			<div class="modal-loading-container" v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<div class="modal-content" v-else>
				<auto-generate-recipe-item class="modal-auto-generate-card" v-if="currentMeal" :recipeName="currentMeal.title" :img="currentMeal.image"></auto-generate-recipe-item>
				<font-awesome-icon class="modal-next-btn" @click="nextMeal" :icon="['fas', 'angle-right']" />
			</div>
			
			<div class="btn-container">
				<base-button @click="saveRecipes">Save</base-button>
			</div>
		</div>
		</dialog>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";
import UpcomingMealService from "../../services/UpcomingMealService";
import AutoGenerateRecipeItem from "../../components/upcoming-meals/AutoGenerateRecipeItem.vue";

export default {
	components: {
		AutoGenerateRecipeItem
	},
	data() {
		return {
			cuisineOptions: [
				"american",
				"chinese",
				"french",
				"german",
				"greek",
				"indian",
				"italian",
				"japanese",
				"mediterranean",
				"mexican",
				"thai",
			],
			dietOptions: [
				"gluten free",
				"ketogenic",
				"vegetarian",
				"vegan",
				"pescetarian",
				"paleo",
			],
			allergyOptions: ["dairy", "egg", "gluten", "grain", "peanut", "seafood"],
			numMeals: 1,
			cuisines: [],
			diets: [],
			allergies: [],
			dislikes: [""],
			ingredients: [""],
			maxReadyTime: 20,
			recipeResults: null,
			currentMeal: null,
			currentIndex: 0,
			isLoading: false
		};
	},
	methods: {
		openModal() {
			const modal = this.$refs.modal;
			modal.showModal();
		},
		closeModal() {
			const modal = this.$refs.modal;
			modal.close();
		},
		nextMeal() {
			if (this.currentIndex + 1 === this.recipeResults.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex += 1;
			}
			this.currentMeal = this.recipeResults[this.currentIndex];
		},
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
		formatField(field) {
			let str = "";
			if (field.length > 1) {
				str += field.join(",+");
			} else {
				str += field[0];
			}
			return str;
		},
		async getRecipes() {
			const cuisinesFormat = this.formatField(this.cuisines);
			const dietsFormat = this.formatField(this.diets);
			const allergiesFormat = this.formatField(this.allergies);
			const dislikesFormat = this.formatField(this.dislikes);
			const ingredientsFormat = this.formatField(this.ingredients);
			const res = await SearchService.getAuto(
				this.numMeals,
				cuisinesFormat,
				dietsFormat,
				allergiesFormat,
				dislikesFormat,
				ingredientsFormat,
				this.maxReadyTime
			);
			this.recipeResults = res.data.results;
			if(this.recipeResults.length > 0) {
				this.currentMeal = this.recipeResults[0];
			}
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
			const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
			// iterate over each recipe in recipe results
			for(const [index, recipe] of Object.entries(this.recipeResults)) {
				// get info for recipe by id
				const res = await SearchService.getInfo(recipe.id);
				const recipeInfo = res.data;
				console.log(recipeInfo);
				const mealToSave = this.formatToUpcomingMeal(recipeInfo, daysOfWeek[index]);
				await UpcomingMealService.add(mealToSave);
			}
			this.isLoading = false;
			this.$router.push('/upcoming-meals');
		},
		async submitForm() {
			this.getRecipes();
			this.openModal();
		},
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
.dislikes,
.ingredients {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1rem;
}
.icons {
	display: flex;
	gap: 1rem;
}
#num-meals,
.cuisine-container,
.diet-container,
.allergy-container,
.dislike-container,
.ingredient-container,
#max-ready-time {
	margin-left: 1rem;
}
.cuisine-container label,
.diet-container label,
.allergy-container label {
	padding-left: 0.5rem;
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
a {
	display: block;
	width: fit-content;
	height: fit-content;
	cursor: pointer;
}
</style>