import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseModal from "./components/ui/BaseModal.vue";
import BaseCarousel from "./components/ui/BaseCarousel.vue";

const app = createApp(App);

app.use(store);

app.use(router);

library.add(
	faSquareCheck,
	faPen,
	faTrash,
	faMagnifyingGlass,
	faHeart,
	faHeartRegular,
	faPlus,
	faMinus,
	faX,
	faAngleDown,
	faAngleUp,
	faAngleRight,
	faBars,
	faRotateLeft,
	faHouse,
	faCalendarDays,
	faCartShopping,
	faStarRegular,
	faStar,
	faUser,
	faClock,
	faFileLines,
	faQuestion
);

app.component("font-awesome-icon", FontAwesomeIcon);

app.component("base-button", BaseButton);

app.component("base-card", BaseCard);

app.component("base-spinner", BaseSpinner);

app.component("base-modal", BaseModal);

app.component("base-carousel", BaseCarousel);

app.mount("#app");
