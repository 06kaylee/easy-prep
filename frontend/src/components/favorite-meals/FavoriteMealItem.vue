<template>
	<base-card class="favorite-meal-item-container">
		<router-link class="favorite-meal-detail-link" :to="favoriteMealDetailLink">
			<h3 class="recipe-name" :title="itemName">{{ itemName }}</h3>
			<div class="img-container">
				<img :src="mealImgLink" :alt="itemName" />
			</div>
		</router-link>
	</base-card>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			required: true,
		},
		itemName: {
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
div .favorite-meal-item-container {
	padding: 1rem;
	margin: 1rem 0.5rem 1rem 0;
	max-width: 20rem;
	max-height: 20rem;
	width: 14rem;
	height: 12rem;
}

div .favorite-meal-item-container:hover {
	opacity: 0.8;
}

.favorite-meal-detail-link {
	text-decoration: none;
	color: black;
}

.recipe-name {
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.img-container {
	width: 12rem;
	height: 8rem;
	display: flex;
	justify-content: center;
}

.img-container img {
	border-radius: 1rem;
	max-width: 80%;
	max-height: 80%;
	align-self: center;
}
</style>
