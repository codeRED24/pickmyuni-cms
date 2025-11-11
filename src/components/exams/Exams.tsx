import { RecordContextProvider, useRecordContext } from "ra-core";
import ArticleContent from "../shared/ArticleContent";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";

export const LiveExamPreview = () => {
  const record = useRecordContext();
  const data = useWatch();
  const liveRecord = { ...record, ...data };

  return (
    <RecordContextProvider value={liveRecord}>
      <ExamPreview />
    </RecordContextProvider>
  );
};

export const ExamPreview = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <div className="bg-white font-sans text-black">
      {/* Hero Section */}
      <section className="relative h-[336px] w-full text-white">
        <img
          src={record.banner_img}
          alt="Exam banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto pb-8 text-center">
            {/* Title */}
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {record?.exam_name}
            </h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-8 py-8 md:py-12 lg:py-16">
        <ArticleContent content={record.content || ""} />
      </section>
    </div>
  );
};
