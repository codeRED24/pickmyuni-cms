import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { Edit } from "@/components/admin/edit";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import {
  SelectInput,
  TextField,
  FilterButton,
  NumberInput,
  ExportButton,
  SearchInput,
} from "../admin";
import { required } from "ra-core";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import DateTimeInput from "../admin/datetime-input";

const reviewFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="user_id" reference="users">
    <AutocompleteInput optionText={"name"} />
  </ReferenceInput>,
  <ReferenceInput source="college_id" reference="colleges">
    <AutocompleteInput
      optionText={(record) => `${record.id} - ${record.college_name}`}
      validate={required()}
    />
  </ReferenceInput>,
  <SelectInput
    source="status"
    choices={[
      { id: "pending", name: "Pending" },
      { id: "approved", name: "Approved" },
      { id: "rejected", name: "Rejected" },
    ]}
  />,
];

const ReviewListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
  </div>
);

export const ReviewList = () => (
  <List filters={reviewFilters} actions={<ReviewListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="review_title" />
      <DataTable.Col source="user_id">
        <ReferenceField source="user_id" reference="users">
          <TextField source="name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="college_id">
        <ReferenceField source="college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="overall_satisfaction_rating" />
      <DataTable.Col source="status" />
      <DataTable.Col source="created_at">
        <DateField source="created_at" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="user_id" reference="users">
        <AutocompleteInput optionText={"name"} validate={required()} />
      </ReferenceInput>
      <ReferenceInput source="college_id" reference="colleges">
        <AutocompleteInput
          optionText={(record) => `${record.id} - ${record.college_name}`}
          validate={required()}
        />
      </ReferenceInput>
      <TextInput source="review_title" />
      <NumberInput source="overall_satisfaction_rating" min={1} max={5} />
      <TextInput source="overall_experience_feedback" multiline />
      <SelectInput
        source="status"
        choices={[
          { id: "pending", name: "Pending" },
          { id: "approved", name: "Approved" },
          { id: "rejected", name: "Rejected" },
        ]}
        validate={required()}
      />
      <SelectInput
        source="reward_status"
        choices={[
          { id: "pending", name: "Pending" },
          { id: "approved", name: "Approved" },
          { id: "rejected", name: "Rejected" },
        ]}
        validate={required()}
      />
      <BooleanInput source="isAnonymous" />
      <DateTimeInput source="created_at" disabled />
      <DateTimeInput source="updated_at" disabled />
    </SimpleForm>
  </Edit>
);

export const ReviewShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="user_id">
        <ReferenceField source="user_id" reference="users" />
      </RecordField>
      <RecordField source="college_id">
        <ReferenceField source="college_id" reference="colleges" />
      </RecordField>
      <RecordField source="review_title" />
      <RecordField source="overall_satisfaction_rating" />
      <RecordField source="overall_experience_feedback" />
      <RecordField source="status" />
      <RecordField source="reward_status" />
      <RecordField
        source="isAnonymous"
        render={(record) => (record.isAnonymous ? "Yes" : "No")}
      />
      <RecordField source="created_at">
        <DateField showTime source="created_at" />
      </RecordField>
      <RecordField source="updated_at">
        <DateField showTime source="updated_at" />
      </RecordField>
    </div>
  </Show>
);
