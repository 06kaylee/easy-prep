<template>
	<dashboard-layout>
		<div class="all-upcoming-days-container">
			<header>
				<h2>Your Upcoming Meals</h2>
				<div class="upcoming-meal-btns-container">
					<base-button v-if="upcomingMealsExist" @click="openModal('auto')">
						Auto Generate
					</base-button>
					<base-button v-else link to="/upcoming-meals/auto-generate">Auto Generate</base-button>
					<base-button @click="openModal('export')">Export</base-button>
				</div>
			</header>

			<base-modal class="auto-generate-modal" v-show="autoModalVisible" @close="closeModal('auto')">
				<template v-slot:header>
					<h3>Auto Generate</h3>
				</template>
				<template v-slot:body>
					<form @submit.prevent="submitAuto" class="auto-generate-form">
						<div class="remove-option">
							<p class="form-question">What do you want to do with your current upcoming meals?</p> 
							<label for="remove">
								<input type="radio" id="remove" name="remove-option" value="remove" v-model="removeOption">
								Remove
							</label>

							<label for="keep">
								<input type="radio" id="keep" name="remove-option" value="keep" v-model="removeOption">
								Keep
							</label>
						</div>

						<div class="btn-container">
							<!-- TODO fix buttons to remove meals and generate based on option -->
							<base-button>Save</base-button>
						</div>
					</form>
				</template>
			</base-modal>

			<base-modal class="export-modal" v-show="exportModalVisible" @close="closeModal('export')" id="export-modal-container">
				<template v-slot:header>
					<h3>Export your upcoming meals</h3>
				</template>
				<template v-slot:body>
					<form @submit.prevent="submitExport" class="export-modal-form">
						<label for="download-option">Choose a download method:</label>
						<select name="download-option" id="export-modal-download-option" v-model="downloadOption">
							<option value="email">Email</option>
							<option value="computer">Local Computer</option>
						</select>

						<div class="btn-container">
							<base-button>Save</base-button>
						</div>
					</form>
				</template>
			</base-modal>

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
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	components: {
		DashboardLayout,
		UpcomingMealDay,
	},
	data() {
		return {
			daysOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
			upcomingMeals: null,
			upcomingMealsExist: false,
			isLoading: false,
			autoModalVisible: false,
			exportModalVisible: false,
			downloadOption: 'computer',
			removeOption: 'remove',
		}
	},
	methods: {
		openModal(modalType) {
			switch(modalType) {
				case 'auto':
					this.autoModalVisible = true;
					break;
				case 'export':
					this.exportModalVisible = true;
					break;
				default:
					console.log('Something went wrong');
			}
		},
		closeModal(modalType) {
			switch(modalType) {
				case 'auto':
					this.autoModalVisible = false;
					break;
				case 'export':
					this.exportModalVisible = false;
					break;
				default:
					console.log('Something went wrong');
			}
		},
		async setupAuto() {
			this.isLoading = true;
			if(this.removeOption === 'remove') {
				for(const meal of this.upcomingMeals) {
					await UpcomingMealService.delete(meal._id);
				}
			}
			this.$router.push('/upcoming-meals/auto-generate');
			this.isLoading = false;
		},
		createCsvContent() {
			const propertiesToKeep = ['dayOfWeek', 'itemName', 'readyTime', 'recipeUrl'];
			// add the kept properties to a new object and add that object to the new array
			const newArr = this.upcomingMeals.map(upcomingMealObj => propertiesToKeep.reduce((newObj, key) => {
				newObj[key] = upcomingMealObj[key];
				return newObj;
			}, {}));
			return newArr;
		},
		downloadCsv(arr) {
			let csv = '';
			let header = Object.keys(arr[0]).join(',');
			let values = arr.map(obj => Object.values(obj).join(',')).join('\n');
			csv += header + '\n' + values;
			var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.download = 'upcoming-meals.csv';
            document.getElementById('export-modal-container').appendChild(hiddenElement);
            hiddenElement.click();
			this.closeModal('export');
		},
		submitExport() {
			const newArr = this.createCsvContent();
			if(this.downloadOption === 'computer') {
				this.downloadCsv(newArr);
			}
		},
		submitAuto() {
			this.setupAuto();
		}
	},
	async created() {
		const res = await UpcomingMealService.getAll();
		this.upcomingMeals = res.data;
		if(this.upcomingMeals.length > 0) {
			this.upcomingMealsExist = true;
		}
		console.log(this.upcomingMeals);
	}
};
</script>

<style scoped>
.modal h3 {
	margin: 0.8rem 0 1rem 0;
}

.modal .btn-container {
	margin-top: 1rem;
	display: flex;
	justify-content: space-evenly;
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

.auto-generate-modal >>> .modal {
	/* width: 29rem;
	height: 24rem; */
	width: fit-content;
	height: fit-content;
	text-align: left;
}

.auto-generate-form {
	display: grid;
	row-gap: 1.2rem;
}

.remove-option,
.generate-option {
	display: grid;
	padding-left: 2rem;
}

.form-question {
	margin-bottom: 0.4rem;
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

.upcoming-meal-btns-container {
	display: flex;
	gap: 1rem;
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
