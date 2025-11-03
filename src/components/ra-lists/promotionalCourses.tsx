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
  Create,
  SelectInput,
  TextField,
  FilterButton,
  CreateButton,
  NumberInput,
  ExportButton,
  SearchInput,
} from "../admin";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import { required } from "ra-core";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import DateTimeInput from "../admin/datetime-input";

const promotionalCourseFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <BooleanInput source="higher_education" />,
  <BooleanInput source="trade_courses" />,
  <ReferenceInput source="college_id" reference="colleges">
    <AutocompleteInput optionText={"college_name"} />
  </ReferenceInput>,
  <SelectInput
    source="course_type"
    choices={[
      { id: "CERT_III", name: "Cert III" },
      { id: "CERT_IV", name: "Cert IV" },
      { id: "DIPLOMA", name: "Diploma" },
      { id: "ADVANCED_DIPLOMA", name: "Advanced Diploma" },
      { id: "BACHELORS", name: "Bachelors" },
      { id: "MASTERS", name: "Masters" },
      { id: "GRADUATE_DIPLOMA", name: "Graduate Diploma" },
      { id: "OTHER", name: "Other" },
      { id: "PACKAGE", name: "Package" },
    ]}
  />,
];

const PromotionalCourseListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const PromotionalCourseList = () => (
  <List
    filters={promotionalCourseFilters}
    actions={<PromotionalCourseListActions />}
  >
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="course_name" />
      <DataTable.Col source="college_id">
        <ReferenceField source="college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="level" />
      <DataTable.Col source="duration" />
      <DataTable.Col source="total_fees" />
      <DataTable.Col source="offered_fees" />
      <DataTable.Col source="last_date">
        <DateField source="last_date" />
      </DataTable.Col>
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="course_type" />
      <DataTable.Col source="score" />
    </DataTable>
  </List>
);

export const PromotionalCourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="course_name" validate={required()} />
      <ReferenceInput source="college_id" reference="colleges">
        <AutocompleteInput optionText={"college_name"} />
      </ReferenceInput>
      <TextInput source="level" />
      <TextInput source="duration" />
      <TextInput source="total_fees" />
      <TextInput source="offered_fees" />
      <DateTimeInput source="last_date" />
      <ImageSelectorInput source="img_url" />
      <NumberInput source="score" />
      <SelectInput
        source="course_type"
        choices={[
          { id: "CERT_III", name: "Cert III" },
          { id: "CERT_IV", name: "Cert IV" },
          { id: "DIPLOMA", name: "Diploma" },
          { id: "ADVANCED_DIPLOMA", name: "Advanced Diploma" },
          { id: "BACHELORS", name: "Bachelors" },
          { id: "MASTERS", name: "Masters" },
          { id: "GRADUATE_DIPLOMA", name: "Graduate Diploma" },
          { id: "OTHER", name: "Other" },
          { id: "PACKAGE", name: "Package" },
        ]}
        validate={required()}
      />
      <BooleanInput source="higher_education" />
      <BooleanInput source="trade_courses" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Edit>
);

export const PromotionalCourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="course_name" validate={required()} />
      <ReferenceInput source="college_id" reference="colleges">
        <AutocompleteInput optionText={"college_name"} />
      </ReferenceInput>
      <TextInput source="level" />
      <TextInput source="duration" />
      <TextInput source="total_fees" />
      <TextInput source="offered_fees" />
      <DateTimeInput source="last_date" />
      <ImageSelectorInput source="img_url" />
      <NumberInput source="score" />
      <SelectInput
        source="course_type"
        choices={[
          { id: "CERT_III", name: "Cert III" },
          { id: "CERT_IV", name: "Cert IV" },
          { id: "DIPLOMA", name: "Diploma" },
          { id: "ADVANCED_DIPLOMA", name: "Advanced Diploma" },
          { id: "BACHELORS", name: "Bachelors" },
          { id: "MASTERS", name: "Masters" },
          { id: "GRADUATE_DIPLOMA", name: "Graduate Diploma" },
          { id: "OTHER", name: "Other" },
          { id: "PACKAGE", name: "Package" },
        ]}
        validate={required()}
      />
      <BooleanInput source="higher_education" />
      <BooleanInput source="trade_courses" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
);

export const PromotionalCourseShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="course_name" />
      <RecordField source="college_id">
        <ReferenceField source="college_id" reference="colleges" />
      </RecordField>
      <RecordField source="level" />
      <RecordField source="duration" />
      <RecordField source="total_fees" />
      <RecordField source="offered_fees" />
      <RecordField source="last_date">
        <DateField source="last_date" />
      </RecordField>
      <RecordField source="img_url" />
      <RecordField source="score" />
      <RecordField source="course_type" />
      <RecordField
        source="higher_education"
        render={(record) => (record.higher_education ? "Yes" : "No")}
      />
      <RecordField
        source="trade_courses"
        render={(record) => (record.trade_courses ? "Yes" : "No")}
      />
      <RecordField
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <RecordField source="createdAt">
        <DateField showTime source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField showTime source="updatedAt" />
      </RecordField>
    </div>
  </Show>
);
