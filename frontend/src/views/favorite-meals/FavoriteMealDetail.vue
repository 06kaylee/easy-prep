<template>
	<dashboard-layout>
		<!-- 
			picture title title title
			picture icons icons icons
			picture readyTime servings rating
			picture nutritionInfo
			ingredients instructions
		-->
		<div class="FavoriteMealDetail">
			<div class="back-btn-container">
				<base-button link to="/favorite-meals"
					>Back to all favorite meals</base-button
				>
			</div>

			<div class="FavoriteMealDetail_container" v-if="selectedFavoriteMeal">
				<h2 class="FavoriteMealDetail_container_name">
					{{ selectedFavoriteMeal.itemName }}
				</h2>
				<div class="FavoriteMealDetail_container_icons">
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

				<div class="FavoriteMealDetail_container_imgContainer">
					<img :src="mealImgLink" alt="" />
				</div>
				<div class="FavoriteMealDetail_container_basicInfo">
					<!-- ready time -->
					<p>{{ selectedFavoriteMeal.readyTime }} minutes</p>
					<!-- servings -->
					<p>{{ selectedFavoriteMeal.servings }} servings</p>
					<!-- rating -->
				</div>
				<div class="FavoriteMealDetail_container_nutrition">
					<ul>
						<li
							v-for="(info, name) of selectedFavoriteMeal.nutritionFacts"
							:key="info"
						>
							{{ info }} - {{ name }}
						</li>
					</ul>
				</div>
				<div class="FavoriteMealDetail_container_steps">
					<ul>
						<li v-for="step of selectedFavoriteMeal.steps" :key="step">
							{{ step }}
						</li>
					</ul>
				</div>
				<div class="FavoriteMealDetail_container_ingredients">
					<ul>
						<li
							v-for="ingredient of selectedFavoriteMeal.ingredients"
							:key="ingredient"
						>
							{{ ingredient }}
						</li>
					</ul>
				</div>
				<base-button v-if="!isLiked" @click="removeMeal">Save</base-button>

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
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import UpcomingMealService from "../../services/UpcomingMealService";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default {
	components: {
		DashboardLayout,
	},
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
			return this.selectedFavoriteMeal.img === "sample-logo.jpg"
				? require("../../assets/" + this.selectedFavoriteMeal.img)
				: this.selectedFavoriteMeal.img;
		},
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
		console.log(this.selectedFavoriteMeal);
	},
};
</script>

<style lang="scss" scoped>
.FavoriteMealDetail {
	&_container {
		display: grid;
		grid-template-columns: 1fr 1fr;

		&_name {
			grid-column: 2 / 3;
		}

		&_imgContainer {
			grid-column: 1 / 2;
			grid-row: 1;
			max-width: 200px;
			max-height: 200px;

			img {
				border-radius: 1rem;
				max-width: 100%;
				max-height: 100%;
			}
		}

		&_icons {
			grid-column: 2 / 3;
			.like-btn {
				border: none;
				background: none;
				font-size: 1.4rem;
				cursor: pointer;
			}
		}

		&_basicInfo {
		}

		&_nutritionInfo {
		}

		&_steps {
		}

		&_ingredients {
		}
	}
}

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
	background: white;
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
</style>
