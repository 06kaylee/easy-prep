export default {
	namespaced: true,
	state() {
		return {
			upcomingMeals: [
				{
					dayOfWeek: "Mon",
					meals: [
						{
							id: "1",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "2",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "3",
							item: "Steak and Potatoes",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 1000,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							userInput: true,
						},
					],
				},
				{
					dayOfWeek: "Tues",
					meals: [
						{
							id: "4",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							userInput: true,
						},
						{
							id: "5",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "6",
							item: "Steak and Potatoes",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 1000,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
					],
				},
				{
					dayOfWeek: "Wed",
					meals: [
						{
							id: "7",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							userInput: true,
						},
						{
							id: "8",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
					],
				},
				{
					dayOfWeek: "Thurs",
					meals: [
						{
							id: "9",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							userInput: true,
						},
						{
							id: "10",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
					],
				},
				{
					dayOfWeek: "Fri",
					meals: [
						{
							id: "11",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "12",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
					],
				},
				{
					dayOfWeek: "Sat",
					meals: [
						{
							id: "13",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "14",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "15",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							userInput: true,
						},
					],
				},
				{
					dayOfWeek: "Sun",
					meals: [
						{
							id: "16",
							item: "Eggs and Bacon",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 600,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "17",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							notes: ['Cook the eggs at low temperature instead of medium.', 'Buy block of cheese instead of shredded cheese.'],
							recipeUrl: "https://www.google.com",
						},
						{
							id: "18",
							item: "Sandwich",
							img: "sample-logo.jpg",
							nutritionFacts: {
								calories: 500,
								totalFat: 8,
								cholesterol: 0,
								sodium: 160,
								totalCarbs: 37,
								protein: 3,
							},
							ingredients: ["4 eggs", "3 strips of bacon", "1 pound of cheese"],
							steps: [
								"Crack the eggs",
								"Cook the bacon at medium temperature",
								"Once eggs are done, sprinkle cheese on top",
							],
							recipeUrl: "https://www.google.com",
						},
					],
				},
			],
		};
	},
	mutations: {
		addMeal(state, payload) {
			// find correct day
			const mealsForDay = state.upcomingMeals.find(meals => meals.dayOfWeek === payload.dayOfWeek).meals;

			const mealsForDayIndex = state.upcomingMeals.findIndex(meals => meals.dayOfWeek === payload.dayOfWeek);

			console.log(mealsForDay, mealsForDayIndex);

			// push meal to meals array
			mealsForDay.push(payload.newMeal);

			// set state to updated meals array
			state.upcomingMeals[mealsForDayIndex].meals = mealsForDay;
		}
	},
	actions: {
		addMeal(context, payload) {
			context.commit('addMeal', payload);
		}
	},
	getters: {
		upcomingMeals(state) {
			return state.upcomingMeals;
		},
	},
};
