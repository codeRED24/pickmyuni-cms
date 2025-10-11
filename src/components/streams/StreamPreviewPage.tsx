import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { StaticCityPreview } from "../cities/CityPreview";

export const StreamPreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("streams", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading city</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/streams">Streams</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <StaticCityPreview />
    </RecordContextProvider>
  );
};
