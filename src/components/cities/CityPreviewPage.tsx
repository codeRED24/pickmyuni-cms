import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { StaticCityPreview } from "./CityPreview";

const CityPreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("cities", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading city</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/cities">Cities</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <StaticCityPreview />
    </RecordContextProvider>
  );
};

export default CityPreviewPage;