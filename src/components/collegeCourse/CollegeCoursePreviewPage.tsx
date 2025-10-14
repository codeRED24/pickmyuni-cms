import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { CollegeContentPreview } from "../college-content/CollegeContentPreview";

export const CollegeCoursePreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("colleges-courses", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/colleges-courses">Colleges Courses</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <CollegeContentPreview />
    </RecordContextProvider>
  );
};
