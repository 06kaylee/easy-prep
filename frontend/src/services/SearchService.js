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

	// get random meals
	static getRandom() {
		console.log("here in service");
		return axios.get(`${url}/random`);
	}
}

export default SearchService;