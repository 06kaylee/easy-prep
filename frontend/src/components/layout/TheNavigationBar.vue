<template>
	<header class="nav-container">
		<div id="logo-img-container">
			<a href="/">
				<img src="../../assets/sample-logo.jpg" alt="" />
			</a>
		</div>
		<div id="logo-container">
			<router-link to="/">LogoName</router-link>
		</div>
		<nav>
			<ul>
				<li>
					<router-link to="/login">Login</router-link>
				</li>
				<li>
					<router-link to="/sign-up">Sign Up</router-link>
				</li>
				<li>
					<router-link to="/search"
						><font-awesome-icon :icon="['fas', 'magnifying-glass']"
					/></router-link>
				</li>
				<li>
					<router-link to="/dashboard">Dashboard</router-link>
				</li>
				<li>
					<a href="">Sign Out</a>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
.nav-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 1em 5em 1em 5em;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
	/* offset-x, offset-y, blur-radius, spread-radius, color */
}

.nav-container li {
	list-style: none;
	display: inline-block;
	padding: 0 2.5em;
}

.nav-container a {
	text-decoration: none;
	color: black;
}

#logo-container {
	margin-right: auto;
}

#logo-container a {
	font-size: 1.4em;
}

#logo-img-container {
	max-width: 50px;
	max-height: 50px;
	padding-right: 0.5em;
}

#logo-img-container img {
	max-width: 100%;
	max-height: 100%;
}

a:hover {
	color: grey;
}
</style>
