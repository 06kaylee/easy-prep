<template>
	<div>
		<div class="search-page-container">
			<h2>Find Your Next Favorite Meal</h2>
			<div class="search-bar-container" @submit.prevent="submitSearch">
				<form class="search-bar-form">
					<input
						type="text"
						id="search-bar-input"
						placeholder="Search by name, ingredient, genre, chef, etc."
						v-model="searchQuery"
					/>
					<base-button
						link
						:to="searchResultsLink"
						class="search-btn-container"
					>
						<font-awesome-icon
							class="search-btn"
							:icon="['fas', 'magnifying-glass']"
						/>
					</base-button>
				</form>
				<a class="advanced-search-link" href="">Advanced Search</a>
			</div>
		</div>

		<div class="sample-recipes-container">
			<base-card class="recipe-cards-container" v-if="!sampleCardsCollapsed">
				<base-card v-for="sampleItem in sampleData" :key="sampleItem">
					<router-link :to="'/search/results/' + sampleItem._id">
						<h2 :title="sampleItem.title" class="recipe-title">{{ sampleItem.title }}</h2>
						<div class="img-container">
							<img :src="sampleItem.image" alt="" />
						</div>
					</router-link>
				</base-card>
			</base-card>
			<base-card class="recipe-cards-container" v-else>
				<base-card class="recipe-card">
					<router-link :to="'/search/results/' + currentData._id">
						<h2 :title="currentData.title" class="recipe-title">{{ currentData.title }}</h2>
						<div class="img-container">
							<img :src="currentData.image" alt="" />
						</div>
					</router-link>
				</base-card>
				<base-button @click="nextData" class="next-data-btn">Next</base-button>
			</base-card>
		</div>
	</div>
</template>

<script>
import SearchService from '../../services/SearchService';

export default {
	data() {
		return {
			sampleData: [],
			currentData: null,
			currentIndex: 0,
			sampleCardsCollapsed: false,
			searchQuery: "",
		};
	},
	computed: {
		searchResultsLink() {
			return {
				path: "/search/results",
				query: {
					q: this.searchQuery,
				},
			};
		},
	},
	methods: {
		nextData() {
			if (this.currentIndex + 1 === this.sampleData.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex += 1;
			}
			this.currentData = this.sampleData[this.currentIndex];
		},
		toggleCollapsedCards(event) {
			if (event.currentTarget.innerWidth <= 1200) {
				this.sampleCardsCollapsed = true;
			} else {
				this.sampleCardsCollapsed = false;
			}
		},
		setInitialScreen() {
			if (window.innerWidth <= 1200) {
				this.sampleCardsCollapsed = true;
			}
		},
		submitSearch() {
			this.$router.push(this.searchResultsLink);
		},
	},
	async created() {
		const res = await SearchService.getRandom();
		// console.log(res.data.recipes);
		// for(const recipe of res.data.recipes) {
		// 	const newRecipe = {};
		// 	newRecipe.id = recipe.id;
		// 	newRecipe.title = recipe.title;
		// 	newRecipe.image = recipe.image;
		// 	newRecipe.date = new Date();
		// 	this.sampleData.push(newRecipe);
		// }
		this.sampleData = res.data;
		console.log(this.sampleData);
		this.currentData = this.sampleData[0];
		window.addEventListener("resize", this.toggleCollapsedCards);
		this.setInitialScreen();
	},
	unmounted() {
		window.removeEventListener("resize", this.toggleCollapsedCards);
	},
};
</script>

<style scoped>
.search-page-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin-top: 2rem;
	gap: 2rem;
	margin-top: 7.5rem;
}

.search-page-container h2 {
	grid-column: 1 / 5;
	display: flex;
	justify-content: center;
	font-size: 1.8rem;
}

.search-bar-container {
	grid-column: 1 / 5;
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(4, auto);
}

.search-bar-form {
	grid-column: 1 / 5;
}

#search-bar-input {
	width: 43rem;
	padding: 0.8rem;
	border: 2px solid #94618e;
	border-radius: 22px;
	margin-bottom: 0.5rem;
}

#search-bar-input:focus {
	outline: none;
	border: 2px solid #94618e;
}

.advanced-search-link {
	font-size: 0.9rem;
	color: black;
	grid-column: 4 / 5;
}

.search-btn-container {
	margin-left: 0.5rem;
}

.search-btn-container:hover .search-btn {
	color: white;
}

.sample-recipes-container > .recipe-cards-container {
	grid-column: 1 / 5;
	max-width: 70rem;
	width: 80%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin: 10rem auto;
	align-items: center;
	background: white;
	gap: 2rem;
}

.recipe-cards-container .card {
	height: 90%;
	width: 18rem;
}

.recipe-cards-container .card > a {
	text-decoration: none;
	color: black;
}

/* if screen is less than or equal to 75rem */
@media screen and (max-width: 75rem) {
	.sample-recipes-container > .recipe-cards-container {
		display: flex;
		justify-content: space-between;
		width: 50%;
	}

	.recipe-cards-container .card {
		width: 60%;
	}
}

.recipe-title {
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.img-container { 
	height: 10rem;
	display: flex;
	justify-content: center;
}

.img-container img {
	border-radius: 1rem;
	max-width: 80%;
	align-self: center;
}

.next-data-btn {
	height: fit-content;
}

a:hover {
	color: grey;
}
</style>
