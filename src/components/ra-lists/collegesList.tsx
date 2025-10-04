import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

export const CollegeList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="college_name" />
      <DataTable.Col source="location" />
      <DataTable.Col source="score" />
      <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" />
      <DataTable.Col source="slug" />
      <DataTable.Col source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </DataTable.Col>
      <DataTable.Col source="cityId">
        <ReferenceField source="cityId" reference="cities" />
      </DataTable.Col>
      <DataTable.Col source="stateId">
        <ReferenceField source="stateId" reference="states" />
      </DataTable.Col>
      {/* <DataTable.Col source="avg_fees_in_aud" />
      <DataTable.Col source="brochure_url" />
      <DataTable.Col source="search_names" />
      <DataTable.Col source="address" /> */}
      <DataTable.Col source="parent_college_id">
        <ReferenceField
          source="parent_college_id"
          reference="parent_colleges"
        />
      </DataTable.Col>
      {/* <DataTable.Col source="established" /> */}
      <DataTable.Col source="is_active" />
      <DataTable.Col source="type" />
      <DataTable.Col source="is_parent" />
      <DataTable.Col source="is_affordable" />
      <DataTable.Col source="is_open" />
    </DataTable>
  </List>
);
