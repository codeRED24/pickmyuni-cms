import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { StaticStatePreview } from "./StatePreview";

export const StatePreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("states", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading state</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/states">States</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <StaticStatePreview />
    </RecordContextProvider>
  );
};

