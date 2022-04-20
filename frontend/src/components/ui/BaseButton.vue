<template>
	<button v-if="!link">
		<slot></slot>
	</button>
	<router-link v-else :to="to">
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: [String, Object],
			required: false,
			default: "/",
		},
	},
};
</script>

<style scoped>
button,
a {
	text-decoration: none;
	padding: 0.5rem 1rem;
	font: inherit;
	background-color: #ffffff;
	border: 2px solid #94618e;
	color: black;
	cursor: pointer;
	border-radius: 14px;
	width: fit-content;
	transition: 0.7s;
}

a:hover,
a:active,
button:hover,
button:active {
	background-color: #94618e;
	border-color: #946183;
}
</style>
