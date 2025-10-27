import { AuthProvider } from "ra-core";
import { getDeviceId } from "../utils/deviceId";

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const deviceId = getDeviceId();
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/validate/tokens`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const deviceId = getDeviceId();
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/authors/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, deviceId }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Invalid credentials");
    }
  },

  // Logout: clear cookies on backend
  logout: async () => {
    await fetch(`${BACKEND_URL}/api/v1/cms/authors/logout`, {
      method: "GET",
      credentials: "include",
    });
    return "/login";
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
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/authors/me`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Cannot fetch identity");
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  },

  // Get current permissions
  // getPermissions: async () => {
  // const res = await fetch(`${BACKEND_URL}/api/v1/cms/authors/permissions`, {
  //   method: "GET",
  //   credentials: "include",
  // });
  // if (!res.ok) throw new Error("Cannot fetch permissions");
  // const data = await res.json();
  // return data.permissions;
  // return;
  // },

  // canAccess: async ({ resource, action }) => {
  //   const res = await fetch(`${BACKEND_URL}/api/v1/cms/authors/can-access`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ resource, action }),
  //   });
  //   if (!res.ok) {
  //     return { canAccess: false, reason: "Cannot fetch permissions" };
  //   }
  //   const data = await res.json();
  //   return data;
  // },
};

export default authProvider;
