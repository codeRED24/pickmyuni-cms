import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import {
  Show,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  RecordField,
  CreateButton,
  ExportButton,
  SearchInput,
} from "@/components/admin";
import { required, useGetIdentity } from "ra-core";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { Create, SelectInput, NumberInput } from "../admin";
import JoditInput from "../admin/JoditInput";
import { PreviewButton } from "../shared/PreviewButton";
import { ArticlePreview, LiveArticlePreview } from "../articles/Articles";
// import { ColumnsButton } from "@/components/admin/columns-button";
import { FilterButton } from "@/components/admin/filter-form";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import DateTimeInput from "../admin/datetime-input";
import StatusSelect from "../shared/ArticleSTatusSelect";

const articleSilos = [
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
];

const articleFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <SelectInput source="silos" choices={articleSilos} />,
  <ReferenceInput source="author_id" reference="authors">
    <AutocompleteInput />
  </ReferenceInput>,
  <StatusSelect />,
];

const ArticleListActions = () => (
  <div className="flex items-center gap-2">
    {/* <ColumnsButton /> */}
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const ArticleList = () => (
  <List filters={articleFilters} actions={<ArticleListActions />}>
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
      <DataTable.Col source="status" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
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
          <RecordField source="status" />
          <RecordField source="deletedAt">
            <DateField source="deletedAt" showTime />
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
          <PreviewButton resource="articles" />
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

export const ArticleEdit = () => {
  const { identity, isLoading } = useGetIdentity();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isContentWriter = identity?.role === "content_writer";

  return (
    <Edit>
      <SimpleForm className="max-w-full">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-4">
            <TextInput disabled source="id" />
            <TextInput multiline source="title" />
            <JoditInput source="content" />
            <SelectInput source="silos" choices={articleSilos} />
            <TextInput multiline source="slug" />
            <TextInput source="canonical_url" />
            <TextInput multiline source="meta_desc" />
            <ImageSelectorInput source="og_img" folderPath="Article/og_img" />
            <TextInput disabled source="createdAt" />
            <TextInput disabled source="updatedAt" />
            <NumberInput source="score" />
            <ImageSelectorInput
              source="banner_img"
              folderPath="Article/banner_img"
            />
            <ImageSelectorInput source="img1" folderPath="Article/img1" />
            <ImageSelectorInput source="img2" folderPath="Article/img2" />

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <DateTimeInput source="publishedAt" />
                <StatusSelect />
              </>
            )}

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
};

export const ArticleCreate = () => {
  const { identity, isLoading } = useGetIdentity();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isContentWriter = identity?.role === "content_writer";

  return (
    <Create>
      <SimpleForm className="max-w-full">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-4">
            <TextInput source="title" validate={required()} multiline />
            <JoditInput source="content" />
            <SelectInput
              source="silos"
              choices={articleSilos}
              validate={required()}
            />
            <TextInput source="slug" validate={required()} multiline />
            <TextInput source="canonical_url" />
            <TextInput source="meta_desc" multiline />
            <TextInput source="metatitle" multiline />
            <TextInput source="keywords" multiline />
            <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput optionText="name" validate={required()} />
            </ReferenceInput>
            <NumberInput source="score" />
            <ImageSelectorInput source="og_img" folderPath="Article/og_img" />
            <ImageSelectorInput
              source="banner_img"
              folderPath="Article/banner_img"
            />
            <ImageSelectorInput source="img1" folderPath="Article/img1" />
            <ImageSelectorInput source="img2" folderPath="Article/img2" />

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <DateTimeInput source="publishedAt" />
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}
          </div>
          <div className="w-1/2 flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
              <LiveArticlePreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};
