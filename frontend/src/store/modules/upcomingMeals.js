export default {
    namespaced: true,
    state() {
        return {
            upcomingMeals: [
                {
                    dayOfWeek: 'Mon',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                        {
                            item: 'Steak and Potatoes',
                            calorieCount: 1000,
                        },
                        {
                            item: 'Steak and Potatoes',
                            calorieCount: 1000,
                        },
                        {
                            item: 'Steak and Potatoes',
                            calorieCount: 1000,
                        }
                    ]
                },
                {
                    dayOfWeek: 'Tues',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                        {
                            item: 'Steak and Potatoes',
                            calorieCount: 1000,
                        },
                    ]
                },
                {
                    dayOfWeek: 'Wed',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                    ]
                },
                {
                    dayOfWeek: 'Thurs',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                    ]
                },
                {
                    dayOfWeek: 'Fri',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                    ]
                },
                {
                    dayOfWeek: 'Sat',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                    ]
                },
                {
                    dayOfWeek: 'Sun',
                    meals: [
                        {
                            item: 'Eggs and Bacon',
                            calorieCount: 600,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                        {
                            item: 'Sandwich',
                            calorieCount: 500,
                        },
                    ]
                },
            ]
        }
    },
    mutations: {},
    actions: {},
    getters: {
        upcomingMeals(state) {
            return state.upcomingMeals;
        },
    }
};