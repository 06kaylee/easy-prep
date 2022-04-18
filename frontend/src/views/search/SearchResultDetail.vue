<template>
	<div>
		<div class="back-btn-container">
			<base-button link :to="'/search/results?q=' + this.$route.query.q"
				>Back to all search results</base-button
			>
		</div>

		<div class="container" v-if="selectedResult">
			<header class="grid-col-span-3 medium-padding-bottom">
				<h2>
					{{ selectedResult.title }}
				</h2>
				<button class="add-to-upcoming-btn" @click="openModal">
					Add to upcoming meals
					<font-awesome-icon :icon="['fas', 'plus']" />
				</button>
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
				<img :src="selectedResult.image" :alt="selectedResult.title" />
			</div>
			<ul class="main-ul grid-col-span-3">
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
							v-for="ingredient in selectedResult.nutrition.ingredients"
							:key="ingredient"
						>
							{{ ingredient.name }}
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
						<a :href="selectedResult.sourceUrl">
							{{ selectedResult.sourceUrl }}
						</a>
					</p>
				</li>
			</ul>
			<base-button v-if="!isLiked" @click="removeMeal">Save</base-button>
		</div>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	props: ["id"],
	data() {
		return {
			selectedResult: null,
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
			const mealToSave = {
				...this.selectedResult,
				dayOfWeek: this.dayToSaveTo,
			};
			await UpcomingMealService.add(mealToSave);
		},
	},
	async created() {
		const res = await SearchService.getInfo(this.id);
		// this.selectedResult = res.data.results;
		this.selectedResult = res.data;
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

.new-meal-link {
	color: black;
	text-decoration: none;
}
</style>
