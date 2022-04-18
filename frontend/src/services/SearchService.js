import http from "../http-common";

const url = "/search";

class SearchService {
	// search for meals by name (e.g. pizza)
	static searchByName(query) {
		return http.get(`${url}?q=${query}`);
	}

	// get more info
	static getInfo(id) {
		return http.get(`${url}/${id}`);
	}
}

export default SearchService;
