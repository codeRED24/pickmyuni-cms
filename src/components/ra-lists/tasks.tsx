import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

export const TaskList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" /> <DataTable.Col source="title" />
      <DataTable.Col source="content_type" />
      <DataTable.Col source="assigned_to_id">
        <ReferenceField source="assigned_to_id" reference="authors" />
      </DataTable.Col>
      <DataTable.Col source="created_by_id">
        <ReferenceField source="created_by_id" reference="authors" />
      </DataTable.Col>
      {/* <DataTable.Col source="description" /> */}
      <DataTable.Col source="content_id">
        <ReferenceField source="content_id" reference="contents" />
      </DataTable.Col>
      <DataTable.Col source="status" />
      <DataTable.Col source="due_date" />
      <DataTable.Col source="createdAt">
        <DateField showTime source="createdAt" />
      </DataTable.Col>
      <DataTable.Col source="updatedAt">
        <DateField showTime source="updatedAt" />
      </DataTable.Col>
    </DataTable>
  </List>
);

import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { Create, DateField, SelectInput } from "../admin";
import { required } from "ra-core";
// import { SelectInput } from "../admin";

export const TaskEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="content_type" />
      {/* <SelectInput source="status" choices={["a", "b"]} /> */}
      <ReferenceInput source="assigned_to_id" reference="authors">
        <AutocompleteInput />
      </ReferenceInput>
      {/* <ReferenceInput source="created_by_id" reference="authors">
        <AutocompleteInput />
      </ReferenceInput> */}
      <TextInput disabled source="createdAt" />
      <TextInput disabled source="updatedAt" />
      <TextInput source="title" />
      <TextInput multiline rows={4} source="description" />
      <TextInput source="due_date" />
      <ReferenceInput source="content_id" reference="contents">
        <AutocompleteInput />
      </ReferenceInput>
      {/* <TextInput source="assigned_to.id" />
      <TextInput source="created_by.id" /> */}
    </SimpleForm>
  </Edit>
);

export const TaskCreate = () => (
  <Create>
    <SimpleForm>
      <SelectInput
        choices={[
          "article",
          "course",
          "college_course",
          "collegewise_content",
          "city",
          "state",
          "stream",
          "specialization",
          "other",
        ]}
        source="content_type"
        label="ContentType"
        validate={required()}
      />
      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput label="Category" validate={required()} />
      </ReferenceInput>
      <div className="grid grid-cols-2 gap-2">
        <TextInput source="width" type="number" />
        <TextInput source="height" type="number" />
      </div>
      <TextInput source="price" type="number" />
      <TextInput source="stock" label="Stock" type="number" />
    </SimpleForm>
  </Create>
);

// model ContentTasks {
//   id             Int         @id @default(autoincrement())
//   content_type   ContentType
//   status         TaskStatus  @default(pending)
//   assigned_to_id Int
//   created_by_id  Int
//   createdAt      DateTime    @default(now())
//   updatedAt      DateTime    @updatedAt
//   title          String
//   description    String?
//   due_date       DateTime?
//   content_id     Int?

//   assigned_to Authors @relation("assigned_tasks", fields: [assigned_to_id], references: [id])
//   created_by  Authors @relation("created_tasks", fields: [created_by_id], references: [id])

//   @@index([status])
// }
