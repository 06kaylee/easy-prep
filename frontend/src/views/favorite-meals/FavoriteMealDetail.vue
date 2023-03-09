<template>
	<dashboard-layout>
		<div class="favoriteMealDetail">
			<div class="favoriteMealDetail_container" v-if="selectedFavoriteMeal">
				<div class="favoriteMealDetail_container_firstHalf">
					<div class="favoriteMealDetail_container_firstHalf_imgContainer">
						<img
							:src="selectedFavoriteMeal.img"
							:alt="selectedFavoriteMeal.itemName"
						/>
					</div>

					<div class="favoriteMealDetail_container_firstHalf_ingredients">
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

				<div class="favoriteMealDetail_container_secondHalf">
					<div class="favoriteMealDetail_container_secondHalf_header">
						<h2>{{ selectedFavoriteMeal.itemName }}</h2>
						<div class="favoriteMealDetail_container_secondHalf_header_icons">
							<button class="delete-btn" @click="openDeleteMealModal">
								<font-awesome-icon :icon="['fas', 'trash']" />
							</button>
							<router-link
								:to="'/favorite-meals/' + selectedFavoriteMeal._id + '/edit'"
								class="edit-btn"
							>
								<font-awesome-icon :icon="['fas', 'pen']" />
							</router-link>
							<button class="add-to-upcoming-btn" @click="openAddToDayModal">
								<font-awesome-icon :icon="['fas', 'plus']" />
							</button>
						</div>

						<!-- label -->
						<favorite-meal-item-label
							:label="selectedFavoriteMeal.label"
						></favorite-meal-item-label>

						<!-- rating -->
						<div>
							<span v-for="index in 5" :key="index">
								<font-awesome-icon
									v-if="isStarIncluded(index)"
									:icon="['fas', 'star']"
								/>
								<font-awesome-icon v-else :icon="['far', 'star']" />
							</span>
						</div>

						<div
							class="favoriteMealDetail_container_secondHalf_header_basicInfo"
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
						</div>
					</div>

					<div class="favoriteMealDetail_container_secondHalf_nutrition">
						<ul>
							<li v-for="(value, name) of quickNutritionInfo" :key="name">
								<p>
									{{ value }}
									<span>
										{{ getNutritionLabel(name) }}
										<span v-if="getNutritionUnits(name)">
											({{ getNutritionUnits(name) }})
										</span>
									</span>
								</p>
							</li>
						</ul>

						<a @click="openNutritionModal">
							<font-awesome-icon :icon="['far', 'file-lines']" />
							See full nutrition label
						</a>
					</div>

					<base-modal
						v-if="deleteModalOpen"
						class="favoriteMealDetail_deleteModal"
						@close="closeDeleteMealModal"
					>
						<template v-slot:header>
							<h2>Are you sure you want to delete this meal?</h2>
						</template>
						<template v-slot:body>
							<form @submit.prevent="submitDeleteMealForm">
								<div>
									<label for="delete">
										<input
											type="radio"
											id="delete"
											name="delete"
											value="Yes"
											v-model="deleteMealAnswer"
										/>
										Yes
									</label>
									<label for="keep">
										<input
											type="radio"
											id="keep"
											name="keep"
											value="No"
											v-model="deleteMealAnswer"
										/>
										No
									</label>
								</div>
								<base-button>Submit</base-button>
							</form>
						</template>
					</base-modal>

					<base-modal
						v-if="seeFullNutrition"
						class="favoriteMealDetail_nutritionModal"
						@close="closeNutritionModal"
					>
						<template v-slot:header>
							<h2>Nutrition Facts</h2>
						</template>
						<template v-slot:body>
							<table class="favoriteMealDetail_nutritionModal_table">
								<thead>
									<tr>
										<th>Label</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(value, name) of selectedFavoriteMeal.nutritionFacts"
										:key="name"
									>
										<td>{{ getNutritionLabel(name) }}</td>
										<td>{{ value }}{{ getNutritionUnits(name) }}</td>
									</tr>
								</tbody>
							</table>
						</template>
					</base-modal>

					<div class="favoriteMealDetail_container_secondHalf_steps">
						<h3>Instructions</h3>
						<ol>
							<li v-for="step of selectedFavoriteMeal.steps" :key="step">
								<p>{{ step }}</p>
							</li>
						</ol>
					</div>

					<base-button v-if="!isLiked" @click="removeMeal">Save</base-button>
				</div>

				<base-modal v-if="addToDay" @close="closeAddToDayModal">
					<template v-slot:header>
						<h2>Choose a Day</h2>
					</template>
					<template v-slot:body>
						<div class="modal-content-container">
							<form method="dialog">
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
							</form>
						</div>
					</template>
				</base-modal>
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";
import UpcomingMealService from "../../services/UpcomingMealService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FavoriteMealItemLabel from "../../components/favorite-meals/FavoriteMealItemLabel.vue";

export default {
	components: {
		DashboardLayout,
		FavoriteMealItemLabel,
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
					units: "",
				},
				totalFat: {
					label: "Fat",
					units: "g",
				},
				cholesterol: {
					label: "Cholesterol",
					units: "mg",
				},
				totalCarbs: {
					label: "Carbs",
					units: "g",
				},
				protein: {
					label: "Protein",
					units: "g",
				},
				sodium: {
					label: "Sodium",
					units: "mg",
				},
			},
			seeFullNutrition: false,
			addToDay: false,
			deleteModalOpen: false,
			deleteMealAnswer: "Yes",
		};
	},
	computed: {
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
		openNutritionModal() {
			this.seeFullNutrition = true;
		},
		closeNutritionModal() {
			this.seeFullNutrition = false;
		},
		openAddToDayModal() {
			this.addToDay = true;
		},
		closeAddToDayModal() {
			this.addToDay = false;
		},
		openDeleteMealModal() {
			this.deleteModalOpen = true;
		},
		closeDeleteMealModal() {
			this.deleteModalOpen = false;
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
			this.closeAddToDayModal();
		},
		isStarIncluded(index) {
			return this.selectedFavoriteMeal.rating.includes(index);
		},
		getNutritionFact(value, name) {
			const label = this.getNutritionLabel(name);
			const units = this.getNutritionUnits(name);
			return `${label}: ${value}${units}`;
		},
		getNutritionLabel(name) {
			return this.ingredientLabels[name].label;
		},
		getNutritionUnits(name) {
			return this.ingredientLabels[name].units;
		},
		submitDeleteMealForm() {
			if (this.deleteMealAnswer === "Yes") {
				this.removeMeal();
			} else {
				this.closeDeleteMealModal();
			}
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
.favoriteMealDetail {
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
				gap: 1.5rem;
			}

			&_imgContainer {
				display: none;
				width: 325px;
				height: 350px;

				@media screen and (min-width: 760px) {
					display: block;
				}

				img {
					border-radius: 12px;
					width: 100%;
					height: 100%;
					object-fit: cover;
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
					grid-template-rows: min-content;
					gap: 1rem;
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
			grid-auto-rows: min-content;
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
					row-gap: 1rem;
				}

				&_icons {
					display: flex;
					align-items: center;
					gap: 1.5rem;

					.delete-btn {
						border: none;
						background: none;
						font-size: 1.4rem;
						cursor: pointer;
					}

					.edit-btn {
						color: black;
					}
				}

				&_label {
					width: fit-content;
					padding: 0.2rem;
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
				@media screen and (min-width: 900px) {
					border: 2px solid purple;
					padding: 1rem;
					border-radius: 6px;
					display: grid;
					gap: 1rem;
					max-width: 26rem;
					max-height: 10rem;
				}

				@media screen and (min-width: 980px) {
					padding: 1.5rem 2rem;
				}

				@media screen and (min-width: 1400px) {
					max-width: 35rem;
				}

				ul {
					display: none;
					@media screen and (min-width: 900px) {
						display: flex;
						justify-content: space-between;
						list-style-type: none;
					}

					li {
						p {
							text-align: center;
							color: purple;
							font-size: 2rem;

							> span {
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

	&_deleteModal {
		h2 {
			font-size: 1.1rem;
			margin: 1rem 0;
		}

		form {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			justify-content: center;

			div {
				grid-column: 1/3;
				display: flex;
				justify-content: center;
				margin-bottom: 1rem;
				gap: 3rem;
			}

			button {
				grid-column: 1/3;
				justify-self: center;
			}
		}
	}

	&_nutritionModal {
		&_table {
			margin-top: 2rem;
			border-collapse: collapse;
			margin: 25px 0;
			font-size: 0.9em;
			min-width: 400px;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
			text-align: left;

			thead tr {
				background-color: #662974;
				color: #ffffff;
			}

			th,
			td {
				padding: 12px 15px;
			}

			tbody tr {
				border-bottom: 1px solid #dddddd;
			}

			tbody tr:nth-of-type(even) {
				background-color: #f3f3f3;
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

.beginner-label {
	background: lightgreen;
	color: darkgreen;
}

.intermediate-label {
	background: lightblue;
	color: darkcyan;
}

.advanced-label {
	background: lightpink;
	color: darkred;
}
</style>
