<template>
	<form @submit.prevent="submitForm">
		<div class="form-control">
			<label for="title" id="title-label">Title</label>
			<input type="text" id="title" v-model="selectedGoal.title" />
			<!-- if isEditing is true, fill in the values. if not, keep values blank -->
		</div>

		<div class="form-control">
			<h3>Category</h3>
			<input
				type="radio"
				id="fitness"
				name="category"
				value="fitness"
				v-model="selectedGoal.category"
			/>
			<label for="fitness">Fitness</label>

			<input
				type="radio"
				id="nutrition"
				name="category"
				value="nutrition"
				v-model="selectedGoal.category"
			/>
			<label for="nutrition">Nutrition</label>

			<input
				type="radio"
				id="other"
				name="category"
				value="other"
				v-model="selectedGoal.category"
			/>
			<label for="other">Other</label>
		</div>

		<div class="form-control">
			<label for="start-date" id="start-date-label">Start Date</label>
			<input
				type="date"
				id="start-date"
				name="start-date"
				v-model="selectedGoal.startDate"
			/>

			<label for="end-date" id="end-date-label">End Date</label>
			<input
				type="date"
				id="end-date"
				name="end-date"
				v-model="selectedGoal.endDate"
			/>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			selectedGoal: null,
		};
	},
	props: {
		isEditing: {
			type: Boolean,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
	methods: {
		submitForm() {
			this.$router.replace("/goals");
		},
	},
	created() {
		const goals = this.$store.getters["goals/goals"];
		this.selectedGoal = goals.find((goal) => goal.id === this.id);
	},
};
</script>

<style scoped>
form {
	padding-top: 0.6rem;
}

#title-label,
#start-date-label,
#end-date-label {
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

.form-control:nth-of-type(3) {
	display: grid;
	grid-template-areas:
		"start end"
		"start-date end-date";
	column-gap: 2rem;
}

#start-date-label {
	grid-area: start;
}

#end-date-label {
	grid-area: end;
}

#start-date {
	grid-area: start-date;
}

#end-date {
	grid-area: end-date;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
}
</style>
