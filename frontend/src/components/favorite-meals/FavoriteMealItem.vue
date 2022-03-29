<template>
	<base-card>
		<router-link :to="favoriteMealDetailLink">
			<h3 class="recipe-name">{{ title }}</h3>
			<div class="img-container">
				<img :src="require('../../assets/' + imgLink)" :alt="title" />
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
		title: {
			type: String,
			required: true,
		},
		imgLink: {
			type: String,
			required: true,
		},
	},
	computed: {
		favoriteMealDetailLink() {
			return this.$route.path + "/" + this.id;
		},
	},
};
</script>

<style scoped>
div .card {
	padding: 1rem;
	margin: 1rem 0.5rem 1rem 0;
	max-width: 12rem;
}

div .card a {
	text-decoration: none;
	color: black;
}

div .card:hover {
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
	max-width: 80%;
	max-height: 80%;
}
</style>
