<template>
	<div class="search-results-container" v-if="results">
		<h1 class="results-title">Search Results</h1>
		<div class="loading-container" v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<base-card class="all-results-container" v-if="!isLoading">
			<base-card class="result-item-container" v-for="result in results" :key="result">
				<router-link
					:to="'/search/results/' + result.id"
					class="search-result-detail-link"
				>
					<h2 class="result-item-title">{{ result.title }}</h2>
					<div class="img-container">
						<img :src="result.image" alt="result.title" />
					</div>
				</router-link>
			</base-card>
		</base-card>
	</div>
</template>

<script>
import SearchService from "../../services/SearchService";

export default {
	data() {
		return {
			results: [],
			isLoading: false,
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
	},
	async created() {
		this.isLoading = true;
		console.log(this.$route.query);
		if (this.$route.query.q.indexOf(" ") !== -1) {
			this.$route.query.q = this.$route.query.q.replace(/\s+/g, "&");
			console.log(this.$route.query.q);
		}
		console.log(this.$route.query.q);
		const res = await SearchService.searchByName(this.$route.query.q);
		console.log(res);
		// const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${this.$route.query.q}&number=3&apiKey=442a798793cb4b3db353b620dda6dea3`);
		console.log(res.data.results);
		this.results = res.data.results;
		this.isLoading = false;
	},
};
</script>

<style scoped>
.search-results-container > .all-results-container {
	max-width: 70rem;
	width: 80%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin: 3rem auto;
	align-items: center;
	column-gap: 2rem;
	padding: 1rem 2rem 1rem 2rem;
	background: white;
}

.result-item-container {
	height: max(87%, 16rem);
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
}
</style>
