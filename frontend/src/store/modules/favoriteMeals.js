export default {
    namespaced: true,
    state() {
        return {
            favoriteMeals: [
                {
                    id: '1',
                    title: 'Pasta',
                    imgLink: 'sample-logo.jpg'
                },
                {
                    id: '2',
                    title: 'Breaded Chicken',
                    imgLink: 'sample-logo.jpg'
                },
                {
                    id: '3',
                    title: 'California Pizza',
                    imgLink: 'sample-logo.jpg'
                },
                {
                    id: '4',
                    title: 'Burrito',
                    imgLink: 'sample-logo.jpg'
                },
                {
                    id: '5',
                    title: 'Street Tacos',
                    imgLink: 'sample-logo.jpg'
                },
                {
                    id: '6',
                    title: 'Chicken Taquitos',
                    imgLink: 'sample-logo.jpg'
                }
            ]
        }
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        favoriteMeals(state) {
            return state.favoriteMeals;
        },
    }
}