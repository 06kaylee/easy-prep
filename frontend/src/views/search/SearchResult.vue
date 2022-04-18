<template>
	<div v-if="results">
		<h1 class="result-title">Search Results</h1>
		<div class="loading-container" v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<base-card class="results-container" v-if="!isLoading">
			<base-card v-for="result in results" :key="result">
				<router-link
					:to="'/search/results/' + result.id + '?q=' + this.$route.query.q"
				>
					<h2 class="title">{{ result.title }}</h2>
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
		const res = await SearchService.searchByName(this.$route.query.q);
		console.log(res.data.results);
		this.results = res.data.results;
		this.$store.dispatch("searchResults/addResults", this.results);
		this.isLoading = false;
	},
};
</script>

<style scoped>
div > .results-container {
	max-width: 70rem;
	width: 80%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin: 3rem auto;
	align-items: center;
	column-gap: 2rem;
	padding: 1rem 2rem 1rem 2rem;
}

div > .results-container > .card {
	height: max(87%, 16rem);
}

div > .results-container > .card > a {
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
	max-width: 80%;
	max-height: 80%;
}

.result-title {
	text-align: center;
	margin-top: 3rem;
}

.title {
	text-align: center;
}
</style>
