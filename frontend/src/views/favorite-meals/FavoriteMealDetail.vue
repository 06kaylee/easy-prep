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
			<div class="FavoriteMealDetail_container" v-if="selectedFavoriteMeal">
				<div class="FavoriteMealDetail_container_firstHalf">
					<div class="FavoriteMealDetail_container_firstHalf_imgContainer">
						<img :src="mealImgLink" alt="" />
					</div>

					<div class="FavoriteMealDetail_container_firstHalf_ingredients">
						<h3>Ingredients</h3>
						<ul>
							<li
								v-for="ingredient of selectedFavoriteMeal.ingredients"
								:key="ingredient"
							>
								<base-card>
									<p>1/3 cup {{ ingredient }}</p>
								</base-card>
							</li>
						</ul>
					</div>
				</div>

				<div class="FavoriteMealDetail_container_secondHalf">
					<div class="FavoriteMealDetail_container_secondHalf_header">
						<h2>{{ selectedFavoriteMeal.itemName }}</h2>
						<div class="FavoriteMealDetail_container_secondHalf_header_icons">
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

						<div
							class="FavoriteMealDetail_container_secondHalf_header_basicInfo"
						>
							<!-- ready time -->
							<p>
								<font-awesome-icon :icon="['far', 'clock']" />
								{{ selectedFavoriteMeal.readyTime }} minutes
							</p>
							<!-- servings -->
							<p>
								<font-awesome-icon :icon="['far', 'user']" />
								{{ selectedFavoriteMeal.servings }} servings
							</p>
							<!-- rating -->
						</div>
					</div>

					<div class="FavoriteMealDetail_container_secondHalf_nutrition">
						<ul>
							<li v-for="(info, name) of quickNutritionInfo" :key="info">
								<p>
									{{ info }} <span>{{ ingredientLabels[name].label }}</span>
								</p>
							</li>
						</ul>
						<a href="">
							<font-awesome-icon :icon="['far', 'file-lines']" />
							See full nutrition label
						</a>
					</div>

					<div class="FavoriteMealDetail_container_secondHalf_steps">
						<h3>Instructions</h3>
						<ol>
							<li v-for="step of selectedFavoriteMeal.steps" :key="step">
								<p>{{ step }}</p>
							</li>
						</ol>
					</div>
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
			daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			dayToSaveTo: "Mon",
			ingredientLabels: {
				calories: {
					label: "Calories",
				},
				totalFat: {
					label: "Fat",
				},
				cholesterol: {
					label: "Cholesterol",
				},
				totalCarbs: {
					label: "Carbs",
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
		quickNutritionInfo() {
			const fields = ["calories", "totalFat", "totalCarbs", "protein"];
			const filteredNutritionInfo = {};
			for (const key in this.selectedFavoriteMeal.nutritionFacts) {
				if (fields.includes(key)) {
					filteredNutritionInfo[key] =
						this.selectedFavoriteMeal.nutritionFacts[key];
				}
			}
			return filteredNutritionInfo;
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
		console.log(this.quickNutritionInfo);
	},
};
</script>

<style lang="scss" scoped>
.FavoriteMealDetail {
	&_container {
		display: grid;
		padding: 2rem;
		gap: 3rem;

		@media screen and (min-width: 760px) {
			grid-template-columns: min-content auto;
			gap: 4rem;
		}

		@media screen and (min-width: 980px) {
			padding: 2rem 4rem;
		}

		&_firstHalf {
			display: grid;

			@media screen and (min-width: 760px) {
				gap: 3rem;
			}

			&_imgContainer {
				display: none;
				max-width: 200px;
				max-height: 200px;

				@media screen and (min-width: 760px) {
					display: block;
				}

				img {
					border-radius: 1rem;
					max-width: 100%;
					max-height: 100%;
				}
			}

			&_ingredients {
				width: 18rem;

				@media screen and (min-width: 980px) {
					width: 23rem;
				}

				ul {
					list-style-type: none;
					display: grid;
					gap: 1rem;
					margin-top: 1rem;
					height: 16rem;
					overflow: hidden;
					overflow-y: scroll;
					padding: 1rem 0.3rem;

					li {
						.card {
							margin: 0;
							max-width: 20rem;
							width: 14rem;
							height: 4rem;
							max-height: 20rem;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 26px;

							@media screen and (min-width: 980px) {
								width: 18rem;
							}
						}
					}
				}
			}
		}

		&_secondHalf {
			display: grid;
			grid-row: 1;
			gap: 2rem;

			@media screen and (min-width: 760px) {
				max-width: 45rem;
				grid-column: 2;
			}

			&_header {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				align-items: center;
				row-gap: 1.5rem;

				@media screen and (min-width: 760px) {
					row-gap: 0;
				}

				&_icons {
					display: flex;
					align-items: center;
					gap: 1.5rem;

					.like-btn {
						border: none;
						background: none;
						font-size: 1.4rem;
						cursor: pointer;
					}

					.edit-btn {
						color: black;
					}
				}

				&_basicInfo {
					display: flex;
					gap: 3.5rem;
					grid-column: 1 / 3;

					@media screen and (min-width: 760px) {
						gap: 1.5rem;
					}

					@media screen and (min-width: 980px) {
						gap: 3.5rem;
					}

					p {
						display: flex;
						align-items: center;
						gap: 0.4rem;
						font-weight: bold;
					}
				}
			}

			&_nutrition {
				border: 2px solid purple;
				padding: 1rem;
				border-radius: 6px;
				display: grid;
				gap: 1rem;
				max-width: 26rem;
				max-height: 10rem;

				@media screen and (min-width: 980px) {
					padding: 1.5rem 2rem;
				}

				@media screen and (min-width: 1400px) {
					max-width: 35rem;
				}

				ul {
					display: flex;
					justify-content: space-between;
					list-style-type: none;

					li {
						p {
							text-align: center;
							color: purple;
							font-size: 2rem;

							span {
								display: block;
								color: black;
								font-weight: bold;
								font-size: 0.8rem;
							}
						}
					}
				}

				a {
					color: #755775;
					font-size: 1rem;
					display: flex;
					gap: 0.3rem;
					align-items: center;
				}
			}

			&_steps {
				@media screen and (min-width: 1400px) {
					max-width: 30rem;
				}
				ol {
					list-style: none;
					counter-reset: my-awesome-counter;
					display: grid;
					gap: 1rem;
					margin-top: 1rem;
				}
				ol li {
					counter-increment: my-awesome-counter;
					display: flex;
					align-items: center;
				}
				ol li::before {
					content: counter(my-awesome-counter);
					font-weight: bold;
					background: #662974;
					border-radius: 50%;
					line-height: 2rem;
					color: white;
					text-align: center;
					margin-right: 0.5rem;
					min-width: 34px;
				}
			}
		}
	}
}

::-webkit-scrollbar {
	width: 1.5em;
}

::-webkit-scrollbar-track {
	background: white;
	border-radius: 100vh;
	margin-block: 0.4rem;
}

::-webkit-scrollbar-thumb {
	background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}

@supports (scrollbar-color: #f4d3cb white) {
	* {
		scrollbar-color: #f4d3cb white;
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
