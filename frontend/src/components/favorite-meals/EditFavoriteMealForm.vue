<template>
	<form
		class="edit-favorite-meal-form"
		@submit.prevent="submitForm"
		v-if="selectedMeal"
		enctype="multipart/form-data"
	>
		<!-- Name of the item -->
		<div class="form-control">
			<label for="item-name" id="item-name-label">Item Name</label>
			<input type="text" id="item-name" v-model="selectedMeal.itemName" />
		</div>

		<!-- Recipe source -->
		<div v-if="selectedMeal.recipeUrl">
			<h3>Recipe Source</h3>
			<div class="form-control">
				<input type="text" v-model="selectedMeal.recipeUrl" />
			</div>
		</div>

		<!-- Image -->
		<h3>Image</h3>
		<div class="form-control">
			<label for="keep">
				<input
					type="radio"
					id="keep"
					name="keep"
					value="keep"
					v-model="imageOption"
				/>
				Keep
			</label>
			<label for="replace">
				<input
					type="radio"
					id="replace"
					name="replace"
					value="replace"
					v-model="imageOption"
				/>
				Replace
			</label>
			<input
				type="file"
				v-if="imageOption === 'replace'"
				id="item-image"
				name="item-image"
				accept="image/png, image/jpeg, image/jpg"
				@change="onFileChange"
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
					v-model="selectedMeal.mealType"
				/>
				Breakfast
			</label>

			<label for="lunch">
				<input
					type="radio"
					id="lunch"
					name="lunch"
					value="lunch"
					v-model="selectedMeal.mealType"
				/>
				Lunch
			</label>

			<label for="dinner">
				<input
					type="radio"
					id="dinner"
					name="dinner"
					value="dinner"
					v-model="selectedMeal.mealType"
				/>
				Dinner
			</label>
		</div>

		<!-- servings -->
		<div class="form-control">
			<label for="servings" id="servings-label">Servings</label>
			<input
				type="number"
				id="servings"
				v-model="selectedMeal.servings"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- ready time -->
		<div class="form-control">
			<label for="ready-time" id="ready-time-label">Ready Time(minutes)</label>
			<input
				type="number"
				id="ready-time"
				v-model="selectedMeal.readyTime"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- rating -->
		<div class="form-control">
			<label for="rating" id="rating-label">Rating</label>
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
					v-model="selectedMeal.label"
				/>
				Beginner
			</label>

			<label for="intermediate">
				<input
					type="radio"
					id="intermediate"
					name="intermediate"
					value="Intermediate"
					v-model="selectedMeal.label"
				/>
				Intermediate
			</label>

			<label for="advanced">
				<input
					type="radio"
					id="advanced"
					name="advanced"
					value="Advanced"
					v-model="selectedMeal.label"
				/>
				Advanced
			</label>
		</div>

		<!-- Nutrition Facts -->
		<h3>Nutrition Facts</h3>
		<div class="form-control nutrition-facts">
			<label for="calories">Calories</label>
			<input
				type="text"
				id="calories"
				name="calories"
				v-model="selectedMeal.nutritionFacts.calories"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="total-fat">Total Fat(g)</label>
			<input
				type="text"
				id="total-fat"
				name="total-fat"
				v-model="selectedMeal.nutritionFacts.fat"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="cholesterol">Cholesterol(mg)</label>
			<input
				type="text"
				id="cholesterol"
				name="cholesterol"
				v-model="selectedMeal.nutritionFacts.cholesterol"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="sodium">Sodium(mg)</label>
			<input
				type="text"
				id="sodium"
				name="sodium"
				v-model="selectedMeal.nutritionFacts.sodium"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="total-carbs">Total Carbohydrates(g)</label>
			<input
				type="text"
				id="total-carbs"
				name="total-carbs"
				v-model="selectedMeal.nutritionFacts.carbohydrates"
				:readonly="selectedMeal.recipeUrl"
			/>

			<label for="protein">Protein(g)</label>
			<input
				type="text"
				id="protein"
				name="protein"
				v-model="selectedMeal.nutritionFacts.protein"
				:readonly="selectedMeal.recipeUrl"
			/>
		</div>

		<!-- Ingredients -->
		<h3>Ingredients</h3>
		<div
			class="form-control ingredients"
			v-for="(ingredient, index) in selectedMeal.ingredients"
			:key="index"
		>
			<input
				type="text"
				v-model="selectedMeal.ingredients[index]"
				:readonly="selectedMeal.recipeUrl"
			/>
			<a
				@click="addField(selectedMeal.ingredients)"
				@keyup.enter="addField(selectedMeal.ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.ingredients)"
				@keyup.enter="removeField(index, selectedMeal.ingredients)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Steps -->
		<h3>Steps</h3>
		<div
			class="form-control steps"
			v-for="(step, index) in selectedMeal.steps"
			:key="index"
		>
			<textarea
				v-model="selectedMeal.steps[index]"
				cols="10"
				rows="5"
				:readonly="selectedMeal.recipeUrl"
			></textarea>
			<a
				@click="addField(selectedMeal.steps)"
				@keyup.enter="addField(selectedMeal.steps)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.steps)"
				@keyup.enter="removeField(index, selectedMeal.steps)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<!-- Notes -->
		<div v-if="selectedMeal.notes.length === 0" class="form-control notes">
			<h3 class="notes-heading">Notes</h3>
			<a
				@click="addField(selectedMeal.notes)"
				@keyup.enter="addField(selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
		</div>
		<h3 v-else>Notes</h3>
		<div
			class="form-control notes"
			v-for="(note, index) in selectedMeal.notes"
			:key="index"
		>
			<textarea
				v-model="selectedMeal.notes[index]"
				cols="30"
				rows="10"
			></textarea>
			<a
				@click="addField(selectedMeal.notes)"
				@keyup.enter="addField(selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="add-btn" :icon="['fas', 'plus']" />
			</a>
			<a
				@click="removeField(index, selectedMeal.notes)"
				@keyup.enter="removeField(index, selectedMeal.notes)"
				tabindex="0"
			>
				<font-awesome-icon class="remove-btn" :icon="['fas', 'minus']" />
			</a>
		</div>

		<input type="submit" />
	</form>
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
			selectedMeal: null,
			imageOption: "keep",
		};
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	methods: {
		async submitForm() {
			const formData = new FormData();
			formData.append("itemName", this.selectedMeal.itemName);
			formData.append("img", this.selectedMeal.img);
			formData.append("mealType", this.selectedMeal.mealType);
			formData.append("servings", this.selectedMeal.servings);
			formData.append("readyTime", this.selectedMeal.readyTime);
			formData.append("rating", JSON.stringify(this.selectedMeal.rating));
			formData.append("label", this.selectedMeal.label);
			formData.append(
				"nutritionFacts",
				JSON.stringify(this.selectedMeal.nutritionFacts)
			);
			formData.append(
				"ingredients",
				JSON.stringify(this.selectedMeal.ingredients)
			);
			formData.append("steps", JSON.stringify(this.selectedMeal.steps));

			if (this.selectedMeal.notes.length !== 0) {
				formData.append("notes", JSON.stringify(this.selectedMeal.notes));
			}

			if (this.selectedMeal.recipeUrl) {
				formData.append("recipeUrl", this.selectedMeal.recipeUrl);
			} else {
				this.selectedMeal.userInput = true;
				formData.append("userInput", this.selectedMeal.userInput);
			}

			const res = await FavoriteMealService.edit(this.id, formData);
			console.log(res.data);
			this.$router.replace(`/favorite-meals/${this.id}`);
		},
		onFileChange(event) {
			console.log(event);
			this.selectedMeal.img = event.target.files[0];
			console.log(this.img);
		},
		addField(fieldType) {
			fieldType.push("");
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
		setRange(index) {
			this.selectedMeal.rating = [];
			for (let i = 1; i <= index; i++) {
				this.selectedMeal.rating.push(i);
			}
		},
		isStarIncluded(index) {
			return this.selectedMeal.rating.includes(index);
		},
	},
	async created() {
		const res = await FavoriteMealService.get(this.id);
		this.selectedMeal = res.data;
	},
};
</script>

<style scoped>
.edit-favorite-meal-form {
	padding-top: 0.6rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
	width: fit-content;
	margin-bottom: 0.5rem;
}

#item-name-label,
#servings-label,
#ready-time-label {
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

.notes-heading {
	margin-right: 0.5rem;
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
}
</style>
