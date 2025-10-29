import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { useRecordContext } from "ra-core";
import { TextField } from "../admin";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import DateTimeInput from "@/components/admin/datetime-input";
import { Create, DateField, SelectInput } from "../admin";
import { required } from "ra-core";
import { useWatch } from "react-hook-form";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const contentTypeResourceMap: {
  [key: string]: { resource: string; optionText: string };
} = {
  article: { resource: "articles", optionText: "title" },
  course: { resource: "courses", optionText: "course_name" },
  college_course: { resource: "colleges-courses", optionText: "name" },
  collegewise_content: {
    resource: "collegeswise-content",
    optionText: "title",
  },
  city: { resource: "cities", optionText: "name" },
  state: { resource: "states", optionText: "name" },
  stream: { resource: "streams", optionText: "name" },
  // specialization: { resource: "specializations", optionText: "name" }, // Resource not defined in App.tsx
};

const contentTypeOptions = [
  { id: "article", name: "Article" },
  { id: "course", name: "Course" },
  { id: "college_course", name: "College Course" },
  { id: "collegewise_content", name: "Collegewise Content" },
  { id: "city", name: "City" },
  { id: "state", name: "State" },
  { id: "stream", name: "Stream" },
  { id: "specialization", name: "Specialization" },
];

const taskStatuses = [
  { id: "DRAFT", name: "DRAFT" },
  { id: "PENDING_APPROVAL", name: "PENDING_APPROVAL" },
  { id: "REJECTED", name: "REJECTED" },
  { id: "COMPLETED", name: "COMPLETED" },
];

const DynamicContentField = (props: any) => {
  const record = useRecordContext();
  if (!record || !record.content_type) return null;

  const mapping = contentTypeResourceMap[record.content_type];
  if (!mapping) {
    return <TextField source="content_id" {...props} />;
  }

  const { resource, optionText } = mapping;

  return (
    <ReferenceField
      source="content_id"
      reference={resource}
      {...props}
      link="show"
    >
      <TextField source={optionText} />
    </ReferenceField>
  );
};

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
        <DynamicContentField />
      </DataTable.Col>
      <DataTable.Col source="status" />
      <DataTable.Col source="due_date">
        <DateField showTime source="due_date" />
      </DataTable.Col>
      <DataTable.Col source="createdAt">
        <DateField showTime source="createdAt" />
      </DataTable.Col>
      <DataTable.Col source="updatedAt">
        <DateField showTime source="updatedAt" />
      </DataTable.Col>
    </DataTable>
  </List>
);

const ContentReferenceInput = () => {
  const contentType = useWatch({ name: "content_type" });

  if (contentType && contentTypeResourceMap[contentType]) {
    const { resource, optionText } = contentTypeResourceMap[contentType];
    return (
      <ReferenceInput source="content_id" reference={resource}>
        <AutocompleteInput optionText={optionText} />
      </ReferenceInput>
    );
  }

  return null;
};

export const TaskEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <SelectInput
        source="content_type"
        choices={contentTypeOptions}
        validate={required()}
      />
      <SelectInput
        source="status"
        choices={taskStatuses}
        validate={required()}
      />
      <ReferenceInput source="assigned_to_id" reference="authors">
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput disabled source="createdAt" />
      <TextInput disabled source="updatedAt" />
      <TextInput source="title" />
      <TextInput multiline source="description" />
      <DateTimeInput source="due_date" />
      <ContentReferenceInput />
    </SimpleForm>
  </Edit>
);

export const TaskCreate = () => (
  <Create>
    <SimpleForm>
      <SelectInput
        choices={contentTypeOptions}
        source="content_type"
        validate={required()}
      />
      <SelectInput
        source="status"
        choices={taskStatuses}
        validate={required()}
      />
      <ReferenceInput source="assigned_to_id" reference="authors">
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="description" />
      <DateTimeInput source="due_date" />
      <ContentReferenceInput />
    </SimpleForm>
  </Create>
);

export const TaskShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="content_type" />
      <RecordField source="status" />
      <RecordField source="assigned_to_id">
        <ReferenceField source="assigned_to_id" reference="authors" />
      </RecordField>
      <RecordField source="created_by_id">
        <ReferenceField source="created_by_id" reference="authors" />
      </RecordField>
      <RecordField source="createdAt">
        <DateField source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField source="updatedAt" />
      </RecordField>
      <RecordField source="title" />
      <RecordField source="description" />
      <RecordField source="due_date">
        <DateField showTime source="due_date" />
      </RecordField>
      <RecordField source="content_id">
        <DynamicContentField />
      </RecordField>
    </div>
  </Show>
);
