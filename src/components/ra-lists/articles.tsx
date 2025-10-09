import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import {
  Show,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  RecordField,
} from "@/components/admin";
import { useRecordContext, required, RecordContextProvider } from "ra-core";
import { useWatch } from "react-hook-form";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { Create, SelectInput } from "../admin";
import ArticleContent from "../shared/ArticleContent";
import dayjs from "dayjs";
import JoditInput from "../admin/JoditInput";
import { PreviewButton } from "../shared/PreviewButton";

export const ArticleList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="silos" />
      <DataTable.Col source="score" />
      <DataTable.Col
        source="is_active"
        render={(r) => {
          return String(r.is_active);
        }}
      />
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ArticleShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <RecordField source="id" />
          <RecordField source="title" />
          <RecordField source="content">
            <TextField source="content" className="line-clamp-6" />
          </RecordField>
          <RecordField source="silos" />
          <RecordField source="meta_desc" />
          <RecordField source="og_img" />
          <RecordField source="createdAt">
            <DateField source="createdAt" />
          </RecordField>
          <RecordField source="updatedAt">
            <DateField source="updatedAt" />
          </RecordField>
          <RecordField source="score">
            <NumberField source="score" />
          </RecordField>
          <RecordField source="banner_img" />
          <RecordField source="img1" />
          <RecordField source="img2" />
          <RecordField source="slug" />
          <RecordField
            source="is_active"
            render={(record) => (record?.is_active ? "Yes" : "No")}
          />
          <RecordField source="keywords" />
          <RecordField source="metatitle" />
          <RecordField source="author_id">
            <ReferenceField source="author_id" reference="authors" />
          </RecordField>
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton />
        </div>
        <div className="sticky top-24 self-start">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <ArticlePreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);

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
      <section className="container mx-auto flex flex-col gap-8 py-8 md:py-12 lg:flex-row lg:py-16">
        <div className="lg:w-3/4">
          <ArticleContent content={record.content || ""} />
        </div>
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

const LiveArticlePreview = () => {
  const record = useRecordContext();
  const data = useWatch();
  const liveRecord = { ...record, ...data };

  return (
    <RecordContextProvider value={liveRecord}>
      <ArticlePreview />
    </RecordContextProvider>
  );
};

export const ArticleEdit = () => (
  <Edit>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput disabled source="id" />
          <TextInput multiline source="title" />
          <JoditInput source="content" />
          <TextInput source="silos" />
          <TextInput multiline source="meta_desc" />
          <TextInput multiline source="og_img" />
          <TextInput disabled source="createdAt" />
          <TextInput disabled source="updatedAt" />
          <TextInput source="score" />
          <TextInput multiline source="banner_img" />
          <TextInput multiline source="img1" />
          <TextInput multiline source="img2" />
          <TextInput multiline source="slug" />
          <BooleanInput source="is_active" />
          <TextInput multiline source="keywords" />
          <TextInput multiline source="metatitle" />
          <ReferenceInput source="author_id" reference="authors">
            <AutocompleteInput />
          </ReferenceInput>
        </div>
        <div className="w-1/2 flex flex-col sticky top-24 self-start">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-bold">Preview</h2>
          </div>
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <LiveArticlePreview />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} multiline />
      <TextInput source="content" validate={required()} multiline />
      <SelectInput
        source="silos"
        choices={[
          "news",
          "exam",
          "course",
          "blog",
          "other",
          "universities",
          "fees_scholarships_and_costs",
          "international_student_essentials",
          "transfers_and_migration_advice",
          "application_admissions_and_compliance",
        ]}
        validate={required()}
      />
      <TextInput source="slug" validate={required()} multiline />
      <TextInput source="meta_desc" multiline />
      <TextInput source="metatitle" multiline />
      <TextInput source="keywords" multiline />
      <ReferenceInput source="author_id" reference="authors">
        <AutocompleteInput optionText="name" validate={required()} />
      </ReferenceInput>
      <TextInput source="score" />
      <TextInput source="og_img" multiline />
      <TextInput source="banner_img" multiline />
      <TextInput source="img1" multiline />
      <TextInput source="img2" multiline />
    </SimpleForm>
  </Create>
);
