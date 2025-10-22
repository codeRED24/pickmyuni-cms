import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import {
  Create,
  CreateButton,
  ExportButton,
  FilterButton,
  NumberInput,
  SearchInput,
  TextField,
} from "../admin";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import JoditInput from "../admin/JoditInput";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import { LiveCityPreview, StaticCityPreview } from "../cities/CityPreview";
import { PreviewButton } from "../shared/PreviewButton";

const StreamFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <ReferenceInput source="author_id" reference="authors">
    <AutocompleteInput />
  </ReferenceInput>,
];

const StreamListActions = () => (
  <div className="flex items-center gap-2">
    {/* <ColumnsButton /> */}
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const StreamList = () => (
  <List filters={StreamFilters} actions={<StreamListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="slug" />
      <DataTable.Col source="score" />
      <DataTable.Col source="is_active" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const StreamShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <RecordField source="id">
            <NumberField source="id" />
          </RecordField>
          <RecordField source="name" />
          <RecordField source="slug" />
          <RecordField source="createdAt">
            <DateField source="createdAt" />
          </RecordField>
          <RecordField source="updatedAt">
            <DateField source="updatedAt" />
          </RecordField>
          <RecordField source="deletedAt">
            <DateField source="deletedAt" showTime />
          </RecordField>
          <RecordField source="score">
            <NumberField source="score" />
          </RecordField>
          <RecordField source="banner_img">
            <DateField source="banner_img" />
          </RecordField>
          <RecordField source="img1">
            <DateField source="img1" />
          </RecordField>
          <RecordField source="img2">
            <DateField source="img2" />
          </RecordField>
          <RecordField
            source="is_active"
            render={(record) => (record.is_active ? "Yes" : "No")}
          />
          <RecordField source="content">
            <TextField source="content" className="line-clamp-4" />
          </RecordField>
          <RecordField source="author_id">
            <ReferenceField source="author_id" reference="authors" />
          </RecordField>
          <RecordField source="keywords" />
          <RecordField source="canonical_url" />
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton resource="streams" />
        </div>
        <div className="sticky top-24 self-start">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <StaticCityPreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);

export const StreamEdit = () => (
  <Edit>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="id" disabled />
          <TextInput source="name" />
          <TextInput source="slug" />
          <JoditInput source="content" />
          <TextInput source="createdAt" disabled />
          <TextInput source="updatedAt" disabled />
          <NumberInput source="score" />
          <ImageSelectorInput source="banner_img" />
          <ImageSelectorInput source="img1" />
          <ImageSelectorInput source="img2" />
          <BooleanInput source="is_active" />
          <TextInput source="keywords" />
          <TextInput source="canonical_url" />
        </div>
        <div className="w-1/2 flex flex-col sticky top-24 self-start">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <LiveCityPreview />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Edit>
);

export const StreamCreate = () => (
  <Create>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="name" />
          <TextInput source="slug" />
          <JoditInput source="content" />
          <NumberInput source="score" />
          {/* <TextInput source="banner_img" />
          <TextInput source="img1" />
          <TextInput source="img2" /> */}
          <BooleanInput source="is_active" />
          <TextInput source="keywords" />
          <TextInput source="canonical_url" />
        </div>
        <div className="w-1/2 flex flex-col sticky top-24 self-start">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
            <LiveCityPreview />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Create>
);
