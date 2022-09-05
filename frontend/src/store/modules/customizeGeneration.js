export default {
    namespaced: true,
    state() {
        return {
            numMeals: null,
            daysPicked: null,
        }
    },
    mutations: {
        setNumMeals(state, numMeals) {
            state.numMeals = numMeals;
        },
        setDaysPicked(state, daysPicked) {
            state.daysPicked = daysPicked;
        }
    },
    actions: {
        setNumMeals(context, numMeals) {
            context.commit('setNumMeals', numMeals);
        },
        setDaysPicked(context, daysPicked) {
            context.commit('setDaysPicked', daysPicked);
        }
    },
    getters: {
        numMeals(state) {
            return state.numMeals;
        },
        daysPicked(state) {
            return state.daysPicked;
        }
    }
}