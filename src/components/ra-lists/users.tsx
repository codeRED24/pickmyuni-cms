import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { FilterButton, ExportButton, SearchInput } from "../admin";
import { DateField } from "@/components/admin/date-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const userFilters = [<SearchInput source="q" alwaysOn />];

const UserListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
  </div>
);

export const UserList = () => (
  <List filters={userFilters} actions={<UserListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="contact_number" />
      <DataTable.Col source="user_type" />
      <DataTable.Col source="created_at">
        <DateField source="created_at" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const UserShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id" />
      <RecordField source="name" />
      <RecordField source="email" />
      <RecordField source="contact_number" />
      <RecordField source="gender" />
      <RecordField source="country_of_origin" />
      <RecordField source="college_roll_number" />
      <RecordField source="user_location" />
      <RecordField source="dob">
        <DateField source="dob" />
      </RecordField>
      <RecordField source="user_type" />
      <RecordField source="user_img_url" />
      <RecordField source="created_at">
        <DateField showTime source="created_at" />
      </RecordField>
      <RecordField source="updated_at">
        <DateField showTime source="updated_at" />
      </RecordField>
    </div>
  </Show>
);
