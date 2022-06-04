// import http from "../http-common";

// const url = "/search";

// class SearchService {
// 	// search for meals by name (e.g. pizza)
// 	static searchByName(query) {
// 		return http.get(`${url}?q=${query}`);
// 	}

// 	// get more info
// 	static getInfo(id) {
// 		return http.get(`${url}/${id}`);
// 	}
// }

// export default SearchService;

import axios from 'axios';

const url = "/api/search";

class SearchService {
	// search for meals by name (e.g. pizza)
	static searchByName(query) {
		return axios.get(`${url}?q=${query}`);
	}

	// get more info
	static getInfo(id) {
		return axios.get(`${url}/${id}`);
	}

	// extract info
	static extractInfo(recipeUrl) {
		return axios.get(`${url}/${recipeUrl}`);
	}

	// get random meals
	static getRandom() {
		console.log("here in service");
		return axios.get(`${url}/random`);
	}

	// get auto generate
	static getAuto(
		numMeals,
		cuisine,
		diet,
		allergies,
		dislikes,
		ingredients,
		maxReadyTime
	) {
		console.log("here in service for auto");
		return axios.get(
			`${url}/auto-generate?number=${numMeals}&cuisine=${cuisine}&diet=${diet}&intolerances=${allergies}&excludeIngredients=${dislikes}&includeIngredients=${ingredients}&maxReadyTime=${maxReadyTime}`
		);
	}
}

export default SearchService;