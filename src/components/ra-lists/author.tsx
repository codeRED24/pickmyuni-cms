import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
// import { ReferenceField } from "@/components/admin/reference-field";

export const AuthorList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="preferred_name" />
      {/* <DataTable.Col source="role_id">
        <ReferenceField source="role_id" reference="roles" />
      </DataTable.Col> */}
      <DataTable.Col source="description" />
      <DataTable.Col source="designation" />
      {/* <DataTable.Col source="image" /> */}
      <DataTable.Col source="is_active" />
      <DataTable.Col source="email" />
      {/* <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" /> */}
      <DataTable.Col source="deletedAt" />
      {/* <DataTable.Col source="bg_url" /> */}
      {/* <DataTable.Col source="permit_id">
        <ReferenceField source="permit_id" reference="permits" />
      </DataTable.Col> */}
    </DataTable>
  </List>
);

// import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
// import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";

export const AuthorEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="preferred_name" />
      {/* <ReferenceInput source="role_id" reference="roles">
        <AutocompleteInput />
      </ReferenceInput> */}
      <TextInput source="description" />
      <TextInput source="designation" />
      <TextInput source="image" />
      <BooleanInput source="is_active" />
      <TextInput source="email" />
      <TextInput source="bg_url" />
    </SimpleForm>
  </Edit>
);
