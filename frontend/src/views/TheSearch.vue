<template>
	<div>
		<div class="search-bar-container">
			<h2>Find Your Next Favorite Meal</h2>
			<div class="search-bar">
				<div class="icon-container">
					<i class="fa-solid fa-magnifying-glass"></i>
					<input
						type="text"
						id="search-input"
						placeholder="Search by name, ingredient, genre, chef, etc."
					/>
				</div>
				<a href=""> Advanced Search </a>
			</div>
		</div>

		<div class="sample-recipes-container">
			<base-card>
				<base-card class="recipe-card">
					<h2 class="title">Quick Meals</h2>
					<div class="img-container">
						<img :src="require('../assets/sample-logo.jpg')" alt="">
					</div>
				</base-card>
				<base-card class="recipe-card">
					<h2 class="title">Breakfast Classics</h2>
					<div class="img-container">
						<img :src="require('../assets/sample-logo.jpg')" alt="">
					</div>
				</base-card>
				<base-card class="recipe-card">
					<h2 class="title">Easy Dinners</h2>
					<div class="img-container">
						<img :src="require('../assets/sample-logo.jpg')" alt="">
					</div>
				</base-card>
			</base-card>
		</div>
	</div>
</template>

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

.icon-container {
	display: grid;
	grid-template: 1fr / auto 1fr;
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
	max-width: 80rem;
	width: 80rem;
	display: flex;
	justify-content: space-evenly;
	margin: 10rem auto;
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
