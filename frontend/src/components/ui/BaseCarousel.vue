<template>
	<div class="baseCarousel">
		<div class="baseCarousel_content">
			<slot name="content" />
		</div>
		<div v-if="hasItems && items?.length > 1" class="baseCarousel_icon">
			<base-button
				class="baseCarousel_icon_btn"
				:disabled="!hasItems"
				@click="next"
			>
				<font-awesome-icon :icon="['fas', 'angle-right']" />
			</base-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: () => [],
			required: true,
		},
	},
	computed: {
		hasItems() {
			return this.items && this.items.length;
		},
	},
	methods: {
		next() {
			this.$emit("next");
		},
	},
};
</script>

<style lang="scss" scoped>
.baseCarousel {
	display: flex;
	align-items: center;
	gap: 2rem;
}
</style>
