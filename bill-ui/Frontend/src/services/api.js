const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api";
const AUTH_TOKEN_KEY = "bill-ui-token";
const AUTH_USER_KEY = "bill-ui-user";

const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
const getStoredUser = () => {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawUser);
    if (parsed?.name && parsed?.role) {
      return parsed;
    }
  } catch {
    return { name: rawUser, role: "user" };
  }

  return null;
};

const setAuthSession = (token, user) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

async function request(path, options = {}) {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
  auth: {
    login: async (name, password) => {
      const response = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
      });

      if (response?.token && response?.user?.name && response?.user?.role) {
        setAuthSession(response.token, response.user);
      }

      return response;
    },
    logout: clearAuthSession,
    getToken: getStoredToken,
    getUser: getStoredUser,
    getUserName: () => getStoredUser()?.name || "",
    getUserRole: () => getStoredUser()?.role || "",
  },
};

export default api;
