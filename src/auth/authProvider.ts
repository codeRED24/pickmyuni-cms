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
    // Clear permissions from localStorage
    localStorage.removeItem("permissions");
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
  getPermissions: async () => {
    const res = await fetch(`${BACKEND_URL}/api/v1/cms/authors/permissions`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Cannot fetch permissions");
    const data = await res.json();
    // Store permissions in localStorage for canAccess to use
    localStorage.setItem("permissions", JSON.stringify(data));
    return data;
  },

  // Access Control: Check if user can access a resource/action
  canAccess: async ({ action, resource }) => {
    try {
      // Get permissions from localStorage (set during getPermissions)
      const permissionsStr = localStorage.getItem("permissions");
      if (!permissionsStr) {
        // If no permissions cached, fetch them
        const res = await fetch(
          `${BACKEND_URL}/api/v1/cms/authors/permissions`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) return false;
        const data = await res.json();
        localStorage.setItem("permissions", JSON.stringify(data));

        // Check if user has permission
        return checkPermission(data, action, resource);
      }

      const permissions = JSON.parse(permissionsStr);
      return checkPermission(permissions, action, resource);
    } catch (error) {
      console.error("Error checking access:", error);
      return false;
    }
  },
};

// Helper function to check if a permission matches the action and resource
function checkPermission(
  permissions: string[],
  action: string,
  resource: string
): boolean {
  // Map React Admin resource names to backend resource names
  const resourceMap: Record<string, string> = {
    "collegeswise-content": "collegewise-content",
    tasks: "content-tasks",
  };

  // Get the backend resource name (use mapped name if exists, otherwise use as-is)
  const backendResource = resourceMap[resource] || resource;

  // Map React Admin actions to backend permission actions
  const actionMap: Record<string, string[]> = {
    list: ["read", "list"],
    show: ["read", "show"],
    create: ["create", "write"],
    edit: ["update", "edit", "write"],
    delete: ["delete"],
  };

  const permissionSuffixes = actionMap[action] || [action];

  // Check if user has wildcard permission (admin)
  if (permissions.includes("*:*") || permissions.includes("admin")) {
    return true;
  }

  // Check if user has permission for this specific resource
  for (const suffix of permissionSuffixes) {
    if (
      permissions.includes(`${backendResource}:${suffix}`) ||
      permissions.includes(`${backendResource}:*`) ||
      permissions.includes(`*:${suffix}`)
    ) {
      return true;
    }
  }

  return false;
}

export default authProvider;
