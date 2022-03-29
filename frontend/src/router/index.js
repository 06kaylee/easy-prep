import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginModal from "../components/auth/LoginModal";
import SignUpModal from "../components/auth/SignUpModal";
import TheSearch from "../views/TheSearch.vue";
import UserDashboard from "../views/UserDashboard.vue";
import AccountInformation from "../views/AccountInformation.vue";
import PersonalInformation from "../views/PersonalInformation.vue";
import FavoriteMeals from "../views/FavoriteMeals.vue";
import FavoriteMealsDetail from "../views/FavoriteMealsDetail.vue";
import UpcomingMeals from "../views/UpcomingMeals.vue";
import UserBudget from "../views/UserBudget.vue";
import UserGoals from "../views/UserGoals.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: HomePage },
		{ path: "/login", component: LoginModal },
		{ path: "/sign-up", component: SignUpModal },
		{ path: "/search", component: TheSearch },
		{ path: "/dashboard", component: UserDashboard },
		{ path: "/account-info", component: AccountInformation },
		{ path: "/personal-info", component: PersonalInformation },
		{ path: "/favorite-meals", component: FavoriteMeals },
		{ path: "/favorite-meals/:id", component: FavoriteMealsDetail, props: true },
		{ path: "/upcoming-meals", component: UpcomingMeals },
		{ path: "/budget", component: UserBudget },
		{ path: "/goals", component: UserGoals },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
