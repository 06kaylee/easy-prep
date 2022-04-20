<template>
	<div class="container">
		<base-card>
			<the-sidebar :isActive="isActive"></the-sidebar>
		</base-card>

		<base-card :class="{ 'page-width': changeWidth }">
			<slot></slot>
		</base-card>
	</div>
</template>

<script>
import TheSidebar from "./TheSidebar.vue";
export default {
	components: {
		TheSidebar,
	},
	props: {
		changeWidth: {
			type: Boolean,
			required: false,
			default: false,
		},
		isActive: {
			type: String,
		},
	},
};
</script>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	/* minmax defines a size range greater than or equal to min and less than or equal to max */
	grid-gap: 1rem;
	background: #f8eee7;
}

.card:nth-of-type(1) {
	grid-column: 1 / 3;
	margin: 2rem 0 1rem 1rem;
	max-height: 100vh;
	height: 86vh;
	background: white;
}

.card:nth-of-type(2) {
	grid-column: 3 / 13;
	margin: 2rem 2rem 1rem 1rem;
	height: fit-content;
	background: white;
}

.page-width {
	max-width: 95% !important;
}
</style>
