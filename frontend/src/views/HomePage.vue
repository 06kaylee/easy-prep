<template>
	<div class="home-page-container">
		<ul>
			<li>
				<font-awesome-icon :icon="['fas', 'square-check']" />
				<p>Easily plan your meals for the week</p>
			</li>
			<li>
				<font-awesome-icon :icon="['fas', 'square-check']" />
				<p>Create a budget and choose meals that match your budget goals</p>
			</li>
			<li>
				<font-awesome-icon :icon="['fas', 'square-check']" />
				<p>Keep track of your nutrition and fitness goals</p>
			</li>
		</ul>
		<div class="img-container">
			<img src="../assets/sample-img.jpg" alt="" />
		</div>
		<div class="btn-container">
			<base-button>Get Started</base-button>
		</div>
	</div>
</template>

<style scoped>
.home-page-container {
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	margin: 3.5rem auto;
	max-width: 40rem;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	font-size: 1em;
	background: white;
}

.home-page-container ul {
	grid-column: 1 / 7;
	padding-left: 20px;
	list-style-type: none;
}

.home-page-container ul li {
	padding: 20px 0;
	vertical-align: baseline;
	display: table;
}

.home-page-container ul li p {
	display: table-cell;
	padding-left: 20px;
}

.img-container {
	max-width: 70%;
	max-height: 80%;
	grid-column: 8 / 11;
}

.img-container img {
	max-width: 100%;
	max-height: 100%;
}

.btn-container {
	width: fit-content;
	grid-column: 5 / 7;
	margin: auto;
}

.btn-container button {
	width: 9rem;
}
</style>
