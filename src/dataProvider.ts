import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "ra-core";
import authProvider from "./auth/authProvider";

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
  getList: async (resource: string, params: any) => {
    if (authProvider.getIdentity) {
      const { id, role } = await authProvider.getIdentity();
      if (
        role === "content_writer" &&
        !["media", "authors", "colleges", "tasks", "exams"].includes(resource)
      ) {
        params.filter = { ...params.filter, author_id: id };
      } else if (
        role === "team_lead" &&
        !["media", "authors", "colleges", "tasks", "exams"].includes(resource)
      ) {
        const { data: reportingAuthors } = await baseDataProvider.getList(
          "authors",
          { filter: { reports_to_id: id } }
        );
        const authorIds = reportingAuthors.map((author: any) => author.id);
        params.filter = { ...params.filter, author_id: authorIds };
      }
    }
    return baseDataProvider.getList(resource, params);
  },
  getRoles: async () => {
    return httpClient(`${API_URL}/roles`).then(({ json }) => ({
      data: json,
    }));
  },
  verifyPin: async (pin: string) => {
    return httpClient(`${API_URL}/delete-pin`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ pin }),
    });
  },
};
