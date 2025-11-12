import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { Create, NumberInput, TextField } from "../admin";
import { LiveStatePreview, StaticStatePreview } from "../states/StatePreview";
import { PreviewButton } from "../shared/PreviewButton";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import JoditInput from "../admin/JoditInput";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import { required, useGetIdentity } from "ra-core";
import StatusSelect from "../shared/ArticleSTatusSelect";

export const StateList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      {/* <DataTable.Col source="slug" /> */}
      {/* <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" /> */}
      <DataTable.Col source="score" />
      {/* <DataTable.Col source="banner_img" />
      <DataTable.Col source="img1" />
      <DataTable.Col source="img2" /> */}
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="status" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      {/* <DataTable.Col source="content" /> */}
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
      {/* <DataTable.Col source="keywords" />
      <DataTable.Col source="canonical_url" /> */}
    </DataTable>
  </List>
);

export const StateShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3 space-y-4">
        <RecordField source="id">
          <NumberField source="id" />
        </RecordField>
        <RecordField source="name" />
        <RecordField source="slug" />
        <RecordField source="content">
          <TextField source="content" className="line-clamp-4" />
        </RecordField>
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
          <TextField source="banner_img" />
        </RecordField>
        <RecordField source="img1">
          <TextField source="img1" />
        </RecordField>
        <RecordField source="img2">
          <TextField source="img2" />
        </RecordField>
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
          <PreviewButton resource="states" />
        </div>
        <div className="sticky top-24 self-start w-full">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[75vh]">
            <StaticStatePreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);

export const StateEdit = () => {
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
            <TextInput source="id" disabled />
            <TextInput source="name" validate={required()} />
            <TextInput source="slug" validate={required()} />
            <JoditInput source="content" />
            <NumberInput source="score" />
            <ImageSelectorInput source="banner_img" folderPath="states/banner_img" />
            <ImageSelectorInput source="img1" folderPath="states/img1" />
            <ImageSelectorInput source="img2" folderPath="states/img2" />
            {/* <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput> */}
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}
          </div>
          <div className="w-1/2 flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
              <LiveStatePreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const StateCreate = () => {
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
            <TextInput source="name" validate={required()} />
            <TextInput source="slug" validate={required()} />
            <JoditInput source="content" />
            <NumberInput source="score" />
            <ImageSelectorInput source="banner_img" folderPath="states/banner_img" />
            <ImageSelectorInput source="img1" folderPath="states/img1" />
            <ImageSelectorInput source="img2" folderPath="states/img2" />
            {/* <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput> */}
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}
          </div>
          <div className="w-1/2 flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[72vh]">
              <LiveStatePreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};
