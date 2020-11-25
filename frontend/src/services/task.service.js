import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }

  get(id) {
    return http.get(`/task/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/tasks", data);
  }

  update(id, data) {
    return http.put(`/task/${id}`, data);
  }

  delete(id) {
    return http.delete(`/task/${id}`);
  }

  deleteAll() {
    return http.delete(`/task`);
  }

  findByTitle(title) {
    return http.get(`/task?title=${title}`);
  }
}

export default new TaskDataService();
