<template>
	<div class="search-results-container" v-if="results">
		<h1 class="results-title">Search Results</h1>
		<div class="loading-container" v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<base-card class="all-results-container" v-if="!isLoading">
			<base-card class="result-item-container" v-for="result in arrSlice" :key="result">
				<router-link
					:to="'/search/results/' + result.recipe.slug"
					class="search-result-detail-link"
				>
					<h2 class="result-item-title" :title="result.recipe.label">{{ result.recipe.label }}</h2>
					<div class="img-container">
						<img :src="result.recipe.image" :alt="result.recipe.label" />
					</div>
				</router-link>
			</base-card>
			<font-awesome-icon :icon="['fas','angle-right']" @click="showNext" />
		</base-card>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";
// import { nanoid } from 'nanoid';
import slugify from 'slugify';

export default {
	data() {
		return {
			results: [],
			isLoading: false,
			currentIndex: 0,
			endIndex: 3,
			limit: 3
		};
	},
	methods: {
		openModal() {
			const modal = this.$refs.modal;
			modal.showModal();
		},
		closeModal() {
			const modal = this.$refs.modal;
			modal.close();
		},
		showNext() {
			if(this.endIndex + this.limit <= this.results.length) {
				this.currentIndex += this.limit;
				this.endIndex += this.limit;
			}
			else if(this.endIndex < this.results.length - 1) {
				const newLimit = this.results.length - this.endIndex; // 20 - 18 = 2
				this.currentIndex += this.limit;
				this.endIndex += newLimit;
			}
			else {
				this.currentIndex = 0;
				this.endIndex = this.limit;
			}
		},
		createSlug(label, id) {
			const slugifyLabel = slugify(label, { lower: true });
			// const fingerprint = nanoid();
			return `${slugifyLabel}-${id}`;
		},
		formatId(uri) {
			// http://www.edamam.com/ontologies/edamam.owl#recipe_6d47de136932beede90ff293797d2f4a
			const recipeWithId = uri.split('#')[1];
			const id = recipeWithId.split('recipe_')[1];
			return id;
		}
	},
	computed: {
		arrSlice() {
			return this.results ? this.results.slice(this.currentIndex, this.endIndex) : [];
		}
	},
	async created() {
		this.isLoading = true;

		// if there's a space in the query, replace with %20
		if (this.$route.query.q.indexOf(" ") !== -1) {
			this.$route.query.q = this.$route.query.q.replace(/\s+/g, "%20");
		}
		
		const res = await SearchService.searchByName(this.$route.query.q);
		console.log(res.data.hits);
		this.results = res.data.hits;
		this.isLoading = false;
		for(const result of this.results) {
			result.recipe.uri = this.formatId(result.recipe.uri);
			result.recipe.slug = this.createSlug(result.recipe.label, result.recipe.uri);
		}
	},
};
</script>

<style scoped>
.search-results-container > .all-results-container {
	max-width: 90rem;
	width: 95%;
	display: flex;
	justify-content: space-evenly;
	margin: 3rem auto;
	align-items: center;
	padding: 1rem 2rem 1rem 2rem;
	background: white;
}

.card > .result-item-container {
	max-height: 18rem;
	max-width: 22rem;
	width: 21rem;
}

.search-result-detail-link {
	text-decoration: none;
	color: black;
	cursor: pointer;
}

.loading-container {
	margin-top: 2rem;
}

.img-container {
	max-width: 16rem;
	display: flex;
	justify-content: center;
	margin: 0.9rem auto 0 auto;
}

.img-container img {
	border-radius: 1rem;
	max-width: 80%;
	max-height: 80%;
}

.results-title {
	text-align: center;
	margin-top: 3rem;
}

.result-item-title {
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
