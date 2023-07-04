<template>
	<!-- <div class="TheNavigationBar">
		<div class="TheNavigationBar_logoContainer">
			<router-link to="/">
				<img src="../../assets/Easy-Prep.png" alt="" />
			</router-link>
		</div>
	
		<nav class="sidebar">
			<ul
				class="TheNavigationBar_list"
			>
				<li>
					<router-link to="/dashboard">Dashboard</router-link>
				</li>
				<li>
					<router-link to="/favorite-meals">Favorite Meals</router-link>
				</li>
				<li>
					<router-link to="/upcoming-meals">Upcoming Meals</router-link>
				</li>
				<li>
					<router-link to="/grocery-list">Grocery List</router-link>
				</li>
				<li>
					<a href="">Sign Out</a>
				</li>
			</ul>
		</nav>
	</div> -->
	<aside class="TheNavigationBar">
		<div class="TheNavigationBar_logo">
			<router-link to="/">
				<img src="../../assets/Easy-Prep.png" alt="" />
			</router-link>
		</div>

		<div class="TheNavigationBar_listContainer">
			<ul class="TheNavigationBar_list">
				<li>
					<router-link to="/dashboard">
						<font-awesome-icon :icon="['fas', 'house']" />
					</router-link>
				</li>
				<li>
					<router-link to="/favorite-meals">
						<font-awesome-icon :icon="['fas', 'heart']" />
					</router-link>
				</li>
				<li>
					<router-link to="/upcoming-meals">
						<font-awesome-icon :icon="['far', 'calendar-days']" />
					</router-link>
				</li>
				<li>
					<router-link to="/grocery-list">
						<font-awesome-icon :icon="['fas', 'cart-shopping']" />
					</router-link>
				</li>
			</ul>
		</div>
	</aside>
</template>

<style lang="scss">
.TheNavigationBar {
	display: flex;
	justify-content: space-between;
	padding: 1rem 2rem;
	background: white;

	&_logo {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
		margin-top: 1rem;

		img {
			width: 6rem;
		}
	}

	&_listContainer {
		display: flex;
		align-items: center;
	}

	&_list {
		li {
			display: inline-block;
			list-style: none;
			display: inline-block;
			padding: 0 20px;
		}

		li a {
			text-decoration: none;
			color: black;
		}
	}
}

body {
	overflow-x: hidden;
}
</style>
