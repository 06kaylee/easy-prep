<template>
	<div class="page-container">
		<base-card class="remaining-page-container">
			<slot></slot>
		</base-card>
	</div>
</template>

<style scoped>
.page-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	/* minmax defines a size range greater than or equal to min and less than or equal to max */
	grid-gap: 1rem;
	background: #f8eee7;
}

.page-container > .remaining-page-container {
	grid-column: 3 / 13;
	max-height: 86vh;
	max-width: 90rem;
	width: 80rem;
	height: fit-content;
	overflow: auto;
	background: white;
}

::-webkit-scrollbar {
    width: 1.5em;
}

::-webkit-scrollbar-track {
    background: white;
	border-radius: 100vh;
	margin-block: 0.4em;
}

::-webkit-scrollbar-thumb {
    background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}

@supports (scrollbar-color: #f4d3cb white) {
	* {
		scrollbar-color: #f4d3cb white;
	}
}
</style>
