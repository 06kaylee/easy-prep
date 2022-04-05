export default {
    namespaced: true,
    state() {
        return {
            restrictions: [
                {
                    id: '1',
                    category: 'Dietary Restrictions',
                    restrictionItems: ['Gluten Free', 'Vegan']
                },
                {
                    id: '2',
                    category: 'Allergies',
                    restrictionItems: ['Mustard', 'Peanuts']
                },
                {
                    id: '3',
                    category: 'Disliked Items',
                    restrictionItems: ['Celery', 'Cod']
                }
            ]
        }
    },
    mutations: {
        removeItem(state, payload) {
            // given an id and the restriction item name

            // get the restriction
            const restriction = state.restrictions.find(restriction => restriction.id === payload.id);

            // remove the item from array
            const updatedRestricionItems = restriction.restrictionItems.filter((item) => item !== payload.item);

            // get the restriction index that I want to edit
            const restrictionIndex = state.restrictions.findIndex((restriction) => restriction.id === payload.id);

            // replace the current array with the updated one
            state.restrictions[restrictionIndex].restrictionItems = updatedRestricionItems;
        }
    },
    actions: {
        removeItem(context, payload) {
            context.commit('removeItem', payload);
        }
    },
    getters: {
        restrictions(state) {
            return state.restrictions;
        },
    }
};