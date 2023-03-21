<template>
	<div>
		<base-button @click="openImportModal">
			Import recipe from a website
		</base-button>
		<base-modal
			v-if="importModalOpen"
			@close="closeImportModal"
			class="importModal"
		>
			<template v-slot:header>
				<h2>Paste the URL of the recipe you would like to import</h2>
			</template>
			<template v-slot:body>
				<form @submit.prevent="submitImportModal">
					<input type="text" v-model="recipeUrl" placeholder="URL" />
					<div>
						<base-button>Submit</base-button>
					</div>
				</form>
			</template>
		</base-modal>
		<base-modal
			v-if="nutritionModalOpen"
			@close="closeNutritionModal"
			class="nutritionModal"
		>
			<template v-slot:header>
				<h2>Guess the nutrition info</h2>
			</template>
			<template v-slot:body>
				<div class="nutritionModal_content">
					<p>
						Make sure the name, ingredients, and servings are filled out before
						clicking submit!
					</p>
					<div>
						<base-button @click="submitNutritionModal">Submit</base-button>
					</div>
				</div>
			</template>
		</base-modal>
		<form
			class="add-favorite-meal-form"
			@submit.prevent="submitForm"
			enctype="multipart/form-data"
		>
			<!-- Name of the item -->
			<div class="form-control">
				<label for="item" id="item-name-label">Item Name</label>
				<input type="text" id="item-name" v-model="itemName" />
			</div>

			<!-- Image selection -->
			<h3>Image</h3>
			<div class="form-control">
				<p v-if="importedRecipeResults && img">{{ this.img }}</p>
				<input
					type="file"
					id="img"
					name="img"
					accept="image/*"
					@change="onFileChange($event)"
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

			<!-- Servings -->
			<h3>Servings</h3>
			<div class="form-control">
				<input type="number" id="servings" name="servings" v-model="servings" />
			</div>

			<!-- Ready Time -->
			<h3>Ready Time(minutes)</h3>
			<div class="form-control">
				<input
					type="number"
					id="ready-time"
					name="ready-time"
					v-model="readyTime"
				/>
			</div>

			<h3>Rating</h3>
			<div class="form-control">
				<span v-for="index in 5" :key="index">
					<favorite-meal-item-rating
						@star-clicked="setRange"
						:clicked="isStarIncluded(index)"
						:index="index"
					></favorite-meal-item-rating>
				</span>
			</div>

			<h3>Label</h3>
			<div class="form-control">
				<label for="beginner">
					<input
						type="radio"
						id="beginner"
						name="beginner"
						value="Beginner"
						v-model="label"
					/>
					Beginner
				</label>

				<label for="intermediate">
					<input
						type="radio"
						id="intermediate"
						name="intermediate"
						value="Intermediate"
						v-model="label"
					/>
					Intermediate
				</label>

				<label for="advanced">
					<input
						type="radio"
						id="advanced"
						name="advanced"
						value="Advanced"
						v-model="label"
					/>
					Advanced
				</label>
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
			<div
				class="form-control steps"
				v-for="(step, index) in steps"
				:key="index"
			>
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

			<!-- Nutrition Facts -->
			<h3 v-if="importedRecipeResults">Nutrition Facts</h3>
			<div v-else class="nutrition-header">
				<h3>Nutrition Facts</h3>
				<font-awesome-icon
					@click="openNutritionModal"
					:icon="['fas', 'question']"
				/>
			</div>
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
					v-model="nutritionFacts.fat"
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
					v-model="nutritionFacts.carbohydrates"
				/>

				<label for="protein">Protein(g)</label>
				<input
					type="text"
					id="protein"
					name="protein"
					v-model="nutritionFacts.protein"
				/>
			</div>

			<!-- Notes -->
			<h3>Notes</h3>
			<div
				class="form-control notes"
				v-for="(note, index) in notes"
				:key="index"
			>
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
	</div>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import FavoriteMealItemRating from "./FavoriteMealItemRating.vue";

export default {
	components: {
		FavoriteMealItemRating,
	},
	data() {
		return {
			itemName: "",
			img: null,
			mealType: "",
			servings: null,
			readyTime: null,
			label: "beginner",
			nutritionFacts: {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			},
			ingredients: [""],
			steps: [""],
			notes: [""],
			userInput: true,
			starRange: [],
			importModalOpen: false,
			recipeUrl: "",
			importedRecipeResults: null,
			analyzedRecipeResults: null,
			nutritionModalOpen: false,
		};
	},
	methods: {
		openImportModal() {
			this.importModalOpen = true;
		},
		closeImportModal() {
			this.importModalOpen = false;
		},
		openNutritionModal() {
			this.nutritionModalOpen = true;
		},
		closeNutritionModal() {
			this.nutritionModalOpen = false;
		},
		async submitNutritionModal() {
			const recipe = {
				title: this.itemName,
				servings: this.servings,
				ingredients: this.ingredients,
				instructions: this.steps,
			};
			const res = await FavoriteMealService.analyzeRecipe(recipe);
			this.analyzedRecipeResults = res.data;
			this.setAnalyzedNutrition();
			this.closeNutritionModal();
		},
		async submitImportModal() {
			const res = await FavoriteMealService.extractRecipe(this.recipeUrl);
			this.importedRecipeResults = res.data;
			if (this.importedRecipeResultsSet) {
				this.setVariablesWithImported();
			}
			this.closeImportModal();
		},
		addField(fieldType) {
			console.log(fieldType);
			fieldType.push("");
		},
		removeField(index, fieldType) {
			console.log(index);
			fieldType.splice(index, 1);
			console.log(fieldType);
		},
		onFileChange(event) {
			console.log(event);
			this.img = event.target.files[0];
			console.log(this.img);
		},
		setRange(index) {
			this.starRange = [];
			for (let i = 1; i <= index; i++) {
				this.starRange.push(i);
			}
		},
		isStarIncluded(index) {
			return this.starRange.includes(index);
		},
		async submitForm() {
			console.log(this.img);
			const formData = new FormData();
			formData.append("itemName", this.itemName);
			formData.append("img", this.img);
			formData.append("mealType", this.mealType);
			formData.append("servings", this.servings);
			formData.append("readyTime", this.readyTime);
			formData.append("rating", JSON.stringify(this.starRange));
			formData.append("label", this.label);
			formData.append("nutritionFacts", JSON.stringify(this.nutritionFacts));
			formData.append("ingredients", JSON.stringify(this.ingredients));
			formData.append("steps", JSON.stringify(this.steps));

			if (this.notes.length !== 0) {
				formData.append("notes", JSON.stringify(this.notes));
			}

			formData.append("userInput", this.userInput);
			// console.log(this.nutritionFacts);
			// console.log(FavoriteMealService);
			// const newMeal = {
			// 	itemName: this.itemName,
			// 	img: this.img,
			// 	mealType: this.mealType,
			// 	servings: this.servings,
			// 	readyTime: this.readyTime,
			// 	rating: this.starRange,
			// 	label: this.label,
			// 	nutritionFacts: this.nutritionFacts,
			// 	ingredients: this.ingredients,
			// 	steps: this.steps,
			// 	notes: this.notes,
			// 	userInput: this.userInput,
			// };
			// console.log(newMeal);
			const res = await FavoriteMealService.add(formData);
			console.log(res.data);
			this.$router.replace("/favorite-meals");
		},
		setAnalyzedNutrition() {
			this.nutritionFacts = this.setNutritionFacts("analyzed");
		},
		setVariablesWithImported() {
			this.itemName = this.importedRecipeResults.title;
			this.servings = this.importedRecipeResults.servings;
			this.readyTime = this.importedRecipeResults.readyInMinutes;
			this.ingredients = this.setImportedIngredients();
			this.steps = this.setImportedSteps();
			this.nutritionFacts = this.setNutritionFacts("imported");
			this.img = this.importedRecipeResults.image;
		},
		setImportedIngredients() {
			const importedIngredients = [];
			for (const ingredient of this.importedRecipeResults.extendedIngredients) {
				console.log(ingredient);
				if (ingredient.original !== "") {
					importedIngredients.push(ingredient.original);
				}
			}
			return importedIngredients;
		},
		setImportedSteps() {
			const importedSteps = [];
			for (const instruction of this.importedRecipeResults
				.analyzedInstructions[0].steps) {
				console.log(instruction);
				if (instruction.step !== "") {
					importedSteps.push(instruction.step);
				}
			}
			return importedSteps;
		},
		setNutritionFacts(type) {
			const nutritionFacts = {
				calories: "",
				fat: "",
				cholesterol: "",
				sodium: "",
				carbohydrates: "",
				protein: "",
			};
			const results =
				type === "imported"
					? this.importedRecipeResults
					: this.analyzedRecipeResults;

			for (const fact of results.nutrition.nutrients) {
				let lowercaseLabel;
				if (this.capitalizedNutritionLabels.includes(fact.name)) {
					lowercaseLabel = this.lowercaseNutritionLabel(fact.name);
					nutritionFacts[lowercaseLabel] = Math.round(fact.amount);
				}
			}
			return nutritionFacts;
		},
		lowercaseNutritionLabel(label) {
			return label[0].toLowerCase() + label.slice(1);
		},
	},
	computed: {
		importedRecipeResultsSet() {
			return (
				this.importedRecipeResults &&
				Object.keys(this.importedRecipeResults).length !== 0
			);
		},
		capitalizedNutritionLabels() {
			const keys = Object.keys(this.nutritionFacts);
			return keys.map((key) => key[0].toUpperCase() + key.slice(1));
		},
	},
};
</script>

<style lang="scss" scoped>
.add-favorite-meal-form {
	padding: 1rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	margin-bottom: 0.5rem;
}

.form-control {
	margin-bottom: 1rem;
}

#item-name-label {
	display: block;
	font-weight: bold;
	padding-bottom: 0.3rem;
}

.nutrition-facts {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.ingredients,
.steps,
.notes {
	display: grid;
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

.importModal {
	form {
		display: grid;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;
	}
}

.nutritionModal {
	&_content {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
		justify-content: center;
	}
}

.nutrition-header {
	display: flex;
	align-items: center;
	gap: 1rem;

	svg {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}
}
</style>
