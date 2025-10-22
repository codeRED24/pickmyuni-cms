import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { Create, NumberInput, TextField } from "../admin";
import { PreviewButton } from "../shared/PreviewButton";
import { LiveCityPreview, StaticCityPreview } from "../cities/CityPreview";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { required } from "ra-core";
import JoditInput from "../admin/JoditInput";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";

export const CourseList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="course_name" />
      <DataTable.Col source="duration_in_months" />
      {/* <DataTable.Col source="rating" /> */}
      <DataTable.Col source="score" />
      <DataTable.Col source="meta_desc" />
      <DataTable.Col source="og_img" />
      {/* <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" /> */}
      <DataTable.Col source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </DataTable.Col>
      {/* <DataTable.Col source="banner_img" />
      <DataTable.Col source="img1" />
      <DataTable.Col source="img2" />
      <DataTable.Col source="content" />
      <DataTable.Col source="slug" /> */}
      <DataTable.Col source="type" />
      <DataTable.Col source="is_active" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
      {/* <DataTable.Col source="keywords" />
      <DataTable.Col source="canonical_url" /> */}
    </DataTable>
  </List>
);

export const CourseShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3 space-y-4">
        <RecordField source="id">
          <NumberField source="id" />
        </RecordField>
        <RecordField source="course_name" />
        <RecordField source="content">
          <TextField source="content" className="line-clamp-4" />
        </RecordField>
        <RecordField source="duration_in_months">
          <NumberField source="duration_in_months" />
        </RecordField>
        <RecordField source="rating">
          <NumberField source="rating" />
        </RecordField>
        <RecordField source="score">
          <NumberField source="score" />
        </RecordField>
        <RecordField source="meta_desc" />
        <RecordField source="og_img" />
        <RecordField source="createdAt">
          <DateField source="createdAt" />
        </RecordField>
        <RecordField source="updatedAt">
          <DateField source="updatedAt" />
        </RecordField>
        <RecordField source="deletedAt">
          <DateField source="deletedAt" showTime />
        </RecordField>
        <RecordField source="streamId">
          <ReferenceField source="streamId" reference="streams" />
        </RecordField>
        <RecordField source="banner_img" />
        <RecordField source="img1" />
        <RecordField source="img2" />
        <RecordField source="slug" />
        <RecordField source="type" />
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
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton resource="courses" />
        </div>
        <div className="sticky top-24 self-start w-full">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[75vh]">
            <StaticCityPreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);

export const CourseEdit = () => (
  <Edit>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="id" disabled />
          <JoditInput source="content" />
          <TextInput source="rating" />
          <NumberInput source="score" validate={required()} />
          <TextInput source="meta_desc" />
          <ImageSelectorInput source="og_img" />
          <ReferenceInput source="streamId" reference="streams">
            <AutocompleteInput />
          </ReferenceInput>
          <ImageSelectorInput source="banner_img" />
          <ImageSelectorInput source="img1" />
          <ImageSelectorInput source="img2" />
          <TextInput source="slug" />
          <TextInput source="type" />
          <BooleanInput source="is_active" />
          {/* <ReferenceInput source="author_id" reference="authors">
            <AutocompleteInput />
          </ReferenceInput> */}
          <TextInput source="keywords" />
          <TextInput source="canonical_url" />
        </div>
        <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="border rounded-lg p-4 h-full bg-white overflow-auto max-h-[72vh]">
            <LiveCityPreview />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Edit>
);

export const CourseCreate = () => (
  <Create>
    <SimpleForm className="max-w-full">
      <div className="flex gap-4">
        <div className="w-1/2 space-y-4">
          <TextInput source="id" disabled />
          <TextInput source="course_name" validate={required()} />{" "}
          <JoditInput source="content" />
          <NumberInput source="duration_in_months" />
          <TextInput source="rating" />
          <NumberInput source="score" validate={required()} />
          <TextInput source="meta_desc" />
          <ImageSelectorInput source="og_img" />
          <ReferenceInput source="streamId" reference="streams">
            <AutocompleteInput />
          </ReferenceInput>
          <ImageSelectorInput source="banner_img" />
          <ImageSelectorInput source="img1" />
          <ImageSelectorInput source="img2" />
          <TextInput source="slug" />
          <TextInput source="type" />
          <BooleanInput source="is_active" />
          {/* <ReferenceInput source="author_id" reference="authors">
            <AutocompleteInput />
          </ReferenceInput> */}
          <TextInput source="keywords" />
          <TextInput source="canonical_url" />
        </div>
        <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="border rounded-lg p-4 h-full bg-white overflow-auto max-h-[72vh]">
            <LiveCityPreview />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Create>
);
