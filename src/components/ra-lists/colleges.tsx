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
import dayjs from "dayjs";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";

const collegeFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="is_active" />,
  <BooleanInput source="is_parent" />,
  <BooleanInput source="pr_pathway" />,
  <BooleanInput source="international_student_accepted" />,
  <BooleanInput source="is_affordable" />,
  <BooleanInput source="is_open" />,
  <ReferenceInput source="streamId" reference="streams">
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput source="cityId" reference="cities">
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput source="stateId" reference="states">
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput source="parent_college_id" reference="colleges">
    <AutocompleteInput optionText={"college_name"} />
  </ReferenceInput>,
  <SelectInput
    source="type"
    choices={[
      { id: "government", name: "government" },
      { id: "private", name: "private" },
      { id: "other", name: "other" },
    ]}
  />,
  <SelectInput
    source="level"
    choices={[
      { id: "level-1", name: "Level 1" },
      { id: "level-2", name: "Level 2" },
      { id: "level-3", name: "Level 3" },
      { id: "other", name: "other" },
    ]}
  />,
];

const CollegeListActions = () => (
  <div className="flex items-center gap-2">
    {/* <ColumnsButton /> */}
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const CollegeList = () => (
  <List filters={collegeFilters} actions={<CollegeListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="college_name" />
      <DataTable.Col source="location" />
      <DataTable.Col source="cityId">
        <ReferenceField source="cityId" reference="cities" />
      </DataTable.Col>
      <DataTable.Col source="stateId">
        <ReferenceField source="stateId" reference="states" />
      </DataTable.Col>
      <DataTable.Col source="parent_college_id">
        <ReferenceField source="parent_college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="type" />
      <DataTable.Col
        source="is_parent"
        render={(record) => (record.is_parent ? "Yes" : "No")}
      />
      <DataTable.Col
        source="is_affordable"
        render={(record) => (record.is_affordable ? "Yes" : "No")}
      />
      <DataTable.Col
        source="is_open"
        render={(record) => (record.is_open ? "Yes" : "No")}
      />
    </DataTable>
  </List>
);

export const CollegeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="college_name" multiline validate={required()} />
      <TextInput source="slug" multiline validate={required()} />
      <TextInput source="location" multiline validate={required()} />
      <TextInput source="canonical_url" multiline />
      <TextInput source="email" multiline />
      <TextInput source="contact" multiline />
      <ImageSelectorInput source="logo_url" />
      <ImageSelectorInput source="bg_url" />
      <ImageSelectorInput source="media_url" />
      <TextInput source="rating" />
      <TextInput source="score" />
      <TextInput source="meta_desc" multiline />
      <ImageSelectorInput source="og_img" />
      <TextInput source="createdAt" disabled />
      <TextInput source="updatedAt" disabled />
      <TextInput source="acceptance_rate" />
      <TextInput
        format={(value: Date | string | number | null) =>
          dayjs(value).format("DD/MM/YYYY")
        }
        source="intake_start_date"
        label="Intake start date (DD/MM/YYYY)"
      />
      <TextInput source="international_student_rate" />
      <NumberInput source="total_students" />
      <ReferenceInput source="streamId" reference="streams">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput source="cityId" reference="cities">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput source="stateId" reference="states">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput source="parent_college_id" reference="colleges">
        <AutocompleteInput optionText={"college_name"} />
      </ReferenceInput>
      <SelectInput
        source="type"
        choices={[
          { id: "government", name: "government" },
          { id: "private", name: "private" },
          { id: "other", name: "other" },
        ]}
      />
      <SelectInput
        source="level"
        choices={[
          { id: "level-1", name: "Level 1" },
          { id: "level-2", name: "Level 2" },
          { id: "level-3", name: "Level 3" },
          { id: "other", name: "other" },
        ]}
      />
      <NumberInput source="avg_fees_in_aud" />
      <ImageSelectorInput source="brochure_url" />
      <TextInput source="search_names" />
      <TextInput source="address" />
      <NumberInput source="established" label="Established (YYYY)" />
      <TextInput source="intake" />
      <NumberInput source="min_fees_int" />
      <NumberInput source="domestic_fees_in_aud" />
      <NumberInput source="rank" />
      <TextInput source="streams" label="Streams (,seperated stream ids)" />
      <BooleanInput source="pr_pathway" />
      <BooleanInput source="international_student_accepted" />
      <BooleanInput source="is_active" />
      <BooleanInput source="is_parent" />
      <BooleanInput source="is_affordable" />
      <BooleanInput source="is_open" />
    </SimpleForm>
  </Edit>
);

export const CollegeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="college_name" multiline validate={required()} />
      <TextInput source="location" multiline validate={required()} />
      <TextInput source="slug" multiline validate={required()} />
      <TextInput source="email" multiline />
      <TextInput source="contact" multiline />
      <ImageSelectorInput source="logo_url" />
      <ImageSelectorInput source="bg_url" />
      <ImageSelectorInput source="media_url" />
      <NumberInput min={0} max={5} step={"any"} source="rating" />
      <NumberInput min={0} max={999} source="score" />
      <TextInput source="meta_desc" multiline />
      <ImageSelectorInput source="og_img" />
      <NumberInput min={0} max={100} source="acceptance_rate" />
      <TextInput
        type="date"
        source="intake_start_date"
        label="Intake start date"
      />
      <NumberInput step={"any"} source="international_student_rate" />
      <NumberInput source="total_students" />
      <ReferenceInput source="streamId" reference="streams">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput source="cityId" reference="cities">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput source="stateId" reference="states">
        <AutocompleteInput />
      </ReferenceInput>
      <NumberInput source="avg_fees_in_aud" />
      <ImageSelectorInput source="brochure_url" />
      <TextInput source="search_names" />
      <TextInput source="address" />
      <ReferenceInput source="parent_college_id" reference="colleges">
        <AutocompleteInput optionText={"college_name"} />
      </ReferenceInput>
      <NumberInput source="established" label="Established (YYYY)" />
      <TextInput source="intake" />
      <SelectInput
        source="level"
        choices={[
          { id: "level-1", name: "Level 1" },
          { id: "level-2", name: "Level 2" },
          { id: "level-3", name: "Level 3" },
          { id: "other", name: "Other" },
        ]}
      />
      <SelectInput
        source="type"
        choices={[
          { id: "government", name: "government" },
          { id: "private", name: "private" },
          { id: "other", name: "other" },
        ]}
      />
      <NumberInput source="min_fees_int" />
      <NumberInput source="domestic_fees_in_aud" />
      <BooleanInput source="is_parent" />
      <NumberInput source="rank" />
      <TextInput source="streams" label="Streams(, seperated stream ids)" />
      <TextInput source="canonical_url" />
      <BooleanInput source="is_affordable" />
      <BooleanInput source="is_open" />
      <BooleanInput source="pr_pathway" />
      <BooleanInput source="is_active" />
      <BooleanInput source="international_student_accepted" />
    </SimpleForm>
  </Create>
);

export const CollegeShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="college_name" />
      <RecordField source="location" />
      <RecordField source="email" />
      <RecordField source="contact" />
      <RecordField source="logo_url" />
      <RecordField source="bg_url" />
      <RecordField source="media_url" />
      <RecordField source="rating" />
      <RecordField source="score">
        <NumberField source="score" />
      </RecordField>
      <RecordField source="meta_desc" />
      <RecordField source="og_img" />
      <RecordField source="createdAt">
        <DateField source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField source="updatedAt" />
      </RecordField>
      <RecordField source="deletedAt">
        <DateField source="deletedAt" showTime />
      </RecordField>
      <RecordField source="acceptance_rate" />
      <RecordField source="intake_start_date">
        <DateField source="intake_start_date" />
      </RecordField>
      <RecordField source="international_student_rate" />
      <RecordField
        source="pr_pathway"
        render={(record) => (record.pr_pathway ? "Yes" : "No")}
      />
      <RecordField source="slug" />
      <RecordField source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </RecordField>
      <RecordField source="total_students" />
      <RecordField source="cityId">
        <ReferenceField source="cityId" reference="cities" />
      </RecordField>
      <RecordField source="countryId">
        <ReferenceField source="countryId" reference="countries" />
      </RecordField>
      <RecordField source="stateId">
        <ReferenceField source="stateId" reference="states" />
      </RecordField>
      <RecordField source="avg_fees_in_aud" />
      <RecordField source="brochure_url" />
      <RecordField source="search_names" />
      <RecordField source="address">
        <DateField source="address" />
      </RecordField>
      <RecordField source="parent_college_id">
        <ReferenceField
          source="parent_college_id"
          reference="parent_colleges"
        />
      </RecordField>
      <RecordField source="established" />
      <RecordField
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <RecordField source="intake" />
      <RecordField source="level" />
      <RecordField source="type" />
      <RecordField
        source="international_student_accepted"
        render={(record) =>
          record.international_student_accepted ? "Yes" : "No"
        }
      />
      <RecordField source="min_fees_int" />
      <RecordField source="domestic_fees_in_aud" />
      <RecordField
        source="is_parent"
        render={(record) => (record.is_parent ? "Yes" : "No")}
      />
      <RecordField source="rank" />
      <RecordField
        source="is_affordable"
        render={(record) => (record.is_affordable ? "Yes" : "No")}
      />
      <RecordField
        source="is_open"
        render={(record) => (record.is_open ? "Yes" : "No")}
      />
      <RecordField source="streams" />
      <RecordField source="canonical_url" />
    </div>
  </Show>
);
