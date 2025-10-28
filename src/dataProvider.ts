import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "ra-core";

const API_URL = import.meta.env.VITE_APP_API_URL + "/api/v1/cms";

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = simpleRestProvider(API_URL, httpClient);

export const dataProvider = {
  ...baseDataProvider,
  getRoles: () => {
    return httpClient(`${API_URL}/roles`).then(({ json }) => ({
      data: json.map((role: any) => ({ id: role.name, name: role.name })),
    }));
  },
  verifyPin: (pin: string) => {
    return httpClient(`${API_URL}/delete-pin`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ pin }),
    });
  },
};
