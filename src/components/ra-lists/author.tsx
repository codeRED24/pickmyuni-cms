import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { Edit } from "@/components/admin/edit";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import { Create, SelectInput } from "../admin";

const roles = [
  { id: "admin", name: "admin" },
  {
    id: "content_head",
    name: "content_head",
  },
  {
    id: "content_tl",
    name: "content_tl",
  },
  {
    id: "content_writer",
    name: "content_writer",
  },
  {
    id: "data_head",
    name: "data_head",
  },
  {
    id: "data_analyst",
    name: "data_analyst",
  },
  {
    id: "other",
    name: "other",
  },
];

export const AuthorList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="preferred_name" />
      <DataTable.Col source="description" />
      <DataTable.Col source="designation" />
      <DataTable.Col source="email" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="role" />
    </DataTable>
  </List>
);

export const AuthorShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="name" />
      <RecordField source="preferred_name" />
      <RecordField source="description" />
      <RecordField source="image" />
      <RecordField source="email" />
      <RecordField source="createdAt">
        <DateField showTime source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField source="updatedAt" />
      </RecordField>
      <RecordField source="deletedAt">
        <DateField showTime source="deletedAt" />
      </RecordField>
      <RecordField source="bg_url" />
      <RecordField source="designation" />
      <RecordField source="role" />
    </div>
  </Show>
);

export const AuthorEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="preferred_name" />
      <TextInput source="email" disabled />
      <TextInput source="description" />
      <ImageSelectorInput source="image" />
      {/* <TextInput source="createdAt" />
      <TextInput source="updatedAt" />
      <TextInput source="deletedAt" /> */}
      <ImageSelectorInput source="bg_url" />
      <TextInput source="designation" />
      <SelectInput source="role" choices={roles} />
    </SimpleForm>
  </Edit>
);

export const AuthorCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="preferred_name" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="description" />
      <ImageSelectorInput source="image" />
      <ImageSelectorInput source="bg_url" />
      <TextInput source="designation" />
      <SelectInput source="role" choices={roles} />
    </SimpleForm>
  </Create>
);
