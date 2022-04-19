<template>
	<div>
		<div class="back-btn-container">
			<base-button link to="/favorite-meals"
				>Back to all favorite meals</base-button
			>
		</div>

		<div class="container" v-if="selectedFavoriteMeal">
			<header class="grid-col-span-3 medium-padding-bottom">
				<h2>{{ selectedFavoriteMeal.itemName }}</h2>
				<div class="icons">
					<button class="like-btn" @click="toggleLikeBtn">
						<font-awesome-icon v-if="isLiked" :icon="['fas', 'heart']" />
						<font-awesome-icon v-else :icon="['far', 'heart']" />
					</button>
					<router-link
						:to="'/favorite-meals/' + selectedFavoriteMeal._id + '/edit'"
						class="edit-btn"
					>
						<font-awesome-icon :icon="['fas', 'pen']" />
					</router-link>
					<button class="add-to-upcoming-btn" @click="openModal">
						<font-awesome-icon :icon="['fas', 'plus']" />
					</button>
				</div>
			</header>

			<!-- modal pop up -->
			<dialog class="modal" ref="modal">
				<div class="modal-content-container">
					<button @click="closeModal" class="close-modal-btn">
						<font-awesome-icon :icon="['fas', 'x']" />
					</button>
					<h2>Choose a Day</h2>
					<form method="dialog">
						<label for="day-of-week"></label>
						<select name="day-of-week" id="day-of-week" v-model="dayToSaveTo">
							<option
								v-for="dayOfWeek in daysOfWeek"
								:key="dayOfWeek"
								:value="dayOfWeek"
							>
								{{ dayOfWeek }}
							</option>
						</select>
						<base-button class="save-modal-btn" @click="saveToUpcomingMeals()"
							>Save</base-button
						>
					</form>
				</div>
			</dialog>

			<div class="img-container grid-col-span-3 medium-padding-bottom">
				<img :src="mealImgLink" alt="" />
			</div>
			<ul class="main-ul grid-col-span-3">
				<li class="light-padding-bottom">
					Servings: {{ selectedFavoriteMeal.servings }}
				</li>
				<li class="light-padding-bottom">
					Ready Time(minutes): {{ selectedFavoriteMeal.readyTime }}
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
						<li
							v-for="(
								nutritionFact, key
							) in selectedFavoriteMeal.nutritionFacts"
							:key="nutritionFact"
						>
							<p>{{ ingredientLabels[key].label }}: {{ nutritionFact }}</p>
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
							v-for="ingredient in selectedFavoriteMeal.ingredients"
							:key="ingredient"
						>
							{{ ingredient }}
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
						<li v-for="step in selectedFavoriteMeal.steps" :key="step">
							{{ step }}
						</li>
					</ol>
				</li>
				<li class="light-padding-bottom collapsible-li">
					<button @click="setCollapsible('notes')">
						Notes
						<font-awesome-icon
							v-if="isNotesCollapsed"
							:icon="['fas', 'angle-down']"
						/>
						<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
					</button>
					<ul v-if="!isNotesCollapsed && selectedFavoriteMeal.notes">
						<li v-for="note in selectedFavoriteMeal.notes" :key="note">
							{{ note }}
						</li>
					</ul>
					<p v-else-if="!isNotesCollapsed && !selectedFavoriteMeal.notes">
						No notes yet!
					</p>
				</li>
				<li class="light-padding-bottom">
					<p v-if="selectedFavoriteMeal.recipeUrl">
						Recipe from:
						<a :href="selectedFavoriteMeal.recipeUrl">{{
							selectedFavoriteMeal.recipeUrl
						}}</a>
					</p>
					<p v-else>Recipe created by you</p>
				</li>
			</ul>
			<base-button v-if="!isLiked" @click="removeMeal">Save</base-button>
		</div>
	</div>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	props: ["id"],
	data() {
		return {
			selectedFavoriteMeal: null,
			isLiked: true,
			isNutritionFactsCollapsed: true,
			isIngredientListCollapsed: true,
			isStepsCollapsed: true,
			isNotesCollapsed: true,
			daysOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
			dayToSaveTo: "Mon",
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
	computed: {
		mealImgLink() {
			return this.selectedFavoriteMeal.img === 'sample-logo.jpg' ? require('../../assets/' + this.selectedFavoriteMeal.img) : this.selectedFavoriteMeal.img;
		}
	},
	methods: {
		toggleLikeBtn() {
			this.isLiked = !this.isLiked;
			if (!this.isLiked) {
				// remove the meal from the favorite meals list
			} else if (this.isLiked && !this.containsFavMeal()) {
				// add meal to the favorite meals list
			}
		},
		openModal() {
			const modal = this.$refs.modal;
			modal.showModal();
		},
		closeModal() {
			const modal = this.$refs.modal;
			modal.close();
		},
		containsFavMeal() {
			const favoriteMeals = this.$store.getters["favoriteMeals/favoriteMeals"];
			for (const favoriteMeal of favoriteMeals) {
				if (favoriteMeal.id === this.id) {
					return true;
				}
			}
			return false;
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
		async removeMeal() {
			const res = await FavoriteMealService.delete(this.id);
			console.log(res.data);
			this.$router.replace("/favorite-meals");
		},
		async saveToUpcomingMeals() {
			const mealToSave = {
				...this.selectedFavoriteMeal,
				dayOfWeek: this.dayToSaveTo,
			};
			await UpcomingMealService.add(mealToSave);
		},
	},
	async created() {
		const res = await FavoriteMealService.get(this.id);
		this.selectedFavoriteMeal = res.data;
	},
};
</script>

<style scoped>
.modal {
	max-width: 30rem;
	max-height: 20rem;
	width: 20rem;
	height: 17rem;
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
	font-size: 1.3rem;
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

.container {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	margin: 2rem auto 1rem auto;
	width: min(55%, 50rem);
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.main-ul {
	list-style-type: none;
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
	max-width: 100%;
	max-height: 100%;
}

.container > header {
	display: flex;
	justify-content: space-between;
}

.like-btn {
	border: none;
	background: none;
	font-size: 1.4rem;
	cursor: pointer;
}

.edit-btn {
	align-self: center;
}

.fa-pen {
	color: black;
	font-size: 1.1rem;
}

.back-btn-container {
	margin: 2rem 0 0 1rem;
}

.icons {
	display: flex;
	gap: 1rem;

}

.new-meal-link {
	color: black;
	text-decoration: none;
}
</style>
