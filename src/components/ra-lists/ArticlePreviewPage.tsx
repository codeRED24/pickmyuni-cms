import { RecordContextProvider, useGetOne } from "ra-core";
import { Link, useParams } from "react-router-dom";
import { ArticlePreview } from "./articles";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "../admin";

const ArticlePreviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne("articles", { id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading article</div>;

  return (
    <RecordContextProvider value={data}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/articles">Articles</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>{id}</BreadcrumbPage>
      </Breadcrumb>
      <ArticlePreview />
    </RecordContextProvider>
  );
};

export default ArticlePreviewPage;
