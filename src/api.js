class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHeaders(auth = true, isJson = true) {
    const headers = {};
    if (auth) {
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    if (isJson) headers["Content-Type"] = "application/json";
    return headers;
  }

  async request(endpoint, options) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "API request failed");
    }
    return res.json();
  }

  get(endpoint, auth = true) {
    return this.request(endpoint, {
      method: "GET",
      headers: this.getHeaders(auth),
    });
  }

  post(endpoint, data, auth = true, isJson = true) {
    return this.request(endpoint, {
      method: "POST",
      headers: this.getHeaders(auth, isJson),
      body: isJson ? JSON.stringify(data) : data,
    });
  }

  put(endpoint, data, auth = true, isJson = true) {
    return this.request(endpoint, {
      method: "PUT",
      headers: this.getHeaders(auth, isJson),
      body: isJson ? JSON.stringify(data) : data,
    });
  }

  delete(endpoint, auth = true) {
    return this.request(endpoint, {
      method: "DELETE",
      headers: this.getHeaders(auth),
    });
  }

  // LOGIN
  async login(email, password) {
    return this.post("/admin/login", { email, password }, false);
  }

  // LICENSE APIs
  async getLicenses() {
    return this.get("/license");
  }

  async getLicense(id) {
    return this.get(`/license/${id}`);
  }

  async createLicense(data) {
    return this.post("/license", data, true, false);
  }

  async updateLicense(id, data) {
    return this.put(`/license/${id}`, data, true, false);
  }

  async deleteLicense(id) {
    return this.delete(`/license/${id}`);
  }


  async searchLicense(query) {
    return this.get(`/license/search/${query}`, true);
  }
}

const API = import.meta.env.VITE_API_URL;
export default new ApiService(API);
