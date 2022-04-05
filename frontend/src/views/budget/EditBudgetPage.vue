<template>
	<base-card>
		<h2>Edit a Budget</h2>
		<edit-budget-form :id="id"></edit-budget-form>
	</base-card>
</template>

<script>
import EditBudgetForm from "../../components/budget/EditBudgetForm.vue";

export default {
	components: {
		EditBudgetForm,
	},
	props: ["id"],
};
</script>
