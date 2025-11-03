import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { FilterButton, ExportButton, SearchInput } from "../admin";
import { DateField } from "@/components/admin/date-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const subscriptionFilters = [<SearchInput source="q" alwaysOn />];

const SubscriptionListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
  </div>
);

export const SubscriptionList = () => (
  <List filters={subscriptionFilters} actions={<SubscriptionListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="phn_no" />
      <DataTable.Col source="createdAt">
        <DateField source="createdAt" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const SubscriptionShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id" />
      <RecordField source="name" />
      <RecordField source="email" />
      <RecordField source="phn_no" />
      <RecordField source="query" />
      <RecordField source="createdAt">
        <DateField showTime source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField showTime source="updatedAt" />
      </RecordField>
    </div>
  </Show>
);
