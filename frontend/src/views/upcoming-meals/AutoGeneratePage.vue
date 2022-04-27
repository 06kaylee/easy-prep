<template>
	<div class="auto-generate-container">
		<div class="back-btn-container">
			<base-button class="back-btn" link :to="allMealsLink"
				>Back to all meals</base-button
			>
		</div>

		<base-card class="auto-generate-form-container">
			<h2>Auto Generate</h2>
			<auto-generate-form></auto-generate-form>
		</base-card>
	</div>
</template>

<script>
import AutoGenerateForm from "../../components/upcoming-meals/AutoGenerateForm.vue";
export default {
	components: {
		AutoGenerateForm,
	},
	computed: {
		allMealsLink() {
			return "/upcoming-meals";
		},
	},
};
</script>

<style scoped>
.auto-generate-container > .auto-generate-form-container {
	max-width: 36rem;
	background: white;
	max-height: 45rem;
	overflow: auto;
	padding-left: 1.5rem;
}
.auto-generate-form-container h2 {
	text-align: center;
}
::-webkit-scrollbar {
	width: 1.2em;
}
::-webkit-scrollbar-track {
	background: white;
	border-radius: 100vh;
	margin-block: 0.4em;
}
::-webkit-scrollbar-thumb {
	background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}
@supports (scrollbar-color: #c7c4c4 white) {
	* {
		scrollbar-color: #c7c4c4 white;
	}
}
.back-btn {
	height: fit-content;
}
.back-btn-container {
	margin: 2rem 0 0 1rem;
}
</style>