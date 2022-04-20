<template>
	<div>
		<div class="search-bar-container">
			<h2>Find Your Next Favorite Meal</h2>
			<form @submit.prevent="submitSearch">
				<div class="search-bar">
					<input
						type="text"
						id="search-input"
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
					<a class="advanced-search" href="">Advanced Search</a>
				</div>
			</form>
		</div>

		<div class="sample-recipes-container">
			<base-card v-if="!sampleCardsCollapsed">
				<base-card v-for="sampleItem in sampleData" :key="sampleItem">
					<h2 class="title">{{ sampleItem.title }}</h2>
					<div class="img-container">
						<img :src="require('../../assets/sample-logo.jpg')" alt="" />
					</div>
				</base-card>
			</base-card>
			<base-card v-else>
				<base-card class="recipe-card">
					<h2 class="title">{{ currentData.title }}</h2>
					<div class="img-container">
						<img :src="require('../../assets/sample-logo.jpg')" alt="" />
					</div>
				</base-card>
				<base-button @click="nextData" class="next-data-btn">Next</base-button>
			</base-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sampleData: [
				{
					title: "Easy Dinners",
				},
				{
					title: "Breakfast Classics",
				},
				{
					title: "On the Go Meals",
				},
			],
			currentData: null,
			currentIndex: 0,
			sampleCardsCollapsed: false,
			searchQuery: "",
		};
	},
	computed: {
		searchResultsLink() {
			// return `${this.$route.path}/results?q=${this.searchQuery}`;
			return {
				path: "/search/results/",
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
			console.log(this.searchQuery);
			this.searchQuery = "";
		},
	},
	created() {
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
.search-bar-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin-top: 2rem;
	gap: 2rem;
	margin-top: 7.5rem;
}

.search-bar-container h2 {
	grid-column: 1 / 5;
	display: flex;
	justify-content: center;
	font-size: 1.8rem;
}

form {
	grid-column: 1 / 5;
}

.search-bar {
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(2, auto);
}

#search-input {
	width: 43rem;
	padding: 0.8rem;
	border: 2px solid #94618e;
	border-radius: 22px;
	margin-bottom: 0.5rem;
}

#search-input:focus {
	outline: none;
	border: 2px solid #94618e;
}

.search-btn-container {
	margin-left: 0.5rem;
}

.search-btn-container:hover .search-btn {
	color: white;
}

.search-bar > a:nth-of-type(1) {
	color: black;
	display: flex;
	align-items: center;
	font-size: 1rem;
}

.advanced-search {
	display: flex;
	justify-content: end;
	font-size: 0.8rem;
	color: black;
}

.sample-recipes-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.sample-recipes-container > .card {
	grid-column: 1 / 5;
	max-width: 70rem;
	width: 80%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin: 10rem auto;
	align-items: center;
	background: white;
}

@media screen and (max-width: 75rem) {
	.sample-recipes-container > .card {
		display: flex;
		justify-content: space-between;
		width: 50%;
	}
}

.title {
	text-align: center;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
	display: flex;
	justify-content: center;
	align-content: center;
	margin: 0 auto;
}

.img-container img {
	max-width: 80%;
	max-height: 80%;
}

.next-data-btn {
	height: fit-content;
}

a:hover {
	color: grey;
}
</style>
