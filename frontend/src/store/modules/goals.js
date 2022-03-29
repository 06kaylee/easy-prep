export default {
	namespaced: true,
	state() {
		return {
			goals: [
				{
					id: 1,
					title: "Lose 10 pounds",
					startDate: "Started 10 months ago",
				},
				{
					id: 2,
					title: "No sugar for a month",
					startDate: "19 days to go",
				},
				{
					id: 3,
					title: "Build muscle",
					startDate: "Started 5 months ago",
				},
			],
		};
	},
	mutations: {
		removeGoal(state, id) {
			state.goals = state.goals.filter((goal) => goal.id !== id);
		},
	},
	actions: {
		removeGoal(context, id) {
			console.log(id);
			context.commit("removeGoal", id);
		},
	},
	getters: {
		goals(state) {
			return state.goals;
		},
	},
};
