<template>
	<dashboard-layout>
		<div class="all-goals-container">
			<header>
				<h2>Your Goals</h2>
				<h4>
					<router-link to="/add" class="add-new-goal-link">
						Add a new goal
						<font-awesome-icon :icon="['fas', 'plus']" />
					</router-link>
				</h4>
			</header>
			<base-card
				class="goal-item-container"
				v-for="goal in goals"
				:key="goal._id"
			>
				<h2 class="goal-title">{{ goal.title }}</h2>
				<div class="icons">
					<router-link :to="'/edit/' + goal._id">
						<font-awesome-icon :icon="['fas', 'pen']" />
					</router-link>
					<a href="">
						<font-awesome-icon
							@click="removeGoal($event, goal._id)"
							:icon="['fas', 'trash']"
						/>
					</a>
				</div>
				<h4 class="goal-started-date">{{ goal.startDate }}</h4>
			</base-card>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../../components/layout/DashboardLayout.vue";
import GoalService from "../../services/GoalService";

export default {
	components: {
		DashboardLayout,
	},
	data() {
		return {
			goals: null,
		};
	},
	methods: {
		async removeGoal(event, id) {
			event.preventDefault();
			const res = await GoalService.delete(id);
			const deletedGoal = res.data;
			this.goals = this.goals.filter((goal) => goal._id !== deletedGoal._id);
		},
	},
	async created() {
		const res = await GoalService.getAll();
		this.goals = res.data;
	},
};
</script>

<style scoped>
.all-goals-container {
	padding-left: 2rem;
	display: grid;
	grid-auto-rows: min-content;
	padding: 1rem 2rem 2rem 2rem;
	row-gap: 2rem;
}

.all-goals-container header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	height: min-content;
}

.all-goals-container header i {
	padding-left: 0.5rem;
}

.all-goals-container > .goal-item-container {
	margin: 0;
	width: 40rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.add-new-goal-link {
	text-decoration: none;
	color: black;
}

/* if device width is greater than or equal to 70rem */
@media screen and (min-width: 70rem) {
	.all-goals-container > .goal-item-container {
		max-width: 50rem;
		width: 30rem;
	}
}

/* if device width is greater than or equal to 80rem */
@media screen and (min-width: 80rem) {
	.all-goals-container > .goal-item-container {
		max-width: 50rem;
		width: 50rem;
	}
}

.goal-title {
	grid-column: 1 / 4;
}

.goal-started-date {
	grid-column: 1 / 5;
	grid-row: 2 / 3;
	text-indent: 1rem;
	font-size: 0.8rem;
}

.icons {
	grid-column: 4 / 5;
	display: flex;
	justify-content: flex-end;
}

.icons a {
	padding: 0.8rem 1rem 0.5rem 1rem;
	color: black;
}

a:hover {
	color: grey;
}
</style>
