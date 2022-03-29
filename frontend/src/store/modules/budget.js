export default {
    namespaced: true,
    state() {
        return {
            budgets: {
                groceries: {
                    category: 'Groceries',
                    stats: {
                        targetAmount: 80,
                        currentTotal: 40,
                        avgSpent: 77,
                        mostExpensive: ['Almonds', 'Olive Oil', 'Eggs']
                    }
                },
                diningOut: {
                    category: 'Dining Out',
                    stats: {
                        targetAmount: 60,
                        currentTotal: 50,
                        avgSpent: 55,
                        mostExpensive: ['Olive Garden', 'Brazilian Steakhouse', 'Asian Bistro']
                    }
                }
            }
        }
    },
    mutations: {},
    actions: {},
    getters: {
        budgets(state) {
            return state.budgets;
        }
    }
};