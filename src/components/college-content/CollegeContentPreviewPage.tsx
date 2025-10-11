import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { CollegeContentPreview } from "./CollegeContentPreview";

export const CollegeContentPreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("collegeswise-content", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading city</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/collegeswise-content">Collegeswise-contents</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <CollegeContentPreview />
    </RecordContextProvider>
  );
};
