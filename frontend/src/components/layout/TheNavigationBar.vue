<template>
	<header class="primary-header">
		<div id="logo-container">
			<a href="/">
				<img src="../../assets/sample-logo.jpg" alt="" />
			</a>
			<router-link to="/">LogoName</router-link>
		</div>

		<button
			class="mobile-nav-toggle"
			aria-controls="primary-navigation"
			aria-expanded="false"
		>
			<font-awesome-icon :icon="['fas', 'bars']" />
		</button>

		<nav>
			<ul id="primary-navigation" class="primary-navigation">
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
body {
	overflow-x: hidden;
}

.primary-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em 5em 1em 5em;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
	/* offset-x, offset-y, blur-radius, spread-radius, color */
}

.primary-navigation {
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 1rem;
	background: rgb(104, 160, 107);
}

@supports (backdrop-filter: blur(0.5rem)) {
	.primary-navigation {
		background: rgba(104, 160, 107, 0.6);
		backdrop-filter: blur(0.5rem);
	}
}

.primary-navigation a {
	text-decoration: none;
	color: black;
}

.mobile-nav-toggle {
	display: none;
}

@media screen and (max-width: 45em) {
	.primary-navigation {
		position: fixed;
		inset: 0 0 0 40%;
		z-index: 1000;
		flex-direction: column;
		padding: min(30vh, 8rem) 2rem;
		transform: translateX(100%); /* move 100% of its width off the page */
	}

	.mobile-nav-toggle {
		display: block;
		position: absolute;
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 1.3rem;
		top: 2rem;
		right: 2rem;
		z-index: 9999;
	}
}

#logo-container {
	display: flex;
	max-width: 10rem;
	align-items: center;
}

#logo-container a {
	font-size: 1.4em;
}

#logo-container img {
	max-width: 100%;
	max-height: 100%;
}

a:hover {
	color: grey;
}
</style>
