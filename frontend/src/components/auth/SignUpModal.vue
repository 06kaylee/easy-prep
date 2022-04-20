<template>
	<base-card class="sign-up-base-card">
		<div class="sign-up-container">
			<form class="sign-up-form">
				<div class="form-control">
					<label for="email">Email</label>
					<input type="text" id="email" name="email" />
				</div>

				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" />
				</div>
				<div class="btn-container">
					<base-button>Sign Up</base-button>
				</div>
			</form>
		</div>
	</base-card>
</template>

<style scoped>
.sign-up-base-card {
	background: white;
}

.sign-up-container {
	max-width: 24rem;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-auto-rows: auto;
	padding: 1.5rem 0 1.5rem 0;
}

.sign-up-form {
	grid-column: 4 / 8;
	display: flex;
	flex-wrap: wrap;
	place-content: center;
}

.form-control input {
	margin-top: 0.5rem;
	margin-bottom: 1.5rem;
	border: 1px solid black;
	border-radius: 6px;
	padding: 4px;
	outline: none;
}

.form-control label {
	display: block;
}

.btn-container {
	text-align: center;
}
</style>
