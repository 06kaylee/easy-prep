<template>
	<base-card class="auto-generate-item-container">
		<h3 class="recipe-name">{{ recipeName }}</h3>
		<div class="img-container">
			<img :src="mealImgLink" :alt="recipeName" />
		</div>
	</base-card>
</template>

<script>
export default {
	props: {
		recipeName: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
	},
	computed: {
		favoriteMealDetailLink() {
			return this.$route.path + "/" + this.id;
		},
		mealImgLink() {
			return this.img === "sample-logo.jpg"
				? require("../../assets/" + this.img)
				: this.img;
		},
	},
};
</script>

<style scoped>
div .auto-generate-item-container {
	padding: 1rem;
	margin: 1rem 0.5rem 1rem 0;
	max-width: 12rem;
}

div .auto-generate-item-container:hover {
	opacity: 0.8;
}

.recipe-name {
	text-align: center;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
	display: flex;
	justify-content: center;
	align-content: center;
}

.img-container img {
	border-radius: 1rem;
	max-width: 80%;
	max-height: 80%;
}
</style>
