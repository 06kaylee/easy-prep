<template>
    <base-card class="main-container">
        <h2>{{ upcomingMeal.dayOfWeek }}</h2>
        <div class="meal-container" v-if="currentMeal">
            <base-card>
                <div class="icons">
                    <router-link to="/upcoming-meals">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </router-link>
                    <font-awesome-icon :icon="['fas', 'x']" />
                </div>

                <h3>{{ currentMeal.item }}</h3>

                <div class="img-container">
                    <img :src="require('../../assets/' + mealImgLink)" alt="" />
                </div>

                <p>{{ upcomingMeal.calorieCount }}</p>

                <h4>Nutrition Facts</h4>
                <ul>
                    <li v-for="nutritionFact in currentMeal.nutritionFacts" :key="nutritionFact">
                        {{ nutritionFact }}
                    </li>
                </ul>

                <h4>Ingredient list</h4>
                <ul>
                    <li v-for="ingredient in currentMeal.ingredients" :key="ingredient">
                        {{ ingredient }}
                    </li>
                </ul>

                <h4>Steps</h4>
                <ol>
                    <li v-for="step in currentMeal.steps" :key="step">
                        {{ step }}
                    </li>
                </ol>
            </base-card>
            <base-button @click="nextMeal()">Next meal</base-button>
        </div>
        <p v-else>You don't have any meals planned!</p>
    </base-card>
</template>

<script>
export default {
    props: ['dayOfWeek'],
    data() {
        return {
            upcomingMeal: null,
            meals: null,
            currentMeal: null,
            currentIndex: 0,
        }
    },
    methods: {
        nextMeal() {
            if(this.currentIndex + 1 === this.meals.length) {
                this.currentIndex = 0;
            }
            else {
                this.currentIndex += 1;
            }
            this.currentMeal = this.meals[this.currentIndex];
        }
    },
    computed: {
        mealImgLink() {
			return this.currentMeal.img;
		},
    },
    created() {
        this.upcomingMeal = this.$store.getters['upcomingMeals/upcomingMeals'].find(upcomingMeal => upcomingMeal.dayOfWeek === this.dayOfWeek);
        this.meals = this.upcomingMeal.meals;
        if(this.meals.length !== 0) {
            this.currentMeal = this.meals[0];
            this.btnIsDisabled = false;
        }
    }
}
</script>

<style scoped>
#app .main-container {
    border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	margin: 2rem auto 1rem auto;
    max-width: 80rem;
	width: 80rem;
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}

.main-container h2 {
    grid-column: 1 / 4;
    text-align: center;
}

.meal-container .card {
    max-width: 100%;
    width: 100%;
    height: fit-content;
    display: grid;
}

.meal-container {
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.meal-container button {
    justify-self: center;
    align-self: center;
}

.icons {
    display: flex;
    justify-content: space-between;
}

.fa-x {
    justify-self: end;
    color: red;
	opacity: 0.5;
}

.fa-x:hover {
	opacity: 1;
	transition: 0.4s;
}

.main-container .card h3 {
    text-align: center;
}

button {
    width: 50px;
    height: 50px;
}

.img-container {
	max-width: 200px;
	max-height: 200px;
}

.img-container img {
	max-width: 100%;
	max-height: 100%;
}
</style>