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
import {
  AutocompleteInput,
  Create,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from "../admin";
import { required, useDataProvider } from "ra-core";
import { useQuery } from "@tanstack/react-query";
import { humanize } from "inflection";

export const AuthorList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="preferred_name" />
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
      <RecordField source="reports_to_id">
        <ReferenceField source="reports_to_id" reference="authors" />
      </RecordField>
    </div>
  </Show>
);

const AuthorForm = ({ isCreate = false }) => {
  const dataProvider = useDataProvider();
  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: () => dataProvider.getRoles(),
  });

  if (isLoading) return null;

  const formattedChoices = (roles as any).data.map((role: any) => {
    return { id: role, name: humanize(role) };
  });

  return (
    <SimpleForm>
      {!isCreate && <TextInput source="id" disabled />}
      <TextInput source="name" />
      <TextInput source="preferred_name" />
      <TextInput source="email" disabled={!isCreate} />
      {isCreate && <TextInput source="password" />}
      <TextInput source="description" />
      <ImageSelectorInput source="image" />
      <ImageSelectorInput source="bg_url" />
      <TextInput source="designation" />
      <SelectInput
        source="role"
        choices={formattedChoices}
        isLoading={isLoading}
        validate={required()}
      />
      <ReferenceInput source="reports_to_id" reference="authors">
        <AutocompleteInput />
      </ReferenceInput>
    </SimpleForm>
  );
};

export const AuthorEdit = () => (
  <Edit>
    <AuthorForm />
  </Edit>
);

export const AuthorCreate = () => (
  <Create>
    <AuthorForm isCreate />
  </Create>
);
