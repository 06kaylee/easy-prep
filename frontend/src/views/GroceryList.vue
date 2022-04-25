<template>
	<dashboard-layout changeWidth isActive="grocery-list">
		<div class="grocery-list-container">
			<header>
				<h2>Your Grocery List</h2>
			</header>

			<div class="grocery-list-form-container">
                <form class="grocery-list-form">
                    <div class="ingredient-container" v-for="ingredient in uniqueIngredients" :key="ingredient">
                        <input type="checkbox" :id="ingredient" :name="ingredient" :value="ingredient" @click="toggleChecked(ingredient)">
                        <label v-if="counts[ingredient] === 1" :for="ingredient" :class="{ 'checked-input': isChecked[ingredient] }">{{ ingredient }}</label>
                        <label v-else-if="counts[ingredient] > 1" :for="ingredient" :class="{ 'checked-input': isChecked[ingredient] }">
                            {{ ingredient }}<span class="ingredient-count-span"> x{{ counts[ingredient] }}</span>
                        </label>
                    </div>
                </form>
            </div>
		</div>
	</dashboard-layout>
</template>

<script>
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import UpcomingMealService from "../services/UpcomingMealService";

export default {
	components: {
		DashboardLayout,
	},
	data() {
		return {
			uniqueIngredients: [],
            counts: {},
            isChecked: {}
		}
	},
    methods: {
        toggleChecked(ingredient) {
            this.isChecked[ingredient] = !this.isChecked[ingredient];
        }
    },
    async created() {
        const res = await UpcomingMealService.getAll();
        const upcomingMeals = res.data;
        const ingredientArrays = upcomingMeals.map(row => row.ingredients);
        const ingredients = [].concat(...ingredientArrays);
        for(const ingredient of ingredients) {
            this.counts[ingredient] = (this.counts[ingredient] || 0) + 1;
            this.isChecked[ingredient] = false;
        }
        this.uniqueIngredients = [...new Set(ingredients)];
    }
};
</script>

<style scoped>
.grocery-list-container {
    padding: 0.5rem 0rem 0rem 1.5rem;
}

.ingredient-container {
    padding: 0.3em;
}

.ingredient-container:first-child {
    padding-top: 0.7em;
}

.ingredient-container:last-child {
    padding-bottom: 1em;
}

.ingredient-container label {
    padding-left: 0.4em;
}

.ingredient-count-span {
    font-weight: bold;
}

.checked-input {
    text-decoration: line-through;
}
</style>
