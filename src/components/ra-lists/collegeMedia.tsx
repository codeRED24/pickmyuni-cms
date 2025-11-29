import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import {
  Create,
  CreateButton,
  DateField,
  ExportButton,
  FilterButton,
  SelectInput,
  SearchInput,
  TextField,
  NumberInput,
} from "../admin";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import { required } from "ra-core";
import { ImageSelectorInput } from "../admin/ImageSelectorInput";

const MediaTypeSelect = [
  { id: "IMAGE", name: "IMAGE" },
  { id: "VIDEO", name: "VIDEO" },
  { id: "PDF", name: "PDF" },
  { id: "OTHER", name: "OTHER" },
];

const RelatedToSelect = [
  { id: "CLASSROOM", name: "CLASSROOM" },
  { id: "CAMPUS", name: "CAMPUS" },
  { id: "FACILITIES", name: "FACILITIES" },
  { id: "EVENTS", name: "EVENTS" },
  { id: "OTHER", name: "OTHER" },
];

const SilosSelect = [
  { id: "info", name: "INFO" },
  { id: "course", name: "COURSE" },
  { id: "career", name: "CAREER" },
  { id: "ranking", name: "RANKING" },
  { id: "fees", name: "FEES" },
  { id: "scholarship", name: "SCHOLARSHIP" },
  { id: "placement", name: "PLACEMENT" },
  { id: "news", name: "NEWS" },
  { id: "faq", name: "FAQ" },
  { id: "other", name: "OTHER" },
  { id: "campus", name: "CAMPUS" },
  { id: "accommodation", name: "ACCOMMODATION" },
  { id: "reviews", name: "REVIEWS" },
  { id: "facilities", name: "FACILITIES" },
];

const collegeMediaFilters = [
  <SearchInput source="q" alwaysOn />,
  <NumberInput source="college_id" />,
  <BooleanInput key="is_active" source="is_active" />,
  <SelectInput key="silos" source="silos" choices={SilosSelect} />,
  <SelectInput source="media_type" choices={MediaTypeSelect} />,
  <SelectInput source="related_to" choices={RelatedToSelect} />,
];

const CollegeMediaListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const CollegeMediaList = () => (
  <List filters={collegeMediaFilters} actions={<CollegeMediaListActions />}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="media_type" />
      <DataTable.Col source="related_to" />
      <DataTable.Col source="college_id" label="College">
        <ReferenceField source="college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="silos" />
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const CollegeMediaShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="id">
        <NumberField source="id" />
      </RecordField>
      <RecordField source="media_url" />
      <RecordField source="media_type" />
      <RecordField source="related_to" />
      <RecordField source="college_id">
        <ReferenceField source="college_id" reference="colleges" />
      </RecordField>
      <RecordField source="silos" />
      <RecordField source="createdAt">
        <DateField source="createdAt" />
      </RecordField>
      <RecordField source="updatedAt">
        <DateField source="updatedAt" />
      </RecordField>
      <RecordField
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <RecordField source="deletedAt" />
    </div>
  </Show>
);

export const CollegeMediaEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ImageSelectorInput
        source="media_url"
        folderPath="college_media"
        validate={required()}
        label="Media Url (Paste url or dropdown the attachment)"
      />
      <SelectInput
        source="media_type"
        choices={MediaTypeSelect}
        validate={required()}
      />
      <SelectInput
        source="related_to"
        choices={RelatedToSelect}
        validate={required()}
      />
      <ReferenceInput source="college_id" reference="colleges">
        <AutocompleteInput
          optionText={(record) => `${record.id} - ${record.college_name}`}
          validate={required()}
        />
      </ReferenceInput>
      <SelectInput source="silos" choices={SilosSelect} validate={required()} />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Edit>
);

export const CollegeMediaCreate = () => (
  <Create>
    <SimpleForm>
      <ImageSelectorInput
        source="media_url"
        folderPath="college_media"
        validate={required()}
        label="Media Url (Paste url or dropdown the attachment)"
      />
      <SelectInput
        source="media_type"
        choices={MediaTypeSelect}
        validate={required()}
      />
      <SelectInput
        source="related_to"
        choices={RelatedToSelect}
        validate={required()}
      />
      <ReferenceInput source="college_id" reference="colleges">
        <AutocompleteInput
          optionText={(record) => `${record.id} - ${record.college_name}`}
          validate={required()}
        />
      </ReferenceInput>
      <SelectInput source="silos" choices={SilosSelect} validate={required()} />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
);
