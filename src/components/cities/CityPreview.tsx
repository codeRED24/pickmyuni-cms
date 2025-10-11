import { useRecordContext } from "ra-core";
import { useWatch } from "react-hook-form";
import ArticleContent from "../shared/ArticleContent";

const CityPreview = ({ record }: { record: any }) => {
  if (!record) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64">
        {record.banner_img && (
          <img
            src={record.banner_img}
            alt={record.name || "City banner"}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="max-w-[850px] text-3xl font-bold text-white md:text-4xl mx-4">
              Get Enrolled in the Best Universities in {record.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <ArticleContent content={record.content || ""} />
      </div>
    </div>
  );
};

export const LiveCityPreview = () => {
  const record = useRecordContext();
  const data = useWatch(); // Watches all form inputs
  const mergedData = { ...record, ...data };

  return <CityPreview record={mergedData} />;
};

export const StaticCityPreview = () => {
  const record = useRecordContext();
  return <CityPreview record={record} />;
};
