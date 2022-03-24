<template>
	<base-card>
		<div class="container">
			<div class="img-container">
				<img src="../../assets/sample-img.jpg" alt="" />
			</div>
			<form>
				<div class="form-control">
					<label for="email">Email</label>
					<input type="text" id="email" name="email" />
				</div>

				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" />
				</div>

				<base-button>Login</base-button>
			</form>
		</div>
	</base-card>
</template>

<style scoped>
.container {
	max-width: 30rem;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-auto-rows: minmax(min-content, max-content);
}

form {
	grid-column: 2 / 3;
	grid-row: 1 / 3;
	display: flex;
	flex-wrap: wrap;
	align-content: center;
}

.form-control label {
	display: block;
}

.form-control input {
	outline: none;
	margin-top: 0.5rem;
	margin-bottom: 1.5rem;
	border: 1px solid black;
	border-radius: 6px;
	padding: 4px;
}

#email:focus {
	border: 2px solid #688c6a;
}

#password:focus {
	border: 2px solid #688c6a;
}

.img-container {
	max-width: 300px;
	max-height: 300px;
	grid-column: 7 / 10;
	grid-row: 1 / 3;
	padding: 1rem 1rem 1rem 0;
}

.img-container img {
	max-width: 100%;
	max-height: 100%;
}
</style>
