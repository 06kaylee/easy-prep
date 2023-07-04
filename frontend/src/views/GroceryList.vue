<template>
	<div class="grocery-list-container">
		<header>
			<h2>Your Grocery List</h2>
			<base-button @click="openModal">Export</base-button>
		</header>

		<base-modal
			v-show="exportModalVisible"
			@close="closeModal"
			id="export-modal-container"
		>
			<template v-slot:header>
				<h3>Export your grocery list</h3>
			</template>

			<template v-slot:body>
				<form @submit.prevent="submitExport">
					<label for="download-option">Choose a download method:</label>
					<select
						name="download-option"
						id="download-option"
						v-model="downloadOption"
					>
						<option value="email">Email</option>
						<option value="computer">Local Computer</option>
					</select>
					<div class="btn-container">
						<base-button>Save</base-button>
					</div>
				</form>
			</template>
		</base-modal>

		<p class="no-meals" v-if="uniqueIngredients.length === 0">
			You don't have any upcoming meals!
		</p>

		<div class="grocery-list-form-container" v-else>
			<form class="grocery-list-form">
				<div
					class="ingredient-container"
					v-for="ingredient in uniqueIngredients"
					:key="ingredient"
				>
					<input
						type="checkbox"
						:id="ingredient"
						:name="ingredient"
						:value="ingredient"
						@click="toggleChecked(ingredient)"
					/>
					<label
						v-if="counts[ingredient] === 1"
						:class="{ 'checked-input': isChecked[ingredient] }"
						>{{ ingredient }}</label
					>
					<label
						v-else-if="counts[ingredient] > 1"
						:class="{ 'checked-input': isChecked[ingredient] }"
					>
						{{ ingredient
						}}<span class="ingredient-count-span">
							x{{ counts[ingredient] }}</span
						>
					</label>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import UpcomingMealService from "../services/UpcomingMealService";

export default {
	data() {
		return {
			uniqueIngredients: [],
			counts: {},
			isChecked: {},
			exportModalVisible: false,
			downloadOption: "computer",
		};
	},
	methods: {
		toggleChecked(ingredient) {
			this.isChecked[ingredient] = !this.isChecked[ingredient];
		},
		openModal() {
			this.exportModalVisible = true;
		},
		closeModal() {
			this.exportModalVisible = false;
		},
		createCsvContent() {
			const newArr = [];
			for (const ingredient of this.uniqueIngredients) {
				console.log(typeof this.isChecked[ingredient]);
				newArr.push({
					item: ingredient,
					quantity: this.counts[ingredient],
					purchased: +this.isChecked[ingredient],
				});
			}
			return newArr;
		},
		downloadCsv(arr) {
			let csv = "";
			let header = Object.keys(arr[0]).join(",");
			let values = arr.map((obj) => Object.values(obj).join(",")).join("\n");
			csv += header + "\n" + values;
			let hiddenElement = document.createElement("a");
			hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
			hiddenElement.download = "grocery-list.csv";
			document
				.getElementById("export-modal-container")
				.appendChild(hiddenElement);
			hiddenElement.click();
			this.closeModal("export");
		},
		async submitExport() {
			const newArr = this.createCsvContent();
			if (this.downloadOption === "computer") {
				this.downloadCsv(newArr);
			}
		},
	},
	async created() {
		const res = await UpcomingMealService.getAll();
		const upcomingMeals = res.data;
		const ingredientArrays = upcomingMeals.map(
			(upcomingMeal) => upcomingMeal.ingredients
		);
		const ingredients = [].concat(...ingredientArrays);
		for (const ingredient of ingredients) {
			this.counts[ingredient] = (this.counts[ingredient] || 0) + 1;
			this.isChecked[ingredient] = false;
		}
		this.uniqueIngredients = [...new Set(ingredients)];
	},
};
</script>

<style scoped>
.modal h3 {
	margin-top: 0.8rem;
}

.modal .btn-container {
	margin-top: 1rem;
	display: flex;
	justify-content: space-evenly;
}

.grocery-list-container > header {
	display: flex;
	justify-content: space-between;
}

.grocery-list-container {
	padding: 0.5rem 0rem 0rem 1.5rem;
}

.ingredient-container {
	padding: 0.3em;
}

.ingredient-container:first-child {
	padding-top: 0.7em;
}

.ingredient-container:last-child {
	padding-bottom: 1em;
}

.ingredient-container label {
	padding-left: 0.4em;
}

.ingredient-count-span {
	font-weight: bold;
}

.checked-input {
	text-decoration: line-through;
}

.no-meals {
	margin-top: 1rem;
}
</style>
