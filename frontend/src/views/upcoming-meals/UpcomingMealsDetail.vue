<template>
	<base-card class="main-container">
		<h2>{{ upcomingMeal.dayOfWeek }}</h2>
		<base-button link to="/upcoming-meals" class="all-meals-btn"
			>Back</base-button
		>
		<base-button link :to="addMealLink" class="add-meal-btn"
			>Add a meal</base-button
		>

		<div class="meal-container" v-if="currentMeal">
			<base-card>
				<div class="icons">
					<router-link :to="editMealLink">
						<font-awesome-icon :icon="['fas', 'pen']" />
					</router-link>
					<font-awesome-icon :icon="['fas', 'x']" />
				</div>

				<h3>{{ currentMeal.item }}</h3>

				<div class="img-container">
					<!-- {{ mealImgLink }}
					<img :src="require('../../assets/' + mealImgLink)" alt="" /> -->
					<img :src="mealImgLink" alt="" />
				</div>

				<div class="collapsible-container">
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
							v-for="nutritionFact in currentMeal.nutritionFacts"
							:key="nutritionFact"
						>
							{{ nutritionFact }}
						</li>
					</ul>
				</div>

				<div class="collapsible-container">
					<button @click="setCollapsible('ingredient list')">
						Ingredient List
						<font-awesome-icon
							v-if="isIngredientListCollapsed"
							:icon="['fas', 'angle-down']"
						/>
						<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
					</button>
					<ul v-if="!isIngredientListCollapsed">
						<li v-for="ingredient in currentMeal.ingredients" :key="ingredient">
							{{ ingredient }}
						</li>
					</ul>
				</div>

				<div class="collapsible-container">
					<button @click="setCollapsible('steps')">
						Steps
						<font-awesome-icon
							v-if="isStepsCollapsed"
							:icon="['fas', 'angle-down']"
						/>
						<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
					</button>
					<ol v-if="!isStepsCollapsed">
						<li v-for="step in currentMeal.steps" :key="step">
							{{ step }}
						</li>
					</ol>
				</div>

				<div class="collapsible-container">
					<button @click="setCollapsible('notes')">
						Notes
						<font-awesome-icon
							v-if="isNotesCollapsed"
							:icon="['fas', 'angle-down']"
						/>
						<font-awesome-icon v-else :icon="['fas', 'angle-up']" />
					</button>
					<ul v-if="!isNotesCollapsed && currentMeal.notes">
						<li v-for="note in currentMeal.notes" :key="note">
							{{ note }}
						</li>
					</ul>
					<p v-else-if="!isNotesCollapsed && !currentMeal.notes">
						No notes yet!
					</p>
				</div>

				<div class="created-by-container">
					<p v-if="currentMeal.recipeUrl">
						Recipe from:
						<a :href="currentMeal.recipeUrl">{{ currentMeal.recipeUrl }}</a>
					</p>
					<p v-else>Recipe created by you</p>
				</div>
			</base-card>
			<base-button @click="nextMeal()">Next meal</base-button>
		</div>
		<p v-else>You don't have any meals planned!</p>
	</base-card>
</template>

<script>
export default {
	props: ["dayOfWeek"],
	data() {
		return {
			upcomingMeal: null,
			meals: null,
			currentMeal: null,
			currentIndex: 0,
			isNutritionFactsCollapsed: true,
			isIngredientListCollapsed: true,
			isStepsCollapsed: true,
			isNotesCollapsed: true,
		};
	},
	methods: {
		nextMeal() {
			this.isNutritionFactsCollapsed = true;
			this.isIngredientListCollapsed = true;
			this.isStepsCollapsed = true;
			this.isNotesCollapsed = true;

			if (this.currentIndex + 1 === this.meals.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex += 1;
			}
			this.currentMeal = this.meals[this.currentIndex];
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
	},
	computed: {
		mealImgLink() {
			return this.currentMeal.img.src;
		},
		editMealLink() {
			return this.$route.path + "/edit/" + this.currentMeal.id;
		},
		addMealLink() {
			return this.$route.path + "/add";
		},
	},
	created() {
		this.upcomingMeal = this.$store.getters["upcomingMeals/upcomingMeals"].find(
			(upcomingMeal) => upcomingMeal.dayOfWeek === this.dayOfWeek
		);
		this.meals = this.upcomingMeal.meals;
		if (this.meals.length !== 0) {
			this.currentMeal = this.meals[0];
		}
	},
};
</script>

<style scoped>
#app .main-container {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	margin: 2rem auto 1rem auto;
	max-width: 70rem;
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
}

.meal-container .card {
	max-width: 100%;
	width: 100%;
	height: fit-content;
	display: grid;
}

.all-meals-btn {
	width: fit-content;
	height: fit-content;
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	justify-self: start;
}

.add-meal-btn {
	grid-column: 3 / 4;
	grid-row: 1 / 2;
	justify-self: end;
}

.main-container h2 {
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	text-align: center;
}

.meal-container {
	grid-column: 2 / 4;
	grid-row: 2 / 3;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.meal-container > button {
	justify-self: center;
	align-self: center;
}

.icons {
	display: flex;
	justify-content: space-between;
}

.fa-x {
	justify-self: end;
	color: red;
	opacity: 0.5;
}

.fa-x:hover {
	opacity: 1;
	transition: 0.4s;
}

.fa-pen {
	color: black;
}

.main-container .card h3 {
	text-align: center;
}

.img-container {
	max-width: 100%;
	max-height: 100%;
}

.img-container img {
	width: 50%;
	display: block;
	margin: auto;
}

.created-by-container p {
	font-size: 0.85rem;
}

.collapsible-container {
	padding-bottom: 0.5rem;
}

.collapsible-container > button {
	border: none;
	background-color: white;
	cursor: pointer;
	font-family: inherit;
}

/* 
ol styles for steps
*/
.collapsible-container ol {
	margin-left: 3rem;
	counter-reset: steps;
}

/* 
ul styles for nutrition facts and ingredient list
*/
.collapsible-container ul {
	margin-left: 2rem;
}

/*
p styles for notes 
*/
.collapsible-container p {
	margin-left: 1rem;
}
</style>
