import { createStore } from "vuex";
import dashboardPageModule from "./modules/dashboardPage.js";
import goalsModule from "./modules/goals.js";
import favoriteMealsModule from "./modules/favoriteMeals.js";
import upcomingMealsModule from "./modules/upcomingMeals.js";
import budgetModule from "./modules/budget.js";
import accountInfoModule from "./modules/accountInfo.js";
import personalInfoModule from "./modules/personalInfo.js";
import searchResultsModule from "./modules/searchResults.js";

export default createStore({
	modules: {
		dashboardPage: dashboardPageModule,
		goals: goalsModule,
		favoriteMeals: favoriteMealsModule,
		upcomingMeals: upcomingMealsModule,
		budget: budgetModule,
		accountInfo: accountInfoModule,
		personalInfo: personalInfoModule,
		searchResults: searchResultsModule,
	},
	state: {
		// return {}
	},
	mutations: {
		//directly editing state is not ideal so use mutations
		// in methods, this.$store.commit('mutation-name')
		/* 
    increase(state, payload) {
      state.counter = state.counter + payload.value (assuming payload is an object);
    }

    this.$store.commit('increase', {value: 10});

    OR 

    this.$store.commit({
      type: 'increase',
      value: 10
    });
    */
	},
	actions: {
		// async code (http requests)
		// mutations must be synchronous b/c every mutation should get the latest state
		// actions commit mutations
		// considered good practice to always use actions to commit mutations. to ensure you don't accidentally put asynchronous code in mutations
		/*
    increase(context) { 
      setTimeout blah blah asynchronous code
      context.commit('mutation-name', possible-payload);
    } 

    this.$store.dispatch('increase', {value: 10});

    can dispatch another action within an action
    can access getters
    can access state

    */
	},
	getters: {
		// directly reading state is not ideal b/c you may want to format or calculate the data differently so put in getters so you don't change it in multiple places
		// in a computed property, return this.$store.getters['namespace/getter-name']
		/*
    finalCounter(state, getters) {
      return state.counter * 2;
    }

    normalizedCounter(state, getters) {
      const finalCounter = getters.finalCounter;
      if...
    }

    return this.$store.getters.finalCounter;
    */
	},
});
