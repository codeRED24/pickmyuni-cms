import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { FilterButton, ExportButton, SearchInput } from "../admin";
import { DateField } from "@/components/admin/date-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const contactUsFilters = [<SearchInput source="q" alwaysOn />];

const ContactUsListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
  </div>
);

export const ContactUsList = () => (
  <List filters={contactUsFilters} actions={<ContactUsListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="first_name" />
      <DataTable.Col source="last_name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="phn_no" />
      <DataTable.Col source="createdAt">
        <DateField source="createdAt" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ContactUsShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id" />
      <RecordField source="first_name" />
      <RecordField source="last_name" />
      <RecordField source="email" />
      <RecordField source="phn_no" />
      <RecordField source="user_msg" />
      <RecordField source="url" />
      <RecordField source="createdAt">
        <DateField showTime source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField showTime source="updatedAt" />
      </RecordField>
    </div>
  </Show>
);
