import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginModal from "../components/auth/LoginModal";
import SignUpModal from "../components/auth/SignUpModal";
import TheSearch from "../views/TheSearch.vue";
import UserDashboard from "../views/UserDashboard.vue";
import AccountInformation from "../views/settings/AccountInformation.vue";
import PersonalInformation from "../views/settings/PersonalInformation.vue";
import FavoriteMeals from "../views/favorite-meals/FavoriteMeals.vue";
import FavoriteMealsDetail from "../views/favorite-meals/FavoriteMealsDetail.vue";
import UpcomingMeals from "../views/upcoming-meals/UpcomingMeals.vue";
import UserBudget from "../views/budget/UserBudget.vue";
import EditBudgetPage from "../views/budget/EditBudgetPage.vue";
import UserGoals from "../views/goals/UserGoals.vue";
import EditGoalsPage from "../views/goals/EditGoalsPage.vue";
import AddGoalPage from "../views/goals/AddGoalPage.vue";
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
		{
			path: "/favorite-meals/:id",
			component: FavoriteMealsDetail,
			props: true,
		},
		{ path: "/upcoming-meals", component: UpcomingMeals },
		{ path: "/budget", component: UserBudget },
		{ path: "/edit-budget/:id", component: EditBudgetPage, props: true },
		{ path: "/goals", component: UserGoals },
		{ path: "/edit-goals/:id", component: EditGoalsPage, props: true },
		{ path: "/add-goal", component: AddGoalPage },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
