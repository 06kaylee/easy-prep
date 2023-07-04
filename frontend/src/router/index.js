import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginModal from "../components/auth/LoginModal";
import SignUpModal from "../components/auth/SignUpModal";
import UserDashboard from "../views/UserDashboard.vue";
import AccountInformation from "../views/settings/AccountInformation.vue";
import PersonalInformation from "../views/settings/PersonalInformation.vue";
import AddPersonalInformationPage from "../views/settings/AddPersonalInformationPage.vue";
import FavoriteMeals from "../views/favorite-meals/FavoriteMeals.vue";
import FavoriteMealDetail from "../views/favorite-meals/FavoriteMealDetail.vue";
import AddFavoriteMealPage from "../views/favorite-meals/AddFavoriteMealPage.vue";
import EditFavoriteMealPage from "../views/favorite-meals/EditFavoriteMealPage.vue";
import UpcomingMeals from "../views/upcoming-meals/UpcomingMeals.vue";
import UpcomingMealsDetail from "../views/upcoming-meals/UpcomingMealsDetail.vue";
import EditUpcomingMealPage from "../views/upcoming-meals/EditUpcomingMealPage.vue";
import AddUpcomingMealPage from "../views/upcoming-meals/AddUpcomingMealPage.vue";
import AutoGeneratePage from "../views/auto-generate/AutoGeneratePage.vue";
import UpcomingMealsChoose from "../views/upcoming-meals/UpcomingMealsChoose.vue";
import CustomizeGenerationPage from "../views/auto-generate/CustomizeGenerationPage.vue";
import UserBudget from "../views/budget/UserBudget.vue";
import EditBudgetPage from "../views/budget/EditBudgetPage.vue";
import GroceryList from "../views/GroceryList.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: HomePage },
		{ path: "/login", component: LoginModal },
		{ path: "/sign-up", component: SignUpModal },
		{ path: "/dashboard", component: UserDashboard },
		{ path: "/account-info", component: AccountInformation },
		{ path: "/personal-info", component: PersonalInformation },
		{
			path: "/add-personal-info/:id",
			component: AddPersonalInformationPage,
			props: true,
		},
		{ path: "/favorite-meals", component: FavoriteMeals },
		{
			path: "/favorite-meals/:id",
			component: FavoriteMealDetail,
			props: true,
		},
		{
			path: "/favorite-meals/add",
			component: AddFavoriteMealPage,
		},
		{
			path: "/favorite-meals/:id/edit",
			component: EditFavoriteMealPage,
		},
		{ path: "/upcoming-meals", component: UpcomingMeals },
		{
			path: "/upcoming-meals/:dayOfWeek/meals",
			component: UpcomingMealsDetail,
			props: true,
		},
		{
			path: "/upcoming-meals/:dayOfWeek/meals/edit/:id",
			component: EditUpcomingMealPage,
			props: true,
		},
		{
			path: "/upcoming-meals/:dayOfWeek/meals/add",
			component: AddUpcomingMealPage,
		},
		{
			path: "/upcoming-meals/auto-generate",
			component: AutoGeneratePage,
		},
		{
			path: "/upcoming-meals/auto-generate/customize",
			component: CustomizeGenerationPage,
		},
		{
			path: "/upcoming-meals/choose",
			component: UpcomingMealsChoose,
		},
		{ path: "/budget", component: UserBudget },
		{ path: "/edit-budget/:id", component: EditBudgetPage, props: true },
		{ path: "/grocery-list", component: GroceryList },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
