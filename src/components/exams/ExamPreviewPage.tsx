import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";
import { ExamPreview } from "./Exams";

const ExamPreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("exams", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading exam</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/exams">Exams</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <ExamPreview />
    </RecordContextProvider>
  );
};

export default ExamPreviewPage;
