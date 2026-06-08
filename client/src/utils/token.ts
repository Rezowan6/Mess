const TOKEN_KEY = "accessToken";

export const tokenStorage = {
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },
};