export default {
	namespaced: true,
	state() {
		return {
			lastMonthMoneySpent: 200,
			upcomingMeals: [
				{
					dayOfWeek: "Mon",
					mealItem: "Chicken",
				},
				{
					dayOfWeek: "Tues",
					mealItem: "Pasta",
				},
				{
					dayOfWeek: "Wed",
					mealItem: "Pizza",
				},
				{
					dayOfWeek: "Thurs",
					mealItem: "Taquitos",
				},
				{
					dayOfWeek: "Fri",
					mealItem: "Tacos",
				},
				{
					dayOfWeek: "Sat",
					mealItem: "Stew",
				},
				{
					dayOfWeek: "Sun",
					mealItem: "Burgers",
				},
			],
		};
	},
	mutations: {},
	actions: {},
	getters: {
		numFavoriteMeals(_, _2, _3, rootGetters) {
			return rootGetters["favoriteMeals/favoriteMeals"].length;
		},
		numGoals(_, _2, _3, rootGetters) {
			return rootGetters["goals/goals"].length;
		},
		numDietaryRestrictions(_, _2, _3, rootGetters) {
			return rootGetters["personalInfo/restrictions"].dietary.restrictionItems
				.length;
		},
		currentMonthMoneySpent(_1, _2, _3, rootGetters) {
			const groceriesTotal =
				rootGetters["budget/budgets"][0].stats.currentTotal;
			const diningOutTotal =
				rootGetters["budget/budgets"][1].stats.currentTotal;
			const currentMonthTotal = groceriesTotal + diningOutTotal;
			return currentMonthTotal;
		},
		lastMonthMoneySpent(state) {
			return state.lastMonthMoneySpent;
		},
		upcomingMeals(_, _2, _3, rootGetters) {
			const upcomingMeals = rootGetters["upcomingMeals/upcomingMeals"];
			const upcomingMealsSummary = [];
			for (const upcomingMeal of upcomingMeals) {
				const meal = {};
				meal["dayOfWeek"] = upcomingMeal.dayOfWeek;
				meal["numOfMealsPlanned"] = upcomingMeal.meals.length;
				upcomingMealsSummary.push(meal);
			}
			return upcomingMealsSummary;
		},
	},
};
