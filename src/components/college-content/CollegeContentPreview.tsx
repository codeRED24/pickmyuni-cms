import { RecordContextProvider, useRecordContext } from "ra-core";
import { useWatch } from "react-hook-form";
import ArticleContent from "../shared/ArticleContent";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../admin/spinner";
import { UniLayout } from "./UniLayout";

export const CollegeContentPreview = () => {
  const record = useRecordContext();
  if (!record) return null;

  const {
    data: collegeData,
    isLoading,
    error,
  } = useQuery<{ data: any }>({
    queryKey: ["college-content-data", record.college_id],
    queryFn: async () => {
      if (!record.college_id) return undefined;
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/college/${
          record.college_id
        }`
      );
      if (!res.ok) throw new Error("Failed to fetch college details");
      return res.json();
    },
    enabled: !!record.college_id,
  });

  if (record?.college_id && isLoading) return <Spinner />;
  if (record?.college_id && error)
    return <div>Error loading college details</div>;

  const content = record.content;

  return (
    <div className="bg-white font-sans text-black">
      {record?.college_id && <UniLayout college={collegeData?.data} />}
      <br />
      <ArticleContent className="container mx-auto" content={content} />
    </div>
  );
};

export const LiveCollegeContentPreview = () => {
  const record = useRecordContext();
  const data = useWatch(); // Watches all form inputs
  const mergedData = { ...record, ...data };

  return (
    <RecordContextProvider value={mergedData}>
      <CollegeContentPreview />
    </RecordContextProvider>
  );
};
