<template>
	<base-card class="edit-goal-form-container">
		<h2>Edit a Goal</h2>
		<edit-goals-form isEditing :id="id"></edit-goals-form>
	</base-card>
</template>

<script>
import EditGoalsForm from "../../components/goals/EditGoalsForm.vue";

export default {
	components: {
		EditGoalsForm,
	},
	props: ["id"],
};
</script>

<style scoped>
.edit-goal-form-container {
	background: white;
}
</style>
