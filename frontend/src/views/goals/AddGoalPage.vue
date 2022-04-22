<template>
	<base-card class="add-goal-form-container">
		<h2>Add a Goal</h2>
		<add-goal-form :isEditing="false"></add-goal-form>
	</base-card>
</template>

<script>
import AddGoalForm from "../../components/goals/AddGoalForm.vue";

export default {
	components: {
		AddGoalForm,
	},
};
</script>

<style scoped>
.add-goal-form-container {
	background: white;
}
</style>
