export default {
	namespaced: true,
	state() {
		return {
			results: [],
		};
	},
	mutations: {
		addResults(state, payload) {
			// if (state.results.length > 0) {
			// 	console.log("CLEARING...");
			// 	state.results.length = 0;
			// }
			state.results.push(payload);
		},
	},
	actions: {
		addResults(context, payload) {
			context.commit("addResults", payload);
		},
	},
	getters: {
		results(state) {
			return state.results;
		},
	},
};
