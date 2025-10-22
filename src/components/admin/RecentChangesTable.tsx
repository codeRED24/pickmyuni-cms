//@ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { fetchUtils } from "ra-core";
import { SimpleTable } from "./SimpleTable";
import { DateField } from "./date-field";
import { Link } from "react-router-dom";

const RecentChangesTable = () => {
  const httpClient = (url: string, options: RequestInit = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    options.credentials = "include";
    return fetchUtils.fetchJson(url, options);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["recentChanges"],
    queryFn: async () => {
      const API_URL = import.meta.env.VITE_APP_API_URL + "/api/v1/cms";
      const resources = [
        { name: "articles", titleField: "title" },
        { name: "colleges", titleField: "college_name" },
        { name: "cities", titleField: "name" },
        { name: "states", titleField: "name" },
        { name: "courses", titleField: "course_name" },
        { name: "colleges-courses", titleField: "name" },
        { name: "collegeswise-content", titleField: "title" },
        { name: "streams", titleField: "name" },
        { name: "tasks", titleField: "title" },
      ];

      const promises = resources.map((resource) =>
        httpClient(
          `${API_URL}/${resource.name}?_sort=updatedAt&_order=DESC&_end=20`,
          {}
        )
      );

      const responses = await Promise.all(promises);

      const allChanges = responses.flatMap((response, index) => {
        const resource = resources[index];
        return response.json.map((item: any) => ({
          ...item,
          type: resource.name,
          title: item[resource.titleField],
        }));
      });

      const sortedChanges = allChanges.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      return sortedChanges.slice(0, 10);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No recent changes</div>;
  }

  const columns = [
    { key: "type", header: "Resource" },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <Link to={`/${row.type}/${row.id}/show`}>{row.title}</Link>
      ),
    },
    {
      key: "updatedAt",
      header: "Last Updated",
      render: (row) => <DateField record={row} source="updatedAt" showTime />,
    },
  ];

  return <SimpleTable data={data} columns={columns} />;
};

export default RecentChangesTable;
