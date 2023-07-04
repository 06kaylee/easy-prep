<template>
	<div class="upcomingMeals_container">
		<header class="upcomingMeals_container_header">
			<h2>Your Upcoming Meals</h2>
			<div class="upcomingMeals_container_header_btnContainer">
				<base-button v-if="upcomingMealsExist" @click="openModal('auto')">
					Auto Generate
				</base-button>
				<base-button v-else link to="/upcoming-meals/auto-generate"
					>Auto Generate</base-button
				>
				<base-button @click="openModal('export')">Export</base-button>
				<base-button link to="/upcoming-meals/choose">Choose</base-button>
			</div>
		</header>

		<auto-generate-modal
			v-show="autoModalVisible"
			@close="closeModal('auto')"
		></auto-generate-modal>

		<export-meals-modal
			v-show="exportModalVisible"
			@close="closeModal('export')"
		></export-meals-modal>

		<div class="upcomingMeals_container_allDays">
			<upcoming-meal-day
				v-for="dayOfWeek in daysOfWeek"
				:key="dayOfWeek"
				:dayOfWeek="dayOfWeek"
				:isActive="isActiveDay(dayOfWeek)"
				@click="changeActiveDay(dayOfWeek)"
			></upcoming-meal-day>
		</div>

		<div class="upcomingMeals_container_meals">
			<upcoming-meal-preview
				v-for="mealType in mealTypes"
				:key="mealType"
				:day="activeDay"
				:meal-type="mealType"
				:meals="mealsForDay(mealType)"
			></upcoming-meal-preview>
		</div>
	</div>
</template>

<script>
import UpcomingMealDay from "../../components/upcoming-meals/UpcomingMealDay.vue";
import UpcomingMealService from "../../services/UpcomingMealService";
import UpcomingMealPreview from "../../components/upcoming-meals/UpcomingMealPreview.vue";
import AutoGenerateModal from "../../components/auto-generate/AutoGenerateModal.vue";
import ExportMealsModal from "../../components/upcoming-meals/ExportMealsModal.vue";

export default {
	components: {
		UpcomingMealDay,
		UpcomingMealPreview,
		AutoGenerateModal,
		ExportMealsModal,
	},
	data() {
		return {
			daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			mealTypes: ["breakfast", "lunch", "dinner"],
			upcomingMeals: null,
			upcomingMealsExist: false,
			isLoading: false,
			autoModalVisible: false,
			exportModalVisible: false,
			activeDay: "Mon",
		};
	},
	methods: {
		mealsForDay(mealType) {
			if (this.upcomingMeals) {
				return this.upcomingMeals.filter(
					(meal) =>
						meal.dayOfWeek === this.activeDay && meal.mealType === mealType
				);
			}
			return [];
		},
		changeActiveDay(dayOfWeek) {
			this.activeDay = dayOfWeek;
		},
		isActiveDay(dayOfWeek) {
			return this.activeDay === dayOfWeek;
		},
		openModal(modalType) {
			switch (modalType) {
				case "auto":
					this.autoModalVisible = true;
					break;
				case "export":
					this.exportModalVisible = true;
					break;
				default:
					console.log("Something went wrong");
			}
		},
		closeModal(modalType) {
			switch (modalType) {
				case "auto":
					this.autoModalVisible = false;
					break;
				case "export":
					this.exportModalVisible = false;
					break;
				default:
					console.log("Something went wrong");
			}
		},
	},
	async created() {
		const res = await UpcomingMealService.getAll();
		this.upcomingMeals = res.data;
		if (this.upcomingMeals.length > 0) {
			this.upcomingMealsExist = true;
		}
	},
};
</script>

<style lang="scss" scoped>
.upcomingMeals {
	&_container {
		display: grid;
		grid-auto-rows: min-content;
		gap: 1rem;
		padding: 2rem;

		&_header {
			display: grid;
			gap: 1rem;

			@media screen and (min-width: 760px) {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&_btnContainer {
				display: flex;
				gap: 1rem;
			}
		}

		&_allDays {
			display: flex;
			overflow-x: auto;
			padding: 0.5rem;
			gap: 2.5rem;
			margin-bottom: 3rem;
		}

		&_meals {
			display: grid;
			gap: 2rem;

			@media screen and (min-width: 1024px) {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
}

/* >>> is deep combinator */
#export-modal-container >>> .modal {
	width: 23rem;
	height: 17rem;
}

.export-modal-form {
	display: grid;
	row-gap: 0.5rem;
}

#export-modal-download-option {
	width: fit-content;
	margin: auto;
	padding: 0.2rem;
	font-family: inherit;
	border-radius: 0.4rem;
}

a:hover {
	color: grey;
}

::-webkit-scrollbar {
	width: 1.2em;
}

::-webkit-scrollbar-track {
	background: white;
	border-radius: 100vh;
	margin-block: 0.4em;
}

::-webkit-scrollbar-thumb {
	background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}

@supports (scrollbar-color: #c7c4c4 white) {
	* {
		scrollbar-color: #c7c4c4 white;
	}
}
</style>
