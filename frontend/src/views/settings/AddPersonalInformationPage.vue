<template>
	<base-card>
		<add-personal-information-form :id="id"></add-personal-information-form>
	</base-card>
</template>

<script>
import AddPersonalInformationForm from "../../components/settings/AddPersonalInformationForm.vue";

export default {
	components: {
		AddPersonalInformationForm,
	},
	props: ["id"],
};
</script>

<style scoped>
.card {
	background: white;
}
</style>
