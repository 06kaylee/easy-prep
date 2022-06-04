<template>
	<header class="primary-nav-header">
		<div id="logo-container">
			<router-link to="/">
				<img src="../../assets/Easy-Prep.png" alt="" />
			</router-link>
		</div>

		<button
			class="mobile-nav-toggle"
			@click="toggleNav"
		>
			<font-awesome-icon v-if="navCollapsed" :icon="['fas', 'bars']" />
			<font-awesome-icon v-else :icon="['fas', 'x']" />
		</button>

		<nav>
			<ul
				class="primary-nav-list"
				:class="{ 'show-nav': !navCollapsed }"
			>
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
				<li class="dropdown">
					<router-link class="dropdown-btn" to="/dashboard" @mouseover="enableDashboardDropdown">Dashboard</router-link>
					<ul v-if="showDashboardDropdown" class="dropdown-content" @mouseleave="hideDashboardDropdown">
						<li>
							<router-link to="/favorite-meals">Favorite Meals</router-link>
						</li>
						<li>
							<router-link to="/goals">Goals</router-link>
						</li>
						<li>
							<router-link to="/upcoming-meals">Upcoming Meals</router-link>
						</li>
						<li>
							<router-link to="/budget">Budget</router-link>
						</li>
						<li>
							<router-link to="/grocery-list">Grocery List</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="">Sign Out</a>
				</li>
				<li class="dropdown">
					<a class="dropdown-btn" @mouseover="enableSettingsDropdown">Settings</a>
					<ul v-if="showSettingsDropdown" class="dropdown-content" @mouseleave="hideSettingsDropdown">
						<li>
							<router-link to="/account-info">Account</router-link>
						</li>
						<li>
							<router-link to="/personal-info">Personal</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			navCollapsed: true,
			showDashboardDropdown: false,
			showSettingsDropdown: false,
		};
	},
	methods: {
		toggleNav() {
			this.navCollapsed = !this.navCollapsed;
		},
		enableDashboardDropdown() {
			this.showDashboardDropdown = true;
		},
		hideDashboardDropdown() {
			this.showDashboardDropdown = false;
		},
		enableSettingsDropdown() {
			this.showSettingsDropdown = true;
		},
		hideSettingsDropdown() {
			this.showSettingsDropdown = false;
		}
	},
};
</script>

<style scoped>
body {
	overflow-x: hidden;
}

.primary-nav-header {
	background: #94618e;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em 5em 1em 5em;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.primary-nav-list {
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 4rem;
}

.primary-nav-list a {
	text-decoration: none;
	color: #f8eee7;
}

.mobile-nav-toggle {
	display: none;
}

@supports (backdrop-filter: blur(0.5rem)) {
	.primary-nav-list {
		backdrop-filter: blur(0.5rem);
	}
}

@media screen and (max-width: 40rem) {
	.primary-nav-header {
		padding-left: 2rem;
	}
}

@media screen and (max-width: 55em) {
	.primary-nav-list {
		position: fixed;
		inset: 0 0 0 65%;
		z-index: 1000;
		flex-direction: column;
		padding: min(30vh, 8rem) 2rem;
		transform: translateX(100%); /* move 100% of its width off the page */
		transition: 0.5s ease;
		gap: 2rem;
		background: rgba(248, 238, 231, 0.79);
	}

	.primary-nav-list a {
		color: black;
	}

	.show-nav {
		transform: translateX(0%);
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

@media screen and (max-width: 65rem) {
	.primary-nav-list {
		gap: 2rem;
	}
}

#logo-container {
	display: flex;
	max-width: 10rem;
	align-items: center;
}

#logo-container a {
	font-size: 1.4em;
	text-decoration: none;
	color: black;
}

#logo-container img {
	max-width: 100%;
	max-height: 100%;
	width: 8rem;
	height: 4rem;
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content {
	position: absolute;
	top: 1.8rem;
	background-color: white;
	min-width: 11rem;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	list-style: none;
	border-radius: 5px;
}

.dropdown-content a {
	color: black;
	padding: 1rem;
	text-decoration: none;
	display: block;
}

.dropdown-content a:hover {
	color: grey;
}

a:hover {
	color: rgba(255, 245, 239, 0.79);
}
</style>
