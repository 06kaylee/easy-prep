<template>
	<span>
		<font-awesome-icon
			v-if="clicked"
			:icon="['fas', 'star']"
			@click="clickedStar"
		/>
		<font-awesome-icon v-else :icon="['far', 'star']" @click="clickedStar" />
	</span>
</template>

<script>
export default {
	props: {
		index: {
			type: Number,
			required: true,
		},
		clicked: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["star-clicked"],
	methods: {
		clickedStar() {
			this.$emit("star-clicked", this.index);
		},
	},
};
</script>
