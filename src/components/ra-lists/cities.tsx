import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import {
  Create,
  CreateButton,
  DateField,
  ExportButton,
  FilterButton,
  NumberField,
  NumberInput,
  RecordField,
  SearchInput,
  SelectInput,
  Show,
  TextField,
} from "../../components/admin";
import { required } from "ra-core";
import JoditInput from "../admin/JoditInput";
import { LiveCityPreview, StaticCityPreview } from "../cities/CityPreview";
import { PreviewButton } from "../shared/PreviewButton";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import StatusSelect from "../shared/ArticleSTatusSelect";

const cityFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <ReferenceInput source="author_id" reference="authors">
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput source="state_id" reference="states">
    <AutocompleteInput />
  </ReferenceInput>,
  <StatusSelect />,
];

const CityListActions = () => (
  <div className="flex items-center gap-2">
    {/* <ColumnsButton /> */}
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const CityList = () => (
  <List filters={cityFilters} actions={<CityListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="score" />
      <DataTable.Col source="state_id">
        <ReferenceField source="state_id" reference="states" />
      </DataTable.Col>
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
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

export const CityEdit = () => (
  <Edit>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="id" disabled />
          <TextInput source="name" validate={required()} />
          <TextInput source="slug" validate={required()} />
          <JoditInput source="content" />
          <NumberInput source="score" />
          <ReferenceInput source="state_id" reference="states">
            <AutocompleteInput />
          </ReferenceInput>
          {/* <ReferenceInput source="author_id" reference="authors">
            <AutocompleteInput />
          </ReferenceInput> */}
          <ImageSelectorInput source="banner_img" />
          <ImageSelectorInput source="img1" />
          <ImageSelectorInput source="img2" />
          <TextInput source="keywords" multiline />
          <TextInput source="canonical_url" multiline />
          <BooleanInput source="is_active" />
          <StatusSelect />
          <TextInput source="createdAt" disabled />
          <TextInput source="updatedAt" disabled />
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

export const CityCreate = () => (
  <Create>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="name" validate={required()} />
          <TextInput source="slug" validate={required()} />
          <JoditInput source="content" />
          <NumberInput source="score" />
          <ReferenceInput source="state_id" reference="states">
            <AutocompleteInput />
          </ReferenceInput>
          {/* <ReferenceInput source="author_id" reference="authors">
            <AutocompleteInput />
          </ReferenceInput> */}
          <ImageSelectorInput source="banner_img" />
          <ImageSelectorInput source="img1" />
          <ImageSelectorInput source="img2" />
          <TextInput source="keywords" multiline />
          <TextInput source="canonical_url" multiline />
          <BooleanInput source="is_active" />
          <StatusSelect />
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

export const CityShow = () => (
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
          <RecordField source="content">
            <TextField source="content" className="line-clamp-6" />
          </RecordField>
          <RecordField source="country_id">
            <ReferenceField source="country_id" reference="countries" />
          </RecordField>
          <RecordField source="state_id">
            <ReferenceField source="state_id" reference="states" />
          </RecordField>
          <RecordField source="banner_img" />
          <RecordField source="img1" />
          <RecordField source="img2" />
          <RecordField
            source="is_active"
            render={(record) => (record.is_active ? "Yes" : "No")}
          />
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
          <PreviewButton resource="cities" />
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
