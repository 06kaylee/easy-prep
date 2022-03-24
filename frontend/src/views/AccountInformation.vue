<template>
	<dashboard-layout changeWidth>
		<div class="main-container">
			<header>
				<h2>Your Account Information</h2>
				<a href="">
					<i class="fa-solid fa-pen"></i>
				</a>
			</header>
			<div class="info-container">
				<ul>
					<li>
						<label for="email">Email</label>
						<br />
						<input
							type="text"
							id="email"
							value="06.kaylee@gmail.com"
							readonly
						/>
					</li>
					<li>
						<label for="password">Password</label>
						<br />
						<input type="text" id="password" value="abc123" readonly />
					</li>
					<li>This account has been active for 2 years.</li>
				</ul>
			</div>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../components/layout/DashboardLayout.vue";

export default {
	components: {
		DashboardLayout,
	},
};
</script>

<style scoped>
.main-container {
	padding: 0.5rem 2rem 0 2rem;
}

.main-container header {
	display: flex;
	justify-content: space-between;
}

.fa-pen {
	color: black;
}

.info-container {
	display: grid;
}

.info-container ul {
	list-style-type: none;
}

.info-container li {
	padding: 2rem 0 1rem 0;
}

.info-container input {
	padding: 0.5rem;
	border: 1px solid #cfd4d1;
	margin-top: 1rem;
}

.info-container input:focus {
	outline: none;
	border: 1px solid #a4a6a5;
}

.info-container label {
	font-weight: 700;
}

a:hover,
.fa-pen:hover {
	color: grey;
}
</style>
