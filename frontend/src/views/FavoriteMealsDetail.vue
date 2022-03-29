<template>
	<div class="container">
		<h2 class="grid-col-span-3 medium-padding-bottom">
			{{ mealTitle }}
			<button class="like-btn" @click="toggleLikeBtn">
				<font-awesome-icon v-if="isLiked" :icon="['fas', 'heart']" />
				<font-awesome-icon v-else :icon="['far', 'heart']" />
			</button>
		</h2>
		<div class="img-container grid-col-span-3 medium-padding-bottom">
			<img :src="require('../assets/' + mealImgLink)" alt="" />
		</div>
		<ul class="grid-col-span-3">
			<li class="light-padding-bottom">Servings</li>
			<li class="light-padding-bottom">Ready Time</li>
			<li class="light-padding-bottom">Nutrition Stats</li>
			<li class="light-padding-bottom">Ingredient list</li>
			<li>Recipe URL</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ["id"],
	data() {
		return {
			selectedFavoriteMeal: null,
			isLiked: true,
		};
	},
	computed: {
		mealTitle() {
			return this.selectedFavoriteMeal.title;
		},
		mealImgLink() {
			return this.selectedFavoriteMeal.imgLink;
		},
	},
	methods: {
		toggleLikeBtn() {
			this.isLiked = !this.isLiked;
			if (!this.isLiked) {
				// remove the meal from the favorite meals list
			} else if (this.isLiked && !this.containsFavMeal()) {
				// add meal to the favorite meals list
			}
		},
		containsFavMeal() {
			const favoriteMeals = this.$store.getters["favoriteMeals/favoriteMeals"];
			for (const favoriteMeal of favoriteMeals) {
				if (favoriteMeal.id === this.id) {
					return true;
				}
			}
			return false;
		},
	},
	created() {
		this.selectedFavoriteMeal = this.$store.getters[
			"favoriteMeals/favoriteMeals"
		].find((favoriteMeal) => favoriteMeal.id === this.id);
	},
};
</script>

<style scoped>
.grid-col-span-3 {
	grid-column: span 3;
}

.light-padding-bottom {
	padding-bottom: 1rem;
}

.medium-padding-bottom {
	padding-bottom: 1.5rem;
}

.container {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	margin: 2rem auto 1rem auto;
	width: min(55%, 50rem);
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.container ul {
	list-style-type: none;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
}

.img-container img {
	max-width: 100%;
	max-height: 100%;
}

.like-btn {
	border: none;
	background: none;
	font-size: 1.4rem;
	padding-left: 0.5rem;
	cursor: pointer;
}
</style>
