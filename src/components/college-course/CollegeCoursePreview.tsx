import { RecordContextProvider, useGetOne, useRecordContext } from "ra-core";
import { useWatch } from "react-hook-form";
import ArticleContent from "../shared/ArticleContent";
import { Spinner } from "../admin/spinner";
import { UniLayout } from "../college-content/UniLayout";

export const CollegeCoursePreview = () => {
  const record = useRecordContext();
  if (!record) return null;

  const { data: collegeCourseData, isLoading, error } = useGetOne(
    "colleges-courses",
    { id: record.id }
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading college course details</div>;

  const content = collegeCourseData?.content;

  return (
    <div className="bg-white font-sans text-black">
      {record?.college_id && <UniLayout college={collegeCourseData} />}
      <br />
      <ArticleContent className="container mx-auto" content={content} />
    </div>
  );
};

export const LiveCollegeCoursePreview = () => {
  const record = useRecordContext();
  const data = useWatch(); // Watches all form inputs
  const mergedData = { ...record, ...data };

  return (
    <RecordContextProvider value={mergedData}>
      <CollegeCoursePreview />
    </RecordContextProvider>
  );
};