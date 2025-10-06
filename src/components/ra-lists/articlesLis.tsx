import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

export const ArticleList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      {/* <DataTable.Col source="content" /> */}
      <DataTable.Col source="silos" />
      {/* <DataTable.Col source="meta_desc" /> */}
      {/* <DataTable.Col source="og_img" /> */}
      {/* <DataTable.Col source="createdAt" />
      <DataTable.Col source="updatedAt" /> */}
      <DataTable.Col source="score" />
      {/* <DataTable.Col source="banner_img" />
      <DataTable.Col source="img1" />
      <DataTable.Col source="img2" /> */}
      <DataTable.Col source="slug" />
      <DataTable.Col
        source="is_active"
        render={(r) => {
          return String(r.is_active);
        }}
      />
      {/* <DataTable.Col source="keywords" />
      <DataTable.Col source="metatitle" /> */}
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
      <DataTable.Col source="author.name" />
    </DataTable>
  </List>
);
