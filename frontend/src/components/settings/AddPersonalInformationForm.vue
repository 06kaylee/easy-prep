<template>
	<form class="add-personal-info-form" @submit.prevent="submitForm">
		<h2 class="personal-info-form-title">Add to {{ selectedPersonalInfo.category }}</h2>
		<div class="form-control">
			<input
				type="text"
				id="new-personal-info-item"
				v-model="newItem"
			/>
		</div>

		<input type="submit" />
	</form>
</template>

<script>
export default {
	data() {
		return {
			selectedPersonalInfo: null,
			newItem: ''
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
			this.selectedPersonalInfo.restrictionItems.push(this.newItem);
			this.$router.push('/personal-info');
		},
	},
	created() {
		const personalSettings = this.$store.getters["personalInfo/restrictions"];
		this.selectedPersonalInfo = personalSettings.find((setting) => setting.id === this.id);
	},
};
</script>

<style scoped>
.add-personal-info-form {
	padding-top: 0.6rem;
}

input {
	padding: 0.4rem;
	border-radius: 0.2rem;
	border: 1px solid black;
}

.form-control {
	margin-bottom: 1rem;
}

.personal-info-form-title {
	padding-bottom: 1rem;
}
</style>
