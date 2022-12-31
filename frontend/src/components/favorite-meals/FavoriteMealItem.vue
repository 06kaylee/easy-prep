<template>
	<base-card class="FavoriteMealItem">
		<div class="FavoriteMealItem_recipeContent">
			<div class="FavoriteMealItem_recipeContent_imgContainer">
				<img :src="mealImgLink" :alt="itemName" />
			</div>
			<h3 class="FavoriteMealItem_recipeContent_name" :title="itemName">{{ itemName }}</h3>
			<p class="FavoriteMealItem_recipeContent_label">Intermediate</p>
			<div class="FavoriteMealItem_recipeContent_fastInfo">
				<p><span>{{ readyTime }}</span> minutes</p>
				<p><span>{{ servings }}</span> servings</p>
			</div>
			<div class="FavoriteMealItem_recipeContent_rating">
				<span v-for="index in 5" :key="index">
					<favorite-meal-item-rating></favorite-meal-item-rating>
				</span>
			</div>
		</div>
		<div class="FavoriteMealItem_btnContainer">
			<base-button link :to="favoriteMealDetailLink">
				See More
			</base-button>
		</div>
	</base-card>
</template>

<script>
import FavoriteMealItemRating from "./FavoriteMealItemRating.vue";

export default {
	components: {
		FavoriteMealItemRating
	},
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
			required: true
		},
		servings: {
			type: Number,
			required: true
		}
	},
	computed: {
		favoriteMealDetailLink() {
			return this.$route.path + "/" + this.id;
		},
		mealImgLink() {
			return this.img === "sample-logo.jpg"
				? require("../../assets/" + this.img)
				: this.img;
		},
	},
};
</script>

<style lang="scss" scoped>
div .FavoriteMealItem {
	padding: 1rem;
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

	&_recipeContent {
		display: grid;
		gap: 0.7rem;

		&_name {
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&_imgContainer {
			display: flex;
			justify-content: center;

			img {
				max-width: 100px;
				max-height: 100px;
			}
		}

		&_label {
			text-align: center;
			background: lightblue;
			color: darkcyan;
			width: fit-content;
			padding: 0.2rem;
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
