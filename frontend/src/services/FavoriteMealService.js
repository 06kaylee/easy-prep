// import http from "../http-common";

// const url = '/favorite-meals';

// class FavoriteMealService {
//     // get all meals
//     static getAll() {
//         return http.get(url);
//     }

//     // get meal by id
//     static get(id) {
//         return http.get(`${url}/${id}`);
//     }

//     // delete meal by id
//     static delete(id) {
//         return http.delete(`${url}/${id}`);
//     }

//     // add a meal
//     static add(favoriteMeal) {
//         return http.post(url, favoriteMeal);
//     }

//     // edit a meal by id
//     static edit(id, updatedFavoriteMeal) {
//         return http.patch(`${url}/${id}`, updatedFavoriteMeal);
//     }
// }

// export default FavoriteMealService;

import axios from 'axios';

const url = '/api/favorite-meals';

class FavoriteMealService {
    // get all meals
    static getAll() {
        return axios.get(url);
    }

    // get meal by id
    static get(id) {
        return axios.get(`${url}/${id}`);
    }

    // delete meal by id
    static delete(id) {
        return axios.delete(`${url}/${id}`);
    }

    // add a meal
    static add(favoriteMeal) {
        return axios.post(url, favoriteMeal);
    }

    // edit a meal by id
    static edit(id, updatedFavoriteMeal) {
        return axios.patch(`${url}/${id}`, updatedFavoriteMeal);
    }
}

export default FavoriteMealService;