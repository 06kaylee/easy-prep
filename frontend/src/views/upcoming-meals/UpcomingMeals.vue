<template>
	<dashboard-layout changeWidth isActive="upcoming-meals">
		<div class="all-upcoming-days-container">
			<header>
				<h2>Your Upcoming Meals</h2>
				<base-button @click="openModal">
					Auto generate
				</base-button>
			</header>

			<!-- modal asking to remove meals -->
			<dialog class="modal" ref="modal">
				<div class="modal-content-container">
					<button @click="closeModal" class="close-modal-btn">
						<font-awesome-icon :icon="['fas', 'x']" />
					</button>
					<h3>Would you like to remove your current upcoming meals?</h3>
					<div class="btn-container">
						<base-button @click="removeMeals">Yes</base-button>
						<base-button link to="/upcoming-meals/auto-generate">No</base-button>
					</div>
				</div>
			</dialog>

			<upcoming-meal-day
				v-for="dayOfWeek in daysOfWeek"
				:key="dayOfWeek"
				:dayOfWeek="dayOfWeek"
			></upcoming-meal-day>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";
import UpcomingMealDay from "../../components/upcoming-meals/UpcomingMealDay.vue";

export default {
	components: {
		DashboardLayout,
		UpcomingMealDay,
	},
	data() {
		return {
			daysOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
		}
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
		removeMeals() {
			console.log("remove meals");
			// take user to auto generate page
			this.$router.push('/upcoming-meals/auto-generate');
		}
	}
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
	background: white;
}

.modal-content-container {
	display: grid;
	grid-template-rows: repeat(3, min-content);
	row-gap: 0.5rem;
}

.modal .btn-container {
	margin-top: 1rem;
	display: flex;
	justify-content: space-evenly;
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

.all-upcoming-days-container {
	display: grid;
	grid-template-columns: 1fr;
	padding: 1.5rem;
	gap: 2rem;
}

.all-upcoming-days-container header {
	grid-column: 1 / 2;
	display: flex;
	justify-content: space-between;
}

@media screen and (min-width: 55rem) {
	.all-upcoming-days-container {
		grid-template-columns: repeat(2, 1fr);
	}

	.all-upcoming-days-container header {
		grid-column: 1 / 3;
	}
}

@media screen and (min-width: 80rem) {
	.all-upcoming-days-container {
		grid-template-columns: repeat(3, 1fr);
	}

	.all-upcoming-days-container header {
		grid-column: 1 / 4;
	}
}

a:hover {
	color: grey;
}
</style>
