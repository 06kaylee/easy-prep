<template>
	<base-card>
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
