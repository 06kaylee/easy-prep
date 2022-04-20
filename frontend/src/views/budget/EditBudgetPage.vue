<template>
	<base-card class="edit-budget-form-container">
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

<style scoped>
.edit-budget-form-container {
	background: white;
}
</style>
