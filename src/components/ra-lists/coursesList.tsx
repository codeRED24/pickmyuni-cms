import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

export const CourseList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="course_name" />
      <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" />
      <DataTable.Col source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </DataTable.Col>
      <DataTable.Col source="content" />
      <DataTable.Col source="slug" />
      <DataTable.Col source="type" />
      <DataTable.Col source="is_active" />
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);
