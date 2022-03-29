export default {
    namespaced: true,
    state() {
        return {
            restrictions: {
                dietary: {
                    category: 'Dietary Restrictions',
                    restrictionItems: ['Gluten Free', 'Vegan']
                },
                allergies: {
                    category: 'Allergies',
                    restrictionItems: ['Mustard', 'Peanuts']
                },
                dislikes: {
                    category: 'Disliked Items',
                    restrictionItems: ['Celery', 'Cod']
                }
            }
        }
    },
    mutations: {},
    actions: {},
    getters: {
        restrictions(state) {
            return state.restrictions;
        }
    }
};