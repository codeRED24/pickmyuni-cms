import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

export const CollegesCourseList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" />
      <DataTable.Col source="college_id">
        <ReferenceField source="college_id" reference="colleges" />
      </DataTable.Col>
      <DataTable.Col source="course_id">
        <ReferenceField source="course_id" reference="courses" />
      </DataTable.Col>
      <DataTable.Col source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </DataTable.Col>

      <DataTable.Col source="is_active" />
      <DataTable.Col source="content" />
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);
