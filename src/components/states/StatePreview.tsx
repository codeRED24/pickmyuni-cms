import { useRecordContext } from "ra-core";
import { useWatch } from "react-hook-form";
import ArticleContent from "../shared/ArticleContent";

const StatePreview = ({ record }: { record: any }) => {
  if (!record) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64">
        {record.banner_img && (
          <img
            src={record.banner_img}
            alt={record.name || "State banner"}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="max-w-[850px] text-3xl font-bold text-white md:text-4xl mx-4">
              Explore Top Universities in {record.name || "this state"}
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <ArticleContent className="text-black" content={record.content || ""} />
      </div>
    </div>
  );
};

export const LiveStatePreview = () => {
  const record = useRecordContext();
  const data = useWatch(); // Watches all form inputs
  const mergedData = { ...record, ...data };

  return <StatePreview record={mergedData} />;
};

export const StaticStatePreview = () => {
  const record = useRecordContext();
  return <StatePreview record={record} />;
};