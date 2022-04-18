<template>
	<div class="sidebar-container">
		<ul class="dashboard-ul">
			<li>
				<router-link to="/dashboard" :class="{ active: isActive === 'favorite-meals' }">Dashboard</router-link>
			</li>

			<!--sub list of dashboard-->
			<ul>
				<li class="sublist" :class="{ active: isActive === 'favorite-meals' }">
					<router-link to="/favorite-meals">Favorite Meals</router-link>
				</li>
				<li class="sublist" :class="{ active: isActive === 'goals' }">
					<router-link to="/goals">Goals</router-link>
				</li>
				<li class="sublist" :class="{ active: isActive === 'upcoming-meals' }">
					<router-link to="/upcoming-meals">Upcoming Meals</router-link>
				</li>
				<li class="sublist" :class="{ active: isActive === 'budget' }">
					<router-link to="/budget">Budget</router-link>
				</li>
			</ul>
		</ul>

		<ul class="settings-ul">
			<li>
				Settings
			</li>

			<!--sub list of settings-->
			<ul>
				<li class="sublist" :class="{ active: isActive === 'account-info' }">
					<router-link to="/account-info">Account</router-link>
				</li>
				<li class="sublist" :class="{ active: isActive === 'personal-info' }">
					<router-link to="/personal-info">Personal</router-link>
				</li>
			</ul>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		isActive: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>
.sidebar-container {
	grid-column: 1 / 3;
}

.sidebar-container ul {
	list-style-type: none;
}

.sidebar-container a {
	text-decoration: none;
	color: black;
}

a:hover {
	color: grey;
}

.sublist {
	text-indent: 1rem;
}

.dashboard-ul {
	padding-bottom: 1rem;
}

.dashboard-ul > li:first-child a {
	font-weight: 800;
}

.dashboard-ul li {
	padding-bottom: 0.4rem;
}

.settings-ul > li:first-child {
	font-weight: 800;
}

.settings-ul li {
	padding-bottom: 0.4rem;
}

.active {
	font-weight: bold;
}
</style>
