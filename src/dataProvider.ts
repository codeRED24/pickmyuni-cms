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
  delete: (resource: string, params: any) => {
    return baseDataProvider.update(resource, {
      id: params.id,
      data: { is_active: false, deletedAt: new Date() },
      previousData: params.previousData,
    });
  },
  deleteMany: (resource: string, params: any) => {
    return baseDataProvider.updateMany(resource, {
      ids: params.ids,
      data: { is_active: false, deletedAt: new Date() },
    });
  },
};
