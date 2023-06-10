<template>
	<div class="addFavoriteMealForm">
		<base-button @click="openImportModal">
			Import recipe from a website
		</base-button>

		<FavoriteMealImportModal
			v-if="importModalOpen"
			@close="closeImportModal"
			@form-submitted="setImportedData"
		/>

		<FavoriteMealNutritionModal
			v-if="nutritionModalOpen"
			@close="closeNutritionModal"
			@form-submitted="setAnalyzedNutrition"
			:itemName="itemName"
			:ingredients="ingredients"
			:steps="steps"
			:servings="servings"
		/>

		<form @submit.prevent="submitForm" enctype="multipart/form-data">
			<!-- Name of the item -->
			<h3>Item Name</h3>
			<div class="addFavoriteMealForm_container">
				<input type="text" id="item-name" v-model="itemName" />
			</div>

			<!-- Recipe source -->
			<h3>Recipe Source</h3>
			<div class="addFavoriteMealForm_container">
				<label for="recipeUrl">
					<input
						type="radio"
						id="recipeUrl"
						name="recipeUrl"
						value="recipeUrl"
						v-model="recipeSrc"
					/>
					Recipe URL
				</label>

				<label for="userRecipe">
					<input
						type="radio"
						id="userRecipe"
						name="userRecipe"
						value="userRecipe"
						v-model="recipeSrc"
					/>
					My own recipe
				</label>
				<input
					v-if="recipeSrc === 'recipeUrl'"
					type="text"
					v-model="recipeUrl"
					placeholder="Recipe URL"
				/>
			</div>

			<!-- Image selection -->
			<h3>Image</h3>
			<div class="addFavoriteMealForm_container">
				<p v-if="hasImportedRecipeResults && img">
					This image has been taken from the Recipe URL:
					<a :href="img">{{ this.img }}</a>
				</p>

				<input
					type="file"
					id="img"
					name="img"
					accept="image/*"
					@change="onFileChange($event)"
				/>
			</div>

			<h3>Meal Type</h3>
			<div class="addFavoriteMealForm_container">
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
			<div class="addFavoriteMealForm_container">
				<input type="number" id="servings" name="servings" v-model="servings" />
			</div>

			<!-- Ready Time -->
			<h3>Ready Time(minutes)</h3>
			<div class="addFavoriteMealForm_container">
				<input
					type="number"
					id="ready-time"
					name="ready-time"
					v-model="readyTime"
				/>
			</div>

			<h3>Rating</h3>
			<div class="addFavoriteMealForm_container">
				<span v-for="index in 5" :key="index">
					<favorite-meal-item-rating
						@star-clicked="setRange"
						:clicked="isStarIncluded(index)"
						:index="index"
					></favorite-meal-item-rating>
				</span>
			</div>

			<h3>Label</h3>
			<div class="addFavoriteMealForm_container">
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
			<div class="addFavoriteMealForm_container">
				<div
					class="addFavoriteMealForm_container_ingredients"
					v-for="(ingredient, index) in ingredients"
					:key="index"
				>
					<input type="text" v-model="ingredients[index]" />
					<div class="addFavoriteMealForm_container_addRemoveFields">
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
			</div>

			<!-- Steps -->
			<h3>Steps</h3>
			<div class="addFavoriteMealForm_container">
				<div
					class="addFavoriteMealForm_container_steps"
					v-for="(step, index) in steps"
					:key="index"
				>
					<textarea v-model="steps[index]" cols="10" rows="5"></textarea>
					<div class="addFavoriteMealForm_container_addRemoveFields">
						<a
							@click="addField(steps)"
							@keyup.enter="addField(steps)"
							tabindex="0"
						>
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
				</div>
			</div>

			<!-- Nutrition Facts -->
			<h3 v-if="hasImportedRecipeResults">Nutrition Facts</h3>
			<div v-else class="addFavoriteMealForm_alternateNutritionHeader">
				<h3>Nutrition Facts</h3>
				<font-awesome-icon
					@click="openNutritionModal"
					:icon="['fas', 'question']"
				/>
			</div>
			<div class="addFavoriteMealForm_container">
				<div class="addFavoriteMealForm_container_nutrition">
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
			</div>

			<!-- Notes -->
			<h3>Notes</h3>
			<div class="addFavoriteMealForm_container">
				<div
					class="addFavoriteMealForm_container_notes"
					v-for="(note, index) in notes"
					:key="index"
				>
					<textarea v-model="notes[index]" cols="30" rows="10"></textarea>
					<div class="addFavoriteMealForm_container_addRemoveFields">
						<a
							@click="addField(notes)"
							@keyup.enter="addField(notes)"
							tabindex="0"
						>
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
				</div>
			</div>
			<input type="submit" />
		</form>
	</div>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import FavoriteMealImportModal from "./FavoriteMealImportModal.vue";
import FavoriteMealItemRating from "./FavoriteMealItemRating.vue";
import FavoriteMealNutritionModal from "./FavoriteMealNutritionModal.vue";

export default {
	components: {
		FavoriteMealItemRating,
		FavoriteMealImportModal,
		FavoriteMealNutritionModal,
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
			recipeUrl: null,
			recipeSrc: "recipeUrl",
			userInput: false,
			starRange: [],
			importModalOpen: false,
			hasImportedRecipeResults: false,
			hasAnalyzedRecipeResults: false,
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
		setImportedData(importedData) {
			if (importedData) {
				this.itemName = importedData.itemName;
				this.servings = importedData.servings;
				this.readyTime = importedData.readyTime;
				this.ingredients = importedData.ingredients;
				this.steps = importedData.steps;
				this.nutritionFacts = importedData.nutritionFacts;
				this.img = importedData.img;
				this.recipeUrl = importedData.recipeUrl;
				this.hasImportedRecipeResults = true;
			}
			this.closeImportModal();
		},
		openNutritionModal() {
			this.nutritionModalOpen = true;
		},
		closeNutritionModal() {
			this.nutritionModalOpen = false;
		},
		setAnalyzedNutrition(nutritionFacts) {
			if (nutritionFacts) {
				this.nutritionFacts = nutritionFacts;
			}
			this.closeNutritionModal();
		},
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
		onFileChange(event) {
			this.img = event.target.files[0];
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

			if (this.recipeUrl) {
				formData.append("recipeUrl", this.recipeUrl);
			} else {
				this.userInput = true;
				formData.append("userInput", this.userInput);
			}

			const res = await FavoriteMealService.add(formData);
			console.log(res.data);
			this.$router.replace("/favorite-meals");
		},
	},
};
</script>

<style lang="scss" scoped>
.addFavoriteMealForm {
	form {
		padding: 1rem;

		h3 {
			margin-bottom: 0.2rem;
		}

		input {
			padding: 0.4rem;
			border-radius: 0.2rem;
			border: 1px solid black;
			width: fit-content;
			margin-bottom: 0.5rem;
		}

		textarea {
			margin-bottom: 0.5rem;
		}
	}

	&_container {
		margin-bottom: 1.5rem;

		&_notes,
		&_steps,
		&_ingredients,
		&_nutrition {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		&_ingredients {
			input,
			textarea {
				width: 11rem;
			}
		}

		&_addRemoveFields {
			display: flex;
			justify-content: space-between;
			margin-left: 3rem;
		}
	}

	&_alternateNutritionHeader {
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
