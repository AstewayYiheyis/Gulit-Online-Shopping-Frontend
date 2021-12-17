const TOKEN_KEY = "REACTAPP.TOKEN";
const USER = "REACTAPP.USER";
const REFRESH_TOKEN_KEY = "REACTAPP.REFRESH_TOKEN";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  getHeaderwithToken() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ` + TokenService.getToken(),
    };

    return headers;
  },
  getHeader() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    return headers;
  },
};

const SetUser = {
  getUser() {
    return localStorage.getItem(USER);
  },
  isAdmin() {
    let user = this.getUser();
    return user != null ? user.role == "admin" : false;
  },
  saveUser(user) {
    localStorage.setItem(USER, user);
  },

  removeUser() {
    localStorage.removeItem(USER);
  },
};
const base = "http://localhost:8080/";

const APIService = {
  productAPI: base + "products/", 
  orderAPI: base + "orders/",
  userAPI: base + "users/",
  loginAPI: base + "login/",
  addressAPI: base + "addresses/",
  sellerAPI: base + "sellers/",
};

export { TokenService, SetUser, APIService };
