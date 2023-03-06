<template>
	<div class="favoriteMealItemLabel">
		<p class="favoriteMealItemLabel_label" :class="labelClass">
			{{ label }}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			required: true,
		},
	},
	computed: {
		labelClass() {
			return {
				"beginner-label": this.label === "Beginner",
				"intermediate-label": this.label === "Intermediate",
				"advanced-label": this.label === "Advanced",
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.favoriteMealItemLabel {
	&_label {
		width: fit-content;
		padding: 0.2rem;
	}
}

.beginner-label {
	background: lightgreen;
	color: darkgreen;
}

.intermediate-label {
	background: lightblue;
	color: darkcyan;
}

.advanced-label {
	background: lightpink;
	color: darkred;
}
</style>
