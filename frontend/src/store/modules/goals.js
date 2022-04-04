export default {
	namespaced: true,
	state() {
		return {
			goals: [
				{
					id: "1",
					title: "Lose 10 pounds",
					category: "fitness",
					startDate: "2022-04-01",
					endDate: "2022-04-30",
				},
				{
					id: "2",
					title: "No sugar for a month",
					category: "nutrition",
					startDate: "2022-03-04",
					endDate: "2022-07-31",
				},
				{
					id: "3",
					title: "Build muscle",
					category: "fitness",
					startDate: "2022-01-01",
					endDate: "2022-12-31",
				},
			],
		};
	},
	mutations: {
		removeGoal(state, id) {
			state.goals = state.goals.filter((goal) => goal.id !== id);
		},
		addGoal(state, payload) {
			state.goals.push(payload);
		},
	},
	actions: {
		removeGoal(context, id) {
			console.log(id);
			context.commit("removeGoal", id);
		},
		addGoal(context, payload) {
			context.commit("addGoal", payload);
		},
	},
	getters: {
		goals(state) {
			return state.goals;
		},
	},
};
