<template>
	<form @submit.prevent="submitForm">
		<div class="form-control">
			<label for="target-amount" id="target-amount-label">Target Amount</label>
			<input
				type="number"
				id="target-amount"
				v-model="selectedBudget.stats.targetAmount"
			/>
		</div>

		<div class="form-control">
			<h3>Timeline</h3>
			<input
				type="radio"
				id="week"
				name="timeline"
				value="week"
				v-model="selectedBudget.stats.timeline"
			/>
			<label for="week">Weekly</label>

			<input
				type="radio"
				id="month"
				name="category"
				value="month"
				v-model="selectedBudget.stats.timeline"
			/>
			<label for="month">Monthly</label>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			selectedBudget: null,
		};
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	methods: {
		submitForm() {
			this.$router.replace("/budget");
		},
	},
	created() {
		const budgets = this.$store.getters["budget/budgets"];
		this.selectedBudget = budgets.find((budget) => budget.id === this.id);
		console.log(this.selectedBudget);
	},
};
</script>

<style scoped>
form {
	padding-top: 0.6rem;
}

#target-amount-label {
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

.form-control:nth-of-type(2) label {
	padding: 0 1.5rem 0 0.3rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
}
</style>
