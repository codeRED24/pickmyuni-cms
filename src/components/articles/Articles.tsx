import { RecordContextProvider, useRecordContext } from "ra-core";
import ArticleContent from "../shared/ArticleContent";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";

export const LiveArticlePreview = () => {
  const record = useRecordContext();
  const data = useWatch();
  const liveRecord = { ...record, ...data };

  return (
    <RecordContextProvider value={liveRecord}>
      <ArticlePreview />
    </RecordContextProvider>
  );
};

export const ArticlePreview = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <div className="bg-white font-sans text-black">
      {/* Hero Section */}
      <section className="relative h-[336px] w-full text-white">
        <img
          src={record.img1}
          alt="University campus background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto pb-8 text-center">
            {/* Date Badge */}
            {record?.createdAt && (
              <div className="mb-4 inline-block bg-orange-500 px-4 py-2 text-sm font-medium uppercase text-white">
                {dayjs(record?.createdAt).format("MMMM DD, YYYY")}
              </div>
            )}

            {/* Title */}
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {record?.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-8 py-8 md:py-12lg:py-16">
        <ArticleContent content={record.content || ""} />
        {/* <div className="flex h-fit min-h-[200px] w-full min-w-[220px] flex-col space-y-8 lg:w-1/4">
          {article.author && (
            <Link
              href={`/authors/${article.author.id}`}
              className="bg-brand-primary flex flex-1 flex-col items-center justify-center rounded-md p-2"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white sm:h-20 sm:w-20">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </div>
              <span className="mt-2 line-clamp-1 flex items-center gap-1 text-xl text-white">
                <PenToolIcon size={16} /> {article.author.name}
              </span>
              <span className="text-xs text-white">{article.author.email}</span>
            </Link>
          )}

          <div className="rounded-md bg-[#FAF4F0] p-4">
            <span className="text-brand-primary text-xl font-semibold">
              RELATED BLOGS
            </span>
            <SuggestedArticles />
          </div>

          <Newsletter />
        </div> */}
      </section>
    </div>
  );
};
