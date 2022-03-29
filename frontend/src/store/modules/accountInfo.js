export default {
    namespaced: true,
    state() {
        return {
            email: '06.kaylee@gmail.com',
            password: 'abc123',
            timeSinceAccountCreation: 4
        }
    },
    mutations: {},
    actions: {},
    getters: {
        email(state) {
            return state.email;
        },
        password(state) {
            return state.password;
        },
        timeSinceAccountCreation(state) {
            return state.timeSinceAccountCreation;
        }
    },
};