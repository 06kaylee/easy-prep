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

		<div class="content-container">
			<div class="recipes-card">
				<a href="">
					<h3 class="title">Quick Recipes</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="recipes-card">
				<a href="">
					<h3 class="title">March Madness Appetizers</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>

			<div class="recipes-card">
				<a href="">
					<h3 class="title">Breakfast of Champions</h3>
					<div class="img-container">
						<img src="../assets/sample-logo.jpg" alt="" />
					</div>
				</a>
			</div>
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

.content-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 3rem;
	width: fit-content;
	column-gap: 14rem;
	row-gap: 2rem;
	margin: 8.5rem auto 0 auto;
}

.recipes-card {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 1rem 0.5rem 1rem 0.5rem;
	max-width: 12rem;
}

.recipes-card a {
	text-decoration: none;
	color: black;
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
}

.img-container img {
	max-width: 80%;
	max-height: 80%;
}

a:hover {
	color: grey;
}
</style>
