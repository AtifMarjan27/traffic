class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getHeaders(auth = false, isJson = true) {
    const headers = {};
    if (isJson) headers["Content-Type"] = "application/json";
    if (auth) {
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async get(endpoint, auth = false) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(auth),
    });
    return res.json();
  }

  async post(endpoint, data, auth = false, isJson = true) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(auth, isJson),
      body: isJson ? JSON.stringify(data) : data,
    });
    return res.json();
  }

  async put(endpoint, data, auth = false, isJson = true) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(auth, isJson),
      body: isJson ? JSON.stringify(data) : data,
    });
    return res.json();
  }

  async delete(endpoint, auth = false) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(auth),
    });
    return res.json();
  }

  // Auth
  async login(email, password) {
    return this.post(`/admin/login`, { email, password });
  }

  // License
  async getLicenses() {
    return this.get(`/license`, true);
  }

  async deleteLicense(id) {
    return this.delete(`/license/${id}`, true);
  }

  async submitLicense(data) {
    return this.post(`/license/submit`, data, true, false); 
  }

  async updateLicense(id, data) {
    return this.put(`/license/${id}`, data, true, true);
   
  }
  async searchLicense(licenseNumber) {
    return this.get(`/license/search/${licenseNumber}`, true);
  }
}



const API = import.meta.env.VITE_API_URL;
export default new ApiService(API);
