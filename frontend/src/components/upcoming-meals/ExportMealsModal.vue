<template>
	<base-modal class="export-modal" id="export-modal-container">
		<template v-slot:header>
			<h3>Export your upcoming meals</h3>
		</template>
		<template v-slot:body>
			<form @submit.prevent="submitExport" class="export-modal-form">
				<label for="download-option">Choose a download method:</label>
				<select
					name="download-option"
					id="export-modal-download-option"
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
</template>

<script>
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	data() {
		return {
			downloadOption: "computer",
			upcomingMeals: null,
		};
	},
	methods: {
		createCsvContent() {
			const propertiesToKeep = [
				"dayOfWeek",
				"itemName",
				"readyTime",
				"recipeUrl",
			];
			// add the kept properties to a new object and add that object to the new array
			const newArr = this.upcomingMeals.map((upcomingMealObj) =>
				propertiesToKeep.reduce((newObj, key) => {
					newObj[key] = upcomingMealObj[key];
					return newObj;
				}, {})
			);
			return newArr;
		},
		downloadCsv(arr) {
			let csv = "";
			let header = Object.keys(arr[0]).join(",");
			let values = arr.map((obj) => Object.values(obj).join(",")).join("\n");
			csv += header + "\n" + values;
			let hiddenElement = document.createElement("a");
			hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
			hiddenElement.download = "upcoming-meals.csv";
			document
				.getElementById("export-modal-container")
				.appendChild(hiddenElement);
			hiddenElement.click();
			this.$emit("close");
		},
		submitExport() {
			const newArr = this.createCsvContent();
			if (this.downloadOption === "computer") {
				this.downloadCsv(newArr);
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
