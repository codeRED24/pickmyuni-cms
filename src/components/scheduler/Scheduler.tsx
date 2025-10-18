import { List, DateField } from "@/components/admin";
import { DataTable } from "@/components/admin/data-table";

export const SchedulerList = () => (
  <List
    resource="articles"
    filter={{ status: "SCHEDULED" }}
    title="Scheduled Articles"
  >
    <DataTable>
      <DataTable.Col source="title" />
      <DataTable.Col
        source="publishedAt"
        render={(record) => (
          <DateField record={record} source="publishedAt" showTime />
        )}
      />
    </DataTable>
  </List>
);
