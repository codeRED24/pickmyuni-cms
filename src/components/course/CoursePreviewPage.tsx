import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import CityPreviewPage from "../cities/CityPreviewPage";

export const CoursePreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("courses", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/courses">Courses</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <CityPreviewPage />
    </RecordContextProvider>
  );
};
