import http from "../http-common";

const url = '/goals';

class GoalService {
    // get all goals
    static getAll() {
        return http.get(url);
    }

    static get(id) {
        return http.get(`${url}/${id}`);
    }

    // add a goal
    static add(newGoal) {
        return http.post(url, newGoal);
    }

    // edit a goal by id
    static edit(id, updatedGoal) {
        return http.patch(`${url}/${id}`, updatedGoal);
    }

    // delete a goal by id
    static delete(id) {
        return http.delete(`${url}/${id}`);
    }
}

export default GoalService;