<template>
	<div>
		<div class="loading-container" v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<div class="search-result-detail-container" v-else>
			<div class="back-btn-container">
				<base-button @click="backBtn">Back</base-button>
			</div>

			<div class="detail-content-container" v-if="selectedResult">
				<header class="grid-col-span-3 medium-padding-bottom">
					<h2>
						{{ selectedResult.title }}
					</h2>
				</header>

				<!-- modal pop up -->
				<dialog class="modal" ref="modal">
					<div class="modal-content-container">
						<button @click="closeModal" class="close-modal-btn">
							<font-awesome-icon :icon="['fas', 'x']" />
						</button>
						<h2>Where would you like to save?</h2>
						<form method="dialog">
							<div class="form-container">
								<input
									type="radio"
									id="favorite-meals"
									name="meal-selection"
									value="favorite-meals"
									v-model="mealSelection"
								/>
								<label for="favorite-meals">Favorite Meals</label><br />
								<input
									type="radio"
									id="upcoming-meals"
									name="meal-selection"
									value="upcoming-meals"
									v-model="mealSelection"
								/>
								<label for="upcoming-meals">Upcoming Meals</label><br />
							</div>
							<div
								class="form-container"
								v-if="mealSelection === 'upcoming-meals'"
							>
								<label for="day-of-week"></label>
								<select
									name="day-of-week"
									id="day-of-week"
									v-model="dayToSaveTo"
								>
									<option
										v-for="dayOfWeek in daysOfWeek"
										:key="dayOfWeek"
										:value="dayOfWeek"
									>
										{{ dayOfWeek }}
									</option>
								</select>
								<base-button
									class="save-modal-btn"
									@click="saveToUpcomingMeals()"
									>Save</base-button
								>
							</div>
							<div class="form-container" v-else>
								<base-button
									class="save-modal-btn"
									@click="saveToFavoriteMeals()"
									>Save</base-button
								>
							</div>
						</form>
					</div>
				</dialog>

				<!-- TODO edamam api doesn't have servings or steps. and nutrient facts are weird -->
				<div class="img-container grid-col-span-3 medium-padding-bottom">
					<img :src="selectedResult.image" :alt="selectedResult.title" />
				</div>
				<ul class="detail-main-ul grid-col-span-3">
					<li class="light-padding-bottom">
						Servings: {{ selectedResult.servings }}
					</li>
					<li class="light-padding-bottom">
						Ready Time(minutes): {{ selectedResult.readyInMinutes }}
					</li>
					<li class="light-padding-bottom collapsible-li">
						<button @click="setCollapsible('nutrition facts')">
							Nutrition Facts
							<font-awesome-icon
								v-if="isNutritionFactsCollapsed"
								:icon="['fas', 'angle-down']"
							/>
							<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
						</button>
						<ul v-if="!isNutritionFactsCollapsed">
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[0].name }}:
									{{ selectedResult.nutrition.nutrients[0].amount }}
								</p>
							</li>
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[1].name }}:
									{{ selectedResult.nutrition.nutrients[1].amount }}
								</p>
							</li>
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[6].name }}:
									{{ selectedResult.nutrition.nutrients[6].amount }}
								</p>
							</li>
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[3].name }}:
									{{ selectedResult.nutrition.nutrients[3].amount }}
								</p>
							</li>
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[9].name }}:
									{{ selectedResult.nutrition.nutrients[9].amount }}
								</p>
							</li>
							<li>
								<p>
									{{ selectedResult.nutrition.nutrients[7].name }}:
									{{ selectedResult.nutrition.nutrients[7].amount }}
								</p>
							</li>
						</ul>
					</li>
					<li class="light-padding-bottom collapsible-li">
						<button @click="setCollapsible('ingredient list')">
							Ingredient List
							<font-awesome-icon
								v-if="isIngredientListCollapsed"
								:icon="['fas', 'angle-down']"
							/>
							<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
						</button>
						<ul v-if="!isIngredientListCollapsed">
							<li
								v-for="ingredient in selectedResult.extendedIngredients"
								:key="ingredient"
							>
								{{ ingredient.original }}
							</li>
						</ul>
					</li>
					<li class="light-padding-bottom collapsible-li">
						<button @click="setCollapsible('steps')">
							Steps
							<font-awesome-icon
								v-if="isStepsCollapsed"
								:icon="['fas', 'angle-down']"
							/>
							<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
						</button>
						<ol v-if="!isStepsCollapsed">
							<li
								v-for="step in selectedResult.analyzedInstructions[0].steps"
								:key="step"
							>
								{{ step.step }}
							</li>
						</ol>
					</li>
					<li class="light-padding-bottom">
						<p>
							Recipe from:
							<a :href="selectedResult.sourceUrl" class="recipe-url">
								{{ selectedResult.sourceUrl }}
							</a>
						</p>
					</li>
				</ul>
				<base-button @click="openModal">Save</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";
import UpcomingMealService from "../../services/UpcomingMealService";
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
	props: ["slug"],
	data() {
		return {
			selectedResult: null,
			isNutritionFactsCollapsed: true,
			isIngredientListCollapsed: true,
			isStepsCollapsed: true,
			isNotesCollapsed: true,
			daysOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
			dayToSaveTo: "Mon",
			mealSelection: "",
			isLoading: false,
			ingredientLabels: {
				calories: {
					label: "Calories",
				},
				totalFat: {
					label: "Total Fat",
				},
				cholesterol: {
					label: "Cholesterol",
				},
				totalCarbs: {
					label: "Total Carbs",
				},
				protein: {
					label: "Protein",
				},
				sodium: {
					label: "Sodium",
				},
			},
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
		setCollapsible(sectionName) {
			switch (sectionName) {
				case "nutrition facts":
					this.isNutritionFactsCollapsed = !this.isNutritionFactsCollapsed;
					break;
				case "ingredient list":
					this.isIngredientListCollapsed = !this.isIngredientListCollapsed;
					break;
				case "steps":
					this.isStepsCollapsed = !this.isStepsCollapsed;
					break;
				case "notes":
					this.isNotesCollapsed = !this.isNotesCollapsed;
					break;
				default:
					console.log("Error, there is no section to collapse");
			}
		},
		setDayToSaveTo(event) {
			console.log(event);
			this.dayToSaveTo = event.target.value;
		},
		async saveToUpcomingMeals() {
			const ingredients = [];
			const steps = [];
			for (const ingredient of this.selectedResult.nutrition.ingredients) {
				ingredients.push(ingredient.name);
			}
			for (const step of this.selectedResult.analyzedInstructions[0].steps) {
				steps.push(step.step);
			}
			const mealToSave = {
				dayOfWeek: this.dayToSaveTo,
				itemName: this.selectedResult.title,
				img: this.selectedResult.image,
				servings: this.selectedResult.servings,
				readyTime: this.selectedResult.readyInMinutes,
				nutritionFacts: {
					calories: this.selectedResult.nutrition.nutrients[0].amount,
					totalFat: this.selectedResult.nutrition.nutrients[1].amount,
					cholesterol: this.selectedResult.nutrition.nutrients[6].amount,
					sodium: this.selectedResult.nutrition.nutrients[7].amount,
					totalCarbs: this.selectedResult.nutrition.nutrients[3].amount,
					protein: this.selectedResult.nutrition.nutrients[9].amount,
				},
				ingredients: ingredients,
				steps: steps,
				recipeUrl: this.selectedResult.sourceUrl,
			};
			await UpcomingMealService.add(mealToSave);
		},
		async saveToFavoriteMeals() {
			const ingredients = [];
			const steps = [];
			for (const ingredient of this.selectedResult.nutrition.ingredients) {
				ingredients.push(ingredient.name);
			}
			for (const step of this.selectedResult.analyzedInstructions[0].steps) {
				steps.push(step.step);
			}
			const mealToSave = {
				itemName: this.selectedResult.title,
				img: this.selectedResult.image,
				servings: this.selectedResult.servings,
				readyTime: this.selectedResult.readyInMinutes,
				nutritionFacts: {
					calories: this.selectedResult.nutrition.nutrients[0].amount,
					totalFat: this.selectedResult.nutrition.nutrients[1].amount,
					cholesterol: this.selectedResult.nutrition.nutrients[6].amount,
					sodium: this.selectedResult.nutrition.nutrients[7].amount,
					totalCarbs: this.selectedResult.nutrition.nutrients[3].amount,
					protein: this.selectedResult.nutrition.nutrients[9].amount,
				},
				ingredients: ingredients,
				steps: steps,
				recipeUrl: this.selectedResult.sourceUrl,
			};
			await FavoriteMealService.add(mealToSave);
		},
		backBtn() {
			this.$router.back();
		},
		formatId(slug) {
			const urlChunks = slug.split("-");
			let id = urlChunks.at(-1);
			id = "recipe_" + id;
			return id;
		},
	},
	async created() {
		this.isLoading = true;
		const id = this.formatId(this.slug);
		const initalRecipeRes = await SearchService.getInfo(id);
		let url = initalRecipeRes.data.recipe.url;
		url = encodeURIComponent(url);
		const fullRecipeRes = await SearchService.analyzeRecipe(url);
		console.log(fullRecipeRes.data);
		this.selectedResult = fullRecipeRes.data;
		this.isLoading = false;
	},
};
</script>

<style scoped>
.modal {
	max-width: 30rem;
	max-height: 30rem;
	width: 20rem;
	height: 21rem;
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	text-align: center;
	margin: auto;
	border-radius: 1rem;
	animation: fadeIn 1s;
}

.modal-content-container {
	display: grid;
	grid-template-rows: repeat(3, min-content);
	row-gap: 0.5rem;
}

.modal-content-container select {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	height: fit-content;
	justify-self: center;
	font-family: inherit;
}

.modal-content-container > h2,
.modal-content-container > form {
	margin-bottom: 0.5rem;
}

.modal-content-container form {
	display: grid;
}

.modal-content-container form > .form-container:nth-of-type(2) {
	display: grid;
	margin-top: 0.8rem;
}

.save-modal-btn {
	height: fit-content;
	justify-self: center;
	margin-top: 1rem;
}

.close-modal-btn {
	border: none;
	background: transparent;
	color: red;
	justify-self: end;
	cursor: pointer;
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

.add-to-upcoming-btn {
	border: none;
	background: transparent;
	font-family: inherit;
	font-size: inherit;
	font-weight: bold;
	cursor: pointer;
}

.grid-col-span-3 {
	grid-column: span 3;
}

.light-padding-bottom {
	padding-bottom: 1rem;
}

.medium-padding-bottom {
	padding-bottom: 1.5rem;
}

.detail-content-container {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	margin: 2rem auto 1rem auto;
	width: min(55%, 50rem);
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	background: white;
}

.detail-main-ul {
	list-style-type: none;
}

.recipe-url {
	font-size: 0.8rem;
}

ul button {
	border: none;
	background: transparent;
	cursor: pointer;
	font-family: inherit;
	font-size: 1rem;
}

/* 
ol styles for steps
*/
.collapsible-li ol {
	margin-left: 3rem;
}

/* 
ul styles for nutrition facts and ingredient list
*/
.collapsible-li ul {
	margin-left: 2rem;
}

/*
p styles for notes 
*/
.collapsible-li p {
	margin-left: 1rem;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
}

.img-container img {
	border-radius: 1rem;
	max-width: 100%;
	max-height: 100%;
}

.detail-content-container > header {
	display: flex;
	justify-content: space-between;
}

.like-btn {
	border: none;
	background: none;
	font-size: 1.4rem;
	padding-left: 0.5rem;
	cursor: pointer;
}

.fa-pen {
	color: black;
	font-size: 1.1rem;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}

.icons {
	display: inline;
}

.icons > button {
	padding-right: 1.5rem;
}

.loading-container {
	margin-top: 15rem;
}
</style>
