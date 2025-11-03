import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { FilterButton, ExportButton, SearchInput } from "../admin";
import { DateField } from "@/components/admin/date-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const newsletterFilters = [<SearchInput source="q" alwaysOn />];

const NewsletterListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
  </div>
);

export const NewsletterList = () => (
  <List filters={newsletterFilters} actions={<NewsletterListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="created_at">
        <DateField source="created_at" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const NewsletterShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id" />
      <RecordField source="name" />
      <RecordField source="email" />
      <RecordField source="created_at">
        <DateField showTime source="created_at" />
      </RecordField>
      <RecordField source="updated_at">
        <DateField showTime source="updated_at" />
      </RecordField>
    </div>
  </Show>
);
