<template>
	<button v-if="!link" :class="mode">
		<slot></slot>
	</button>
	<router-link v-else :to="to" :class="mode">
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
		mode: {
			type: String,
			required: false,
			default: null,
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
	transition: 0.4s;
}

a:hover,
a:active,
button:hover,
button:active {
	background-color: #94618e;
	border-color: #946183;
}

.flat {
	background-color: transparent;
	color: #946183;
	border: none;
}

.outline {
	background-color: transparent;
	border-color: #94618e;
	color: #94618e;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
	background-color: #946183;
}
</style>
