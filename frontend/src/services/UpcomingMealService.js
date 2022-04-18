import http from "../http-common";

const url = "/upcoming-meals";

class UpcomingMealService {
    // get all upcoming meals
    static getAll() {
        return http.get(url);
    }

    // get all upcoming meals for a day
    static getAllForDay(dayOfWeek) {
        console.log(url);
        return http.get(`${url}/${dayOfWeek}`);
    }

    // add a new upcoming meal
    static add(upcomingMeal) {
        return http.post(url, upcomingMeal);
    }

    // edit a upcoming meal by id
    static edit(id, updatedUpcomingMeal) {
        return http.patch(`${url}/${id}`, updatedUpcomingMeal);
    }

    // delete a upcoming meal by id
    static delete(id) {
        console.log("deleting...");
        console.log(`URL: ${url}/${id}`);
        return http.delete(`${url}/${id}`);
    }
}

export default UpcomingMealService;