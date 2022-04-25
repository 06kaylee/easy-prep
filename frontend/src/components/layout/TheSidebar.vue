<template>
	<div class="sidebar">
		<ul class="dashboard-ul">
			<li>
				<router-link to="/dashboard" class="dashboard-ul-header" :class="{ active: isActive === 'favorite-meals' }">Dashboard</router-link>
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
				<li class="sublist" :class="{ active: isActive === 'grocery-list' }">
					<router-link to="/grocery-list">Grocery List</router-link>
				</li>
			</ul>
		</ul>

		<ul class="settings-ul">
			<li class="settings-ul-header">
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
.sidebar ul {
	list-style-type: none;
}

.sidebar a {
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

.dashboard-ul-header,
.settings-ul-header {
	font-weight: 800;
}

.dashboard-ul li,
.settings-ul li {
	padding-bottom: 0.4rem;
}

.active {
	font-weight: bold;
}
</style>
