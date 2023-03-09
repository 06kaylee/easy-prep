<template>
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

		<!-- Nutrition Facts -->
		<h3>Nutrition Facts</h3>
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
				v-model="nutritionFacts.totalFat"
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
				v-model="nutritionFacts.totalCarbs"
			/>

			<label for="protein">Protein(g)</label>
			<input
				type="text"
				id="protein"
				name="protein"
				v-model="nutritionFacts.protein"
			/>
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
		<div class="form-control steps" v-for="(step, index) in steps" :key="index">
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

		<!-- Notes -->
		<h3>Notes</h3>
		<div class="form-control notes" v-for="(note, index) in notes" :key="index">
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
		{{ starRange }}
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
			itemName: "",
			img: null,
			mealType: "",
			servings: null,
			readyTime: null,
			label: "beginner",
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
			starRange: [],
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
	},
};
</script>

<style scoped>
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
</style>
