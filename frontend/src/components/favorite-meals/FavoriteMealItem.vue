<template>
	<base-card class="FavoriteMealItem">
		<div class="FavoriteMealItem_imgContainer">
			<img :src="img" :alt="itemName" />
		</div>
		<div class="FavoriteMealItem_recipeContent">
			<h3 class="FavoriteMealItem_recipeContent_name" :title="itemName">
				{{ itemName }}
			</h3>

			<div class="FavoriteMealItem_recipeContent_fastInfo">
				<p>
					<span>{{ readyTime }}</span> minutes
				</p>
				<p>
					<span>{{ servings }}</span> servings
				</p>
			</div>
			<div class="FavoriteMealItem_recipeContent_rating">
				<span v-for="index in 5" :key="index">
					<font-awesome-icon
						v-if="isStarIncluded(index)"
						:icon="['fas', 'star']"
					/>
					<font-awesome-icon v-else :icon="['far', 'star']" />
				</span>
			</div>
		</div>
		<div class="FavoriteMealItem_btnContainer">
			<base-button link :to="favoriteMealDetailLink"> See More </base-button>
		</div>
	</base-card>
</template>

<script>
// import FavoriteMealItemLabel from "./FavoriteMealItemLabel.vue";

export default {
	// components: {
	// 	FavoriteMealItemLabel,
	// },
	props: {
		id: {
			type: String,
			required: true,
		},
		itemName: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		readyTime: {
			type: Number,
			required: true,
		},
		rating: {
			type: Array,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		servings: {
			type: Number,
			required: true,
		},
	},
	computed: {
		favoriteMealDetailLink() {
			return this.$route.path + "/" + this.id;
		},
	},
	methods: {
		isStarIncluded(index) {
			return this.rating.includes(index);
		},
	},
};
</script>

<style lang="scss" scoped>
div .FavoriteMealItem {
	padding: 0rem;
	margin: 0rem;
	max-width: 20rem;
	max-height: 22rem;
	width: 15rem;
	height: 21rem;
	position: relative;

	&_recipeLink {
		text-decoration: none;
		color: black;
	}

	&_imgContainer {
		display: flex;
		justify-content: center;
		width: 100%;

		img {
			width: 100%;
			max-height: 153px;
			object-fit: cover;
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}
	}

	&_recipeContent {
		display: grid;
		gap: 0.7rem;
		padding: 1rem;

		&_name {
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&_label {
			margin: auto;
		}

		&_fastInfo {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			p {
				text-align: center;

				&:first-of-type {
					border-right: 2px solid lightgrey;
					padding-right: 0.5rem;
				}

				&:nth-of-type(2) {
					padding-left: 0.5rem;
				}

				span {
					display: block;
					font-weight: bold;
					font-size: 1.2rem;
				}
			}
		}

		&_rating {
			text-align: center;
		}
	}

	&_btnContainer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		a {
			display: block;
			text-align: center;
			width: 100%;
			height: 3rem;
			border: none;
			border-top: 2px solid #94618e;
			border-radius: 0 0 14px 14px;
			font-weight: bold;
			color: #5e405a;
			transition: 0.45s;

			&:hover {
				color: white;
			}
		}
	}
}
</style>
