<template>
    <base-card id="customize-generation-container">
        <header id="customize-generation-header">
            <h1 id="customize-generation-title">Customize Generation</h1>
            <div class="customize-header-btn-container">
                <base-button>Filter</base-button>
                <base-button>Sort</base-button>
            </div>
        </header>

        <div class="search-bar-container" @submit.prevent="submitSearch">
			<input
				type="text"
				id="search-bar-input"
				placeholder="Search for a recipe by name"
			/>
			<base-button
				link
				class="search-btn-container"
			>
				<font-awesome-icon
					class="search-btn"
					:icon="['fas', 'magnifying-glass']"
				/>
			</base-button>
		</div>

        <base-card id="favorite-meals-container">
            <base-card v-for="meal in favoriteMeals" :key="meal" id="favorite-meal-card" draggable @dragstart="startDrag($event, meal)">
                <div class="favorite-meal-img-container">
                    <img :src="meal.img" :alt="meal.itemName">
                </div>
                <div class="favorite-meal-info-container">
                    <h3>{{ meal.itemName }}</h3>
                    <p>Total time: {{ meal.readyTime }} minutes</p>
                    <p>
                        Recipe URL: 
                        <a :href="meal.recipeUrl" id="recipe-url">{{ meal.recipeUrl }}</a>
                    </p>
                </div>
            </base-card>
        </base-card>

        <base-card id="days-picked-container">
            <div class="day-container" v-for="(value, day) in daysPicked" :key="day">
                <p>{{ day }}</p>
                <base-card v-for="numMeals in numMeals[day]" :key="numMeals" id="selected-recipe-container"></base-card>
            </div>
        </base-card>

        <div class="btn-container">
            <base-button id="customize-generation-submit-btn">Generate</base-button>
        </div>
    </base-card>
</template>

<script>
import FavoriteMealService from "../../services/FavoriteMealService";

export default {
    data() {
        return {
            favoriteMeals: null,
            numMeals: null,
            daysPicked: null
        }
    },
    methods: {
        startDrag(event, favoriteMeal) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('mealId', favoriteMeal._id);
        },
        onDrop(event, list) {
            const mealId = event.dataTransfer.getData('mealId');
            const selectedMeal = this.favoriteMeals.find((meal) => meal._id === mealId);
            selectedMeal.list = list;
        }
    },
    async created() {
        const res = await FavoriteMealService.getAll();
        this.favoriteMeals = res.data;
        console.log(this.favoriteMeals);
        this.numMeals = this.$store.getters['customizeGeneration/numMeals'];
        this.daysPicked = this.$store.getters['customizeGeneration/daysPicked'];
    }
}
</script>

<style scoped>
.card {
    background-color: white;
}

#customize-generation-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    height: 45rem;
}

#customize-generation-header {
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem 0 5rem;
}

.customize-header-btn-container {
    display: flex;
    gap: 0.5rem;
    height: fit-content;
}

#favorite-meals-container {
    max-width: 80%;
    max-height: 80%;
    width: 50rem;
    overflow: auto;
}

#favorite-meal-card {
    margin: 0 0 2rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 95%;
    width: 35rem;
    column-gap: 1rem;
}

.favorite-meal-info-container {
    display: grid;
    row-gap: 0.5rem;
}

#recipe-url {
    font-size: 0.7rem;
}

#days-picked-container {
    height: fit-content;
    max-width: 90%;
    max-height: 80%;
    width: 21rem;
    overflow: auto;
}

#days-picked-container > .card {
    max-width: 80%;
    width: 10rem;
    text-align: center;
}

#selected-recipe-container {
    max-width: 95%;
    width: 16rem;
}

.btn-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}

#customize-generation-submit-btn {
    grid-column: 5 / 6;
    justify-self: center;
}

::-webkit-scrollbar {
    width: 1.5em;
}

::-webkit-scrollbar-track {
    background: white;
	border-radius: 100vh;
	margin-block: 0.4em;
}

::-webkit-scrollbar-thumb {
    background: #c7c4c4;
	border-radius: 100vh;
	border: 0.25em solid white;
}

@supports (scrollbar-color: #f4d3cb white) {
	* {
		scrollbar-color: #f4d3cb white;
	}
}

.favorite-meal-img-container {
    max-width: 200px;
    max-height: 200px;
}

.favorite-meal-img-container img {
    max-width: 100%;
    max-height: 100%;
}

.search-bar-container {
	grid-column: 1 / 3;
    justify-self: start;
    padding-left: 4.5rem;
    margin-top: 1.5rem;
}

#search-bar-input {
	width: 43rem;
	padding: 0.8rem;
	border: 2px solid #94618e;
	border-radius: 22px;
	margin-bottom: 0.5rem;
}

#search-bar-input:focus {
	outline: none;
	border: 2px solid #94618e;
}

.search-btn-container {
	margin-left: 0.5rem;
}

.search-btn-container:hover .search-btn {
	color: white;
}
</style>