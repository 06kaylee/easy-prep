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
	background-color: white;
	border: 2px solid #c7d8c6;
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
	background-color: #a0dba4;
	border-color: #a0dba4;
}

.flat {
	background-color: transparent;
	color: #688c6a;
	border: none;
}

.outline {
	background-color: transparent;
	border-color: #688c6a;
	color: #688c6a;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
	background-color: #edd2ff;
}
</style>
