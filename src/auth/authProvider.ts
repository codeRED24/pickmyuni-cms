import { AuthProvider } from "ra-core";

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/validate/tokens`, {
      method: "PUT",
      credentials: "include", // cookies sent automatically
    });
    return res.ok;
  } catch {
    return false;
  }
};

const authProvider: AuthProvider = {
  // Login: credentials sent to backend, cookies set automatically
  login: async ({ email, password }) => {
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Invalid credentials");
    }
  },

  // Logout: clear cookies on backend
  logout: async () => {
    await fetch(`${BACKEND_URL}/api/v1/cms/user/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  // Check authentication: called by ra-core before protected routes
  checkAuth: async () => {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Unauthorized");
  },

  // Handle API errors: called automatically by ra-core on request failure
  checkError: async (error: any) => {
    if (error.status === 401 || error.status === 403) {
      // Try refresh token
      const refreshed = await refreshAccessToken();
      if (!refreshed) throw new Error("Unauthorized");
    }
  },

  // Get current user identity
  getIdentity: async () => {
    return { id: 1 };
  },

  // Get current permissions
  getPermissions: async () => {
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/permissions`, {
      method: "GET",
      credentials: "include", // cookies sent automatically
    });
    if (!res.ok) throw new Error("Cannot fetch permissions");
    const data = await res.json();
    return data.permissions; // e.g., ['user.create', 'user.edit']
  },
};

export default authProvider;
