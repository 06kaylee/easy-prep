<template>
	<base-card>
		<div class="container">
			<form>
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
.container {
	max-width: 24rem;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-auto-rows: auto;
	padding: 1.5rem 0 1.5rem 0;
}

form {
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
}

.form-control label {
	display: block;
}

.form-control input {
	outline: none;
}

#email:focus {
	border: 2px solid #688c6a;
}

#password:focus {
	border: 2px solid #688c6a;
}

.btn-container {
	text-align: center;
}
</style>
