import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchUtils } from "ra-core";
import { useNavigate } from "react-router-dom";

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const resourceMap: { [key: string]: string } = {
  articles: "articles",
  collegesCourses: "colleges-courses",
  collegewiseContent: "collegeswise-content",
  courses: "courses",
  city: "cities",
  state: "states",
  stream: "streams",
  // specialization: "specialization",
  // contentTasks: "tasks",
};

const ContentStatus = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contentStatus"],
    queryFn: async () => {
      const API_URL = import.meta.env.VITE_APP_API_URL + "/api/v1/cms";
      const [status] = await Promise.all([
        httpClient(`${API_URL}/dashboard`, {}),
      ]);
      return {
        status: status.json.data,
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { status } = data;

  const handleClick = (contentType: string, statusValue: string) => {
    const resourceName = resourceMap[contentType];
    if (resourceName) {
      const filter = JSON.stringify({ status: statusValue });
      navigate(`/${resourceName}?filter=${filter}`);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Content Type</TableHead>
          <TableHead>Draft</TableHead>
          <TableHead>Pending</TableHead>
          <TableHead>Rejected</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Scheduled</TableHead>
          <TableHead>Deleted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(status).map(([contentType, counts]: any) => {
          return (
            <TableRow key={contentType}>
              <TableCell>{contentType}</TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "DRAFT")}
              >
                {counts.DRAFT}
              </TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "PENDING")}
              >
                {counts.PENDING}
              </TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "REJECTED")}
              >
                {counts.REJECTED}
              </TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "PUBLISHED")}
              >
                {counts.PUBLISHED}
              </TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "SCHEDULED")}
              >
                {counts.SCHEDULED}
              </TableCell>
              <TableCell
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(contentType, "DELETED")}
              >
                {counts.DELETED}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ContentStatus;
