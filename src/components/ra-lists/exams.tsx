import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import {
  Show,
  DateField,
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
import { FilterButton } from "@/components/admin/filter-form";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import DateTimeInput from "../admin/datetime-input";
import StatusSelect from "../shared/ArticleSTatusSelect";
import { PreviewButton } from "../shared/PreviewButton";
import { ExamPreview, LiveExamPreview } from "../exams/Exams";

const examLevels = [
  "CERT_III",
  "CERT_IV",
  "DIPLOMA",
  "ADVANCED_DIPLOMA",
  "BACHELORS",
  "MASTERS",
  "GRADUATE_DIPLOMA",
  "OTHER",
  "PACKAGE",
];

const examModes = ["ONLINE", "OFFLINE", "OTHER"];

const examFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <SelectInput
    source="level"
    choices={examLevels.map((l) => ({ id: l, name: l }))}
  />,
  <SelectInput
    source="mode"
    choices={examModes.map((m) => ({ id: m, name: m }))}
  />,
  <ReferenceInput source="author_id" reference="authors">
    <AutocompleteInput />
  </ReferenceInput>,
  <StatusSelect />,
];

const ExamListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const ExamList = () => (
  <List filters={examFilters} actions={<ExamListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="exam_name" />
      <DataTable.Col source="level" />
      <DataTable.Col source="mode" />
      <DataTable.Col
        source="is_active"
        render={(r) => {
          return String(r.is_active);
        }}
      />
      <DataTable.Col source="status" />
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ExamShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <RecordField source="id" />
          <RecordField source="exam_name" />
          <RecordField source="short_name" />
          <RecordField source="level" />
          <RecordField source="content" />
          <RecordField source="img1" />
          <RecordField source="img2" />
          <RecordField source="banner_img" />
          <RecordField source="mode" />
          <RecordField source="conducted_by" />
          <RecordField source="application_start_date">
            <DateField source="application_start_date" showTime />
          </RecordField>
          <RecordField source="application_end_date">
            <DateField source="application_end_date" showTime />
          </RecordField>
          <RecordField source="application_fees" />
          <RecordField source="exam_date">
            <DateField source="exam_date" showTime />
          </RecordField>
          <RecordField source="result_date">
            <DateField source="result_date" showTime />
          </RecordField>
          <RecordField source="slug" />
          <RecordField source="meta_title" />
          <RecordField source="meta_desc" />
          <RecordField source="keywords" />
          <RecordField source="canonical_url" />
          <RecordField
            source="is_active"
            render={(record) => (record?.is_active ? "Yes" : "No")}
          />
          <RecordField source="status" />
          <RecordField source="publishedAt">
            <DateField source="publishedAt" showTime />
          </RecordField>
          <RecordField source="author_id">
            <ReferenceField source="author_id" reference="authors" />
          </RecordField>
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton resource="exams" />
        </div>
        <div className="sticky top-24 self-start">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <ExamPreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);

export const ExamEdit = () => {
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
            <TextInput source="exam_name" validate={required()} />
            <TextInput source="short_name" />
            <SelectInput
              source="level"
              choices={examLevels.map((l) => ({ id: l, name: l }))}
            />
            <JoditInput source="content" />
            <ImageSelectorInput source="img1" />
            <ImageSelectorInput source="img2" />
            <ImageSelectorInput source="banner_img" />
            <SelectInput
              source="mode"
              choices={examModes.map((m) => ({ id: m, name: m }))}
            />
            <TextInput source="conducted_by" />
            <DateTimeInput source="application_start_date" />
            <DateTimeInput source="application_end_date" />
            <NumberInput source="application_fees" />
            <DateTimeInput source="exam_date" />
            <DateTimeInput source="result_date" />
            <TextInput source="slug" />
            <TextInput source="meta_title" />
            <TextInput source="meta_desc" />
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <DateTimeInput source="publishedAt" />
                <StatusSelect />
              </>
            )}
            <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput>
          </div>
          <div className="w-1/2 flex flex-col sticky top-24 self-start">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold">Preview</h2>
            </div>
            <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
              <LiveExamPreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const ExamCreate = () => {
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
            <TextInput source="exam_name" validate={required()} />
            <TextInput source="short_name" />
            <SelectInput
              source="level"
              choices={examLevels.map((l) => ({ id: l, name: l }))}
            />
            <JoditInput source="content" />
            <ImageSelectorInput source="img1" />
            <ImageSelectorInput source="img2" />
            <ImageSelectorInput source="banner_img" />
            <SelectInput
              source="mode"
              choices={examModes.map((m) => ({ id: m, name: m }))}
            />
            <TextInput source="conducted_by" />
            <DateTimeInput source="application_start_date" />
            <DateTimeInput source="application_end_date" />
            <NumberInput source="application_fees" />
            <DateTimeInput source="exam_date" />
            <DateTimeInput source="result_date" />
            <TextInput source="slug" />
            <TextInput source="meta_title" />
            <TextInput source="meta_desc" />
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <DateTimeInput source="publishedAt" />
                <StatusSelect />
              </>
            )}
            <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput>
          </div>
          <div className="w-1/2 flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
              <LiveExamPreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};
