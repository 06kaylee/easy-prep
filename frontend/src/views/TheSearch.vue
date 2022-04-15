<template>
	<div>
		<div class="search-bar-container">
			<h2>Find Your Next Favorite Meal</h2>
			<div class="search-bar">
				<input
					type="text"
					id="search-input"
					placeholder="Search by name, ingredient, genre, chef, etc."
				/>
				<!-- <font-awesome-icon class="search-btn" :icon="['fas', 'magnifying-glass']" /> -->
				<a href="">Advanced Search</a>
			</div>
		</div>

		<div class="sample-recipes-container">
			<base-card>
				<base-card class="recipe-card">
					<h2 class="title">{{ currentData.title }}</h2>
					<div class="img-container">
						<img :src="require('../assets/sample-logo.jpg')" alt="">
					</div>
				</base-card>
				<base-button @click="nextData">Next</base-button>
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
				}
			],
			currentData: null,
			currentIndex: 0,
			sampleCardsCollapsed: false
		}
	},
	methods: {
		nextData() {
			if(this.currentIndex + 1 === this.sampleData.length) {
				this.currentIndex = 0;
			}
			else {
				this.currentIndex += 1;
			}
			this.currentData = this.sampleData[this.currentIndex];
		}
	},
	created() {
		this.currentData = this.sampleData[0];
	}
}
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

.search-bar {
	grid-column: 1 / 5;
	display: grid;
	justify-content: center;
}

#search-input {
	width: 43rem;
	padding: 0.8rem;
	border: 2px solid lightgray;
	border-radius: 22px;
	margin-bottom: 0.5rem;
}

.search-bar a {
	display: flex;
	justify-content: end;
	font-size: 0.8rem;
	color: blue;
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
}

@media screen and (max-width: 70rem) {
	.sample-recipes-container > .card {
		grid-template-columns: repeat(2, 1fr);
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

a:hover {
	color: grey;
}
</style>
