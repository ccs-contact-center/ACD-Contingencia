import decode from "jwt-decode";

const hostURL = "https://api.ccscontactcenter.com";
//const hostURL = 'http://localhost:3020'

export default class AuthService {
  constructor(domain) {
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return this.fetch(hostURL + "/v1/auth/Coronalogin", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  updateStatus(data) {
    return this.fetch(hostURL + "/v1/Coronastuff/updateStatus", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  logout() {
    this.updateStatus({
      usuario: localStorage.getItem("user"),
      status: 2
    }).then(res => {
      console.log(res);
    });

    localStorage.removeItem("id_token");
    localStorage.removeItem("status");
    localStorage.removeItem("user");
  }

  getProfile() {
    return decode(this.getToken());
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
