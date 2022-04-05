export default {
	namespaced: true,
	state() {
		return {
			budgets: [
				{
					id: "1",
					category: "Groceries",
					stats: {
						timeline: "month",
						targetAmount: 80,
						currentTotal: 40,
						avgSpent: 77,
						mostExpensive: ["Almonds", "Olive Oil", "Eggs"],
					},
				},
				{
					id: "2",
					category: "Dining Out",
					stats: {
						timeline: "week",
						targetAmount: 60,
						currentTotal: 50,
						avgSpent: 55,
						mostExpensive: [
							"Olive Garden",
							"Brazilian Steakhouse",
							"Asian Bistro",
						],
					},
				},
			],
		};
	},
	mutations: {},
	actions: {},
	getters: {
		budgets(state) {
			return state.budgets;
		},
	},
};
