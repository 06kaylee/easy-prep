<template>
	<div class="personal-info-container">
		<header>
			<h2>Your Personal Information</h2>
		</header>
		<div class="info-container">
			<base-card v-for="restriction in restrictions" :key="restriction.id">
				<header>
					<h3>{{ restriction.category }}</h3>
					<router-link :to="'/add-personal-info/' + restriction.id">
						<font-awesome-icon :icon="['fas', 'plus']" />
					</router-link>
				</header>
				<ul>
					<li
						v-for="restrictionItem in restriction.restrictionItems"
						:key="restrictionItem"
					>
						{{ restrictionItem }}
						<a
							href=""
							@click="removeItem($event, restriction.id, restrictionItem)"
						>
							<font-awesome-icon :icon="['fas', 'x']" />
						</a>
					</li>
				</ul>
			</base-card>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		restrictions() {
			return this.$store.getters["personalInfo/restrictions"];
		},
	},
	methods: {
		removeItem(event, id, restrictionItem) {
			event.preventDefault();
			this.$store.dispatch("personalInfo/removeItem", {
				id,
				item: restrictionItem,
			});
		},
	},
};
</script>

<style scoped>
.personal-info-container {
	padding: 0.5rem 2rem 0 2rem;
}

.personal-info-container header {
	display: flex;
	justify-content: space-between;
}

.fa-pen {
	color: black;
}

.info-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}

@media screen and (max-width: 65rem) {
	.info-container {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (max-width: 45rem) {
	.info-container {
		grid-template-columns: 1fr;
	}
}

.info-container .card {
	max-width: 15rem;
	margin: 2rem 0;
}

.info-container .card header {
	display: flex;
	justify-content: space-between;
}

.info-container .card ul {
	list-style-type: none;
	padding-top: 1.5rem;
}

.info-container .card li {
	padding-bottom: 1.5rem;
}

.fa-pen {
	color: black;
}

.fa-x {
	color: red;
	opacity: 0.5;
	padding-left: 0.5rem;
}

.fa-x:hover {
	opacity: 1;
	transition: 0.4s;
}

.fa-plus {
	color: black;
}

a:hover,
.fa-pen:hover {
	color: grey;
}
</style>
