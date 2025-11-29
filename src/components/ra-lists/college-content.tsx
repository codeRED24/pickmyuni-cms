import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import {
  Create,
  CreateButton,
  ExportButton,
  FilterButton,
  NumberInput,
  SearchInput,
  SelectInput,
  TextField,
} from "../admin";
import {
  CollegeContentPreview,
  LiveCollegeContentPreview,
} from "../college-content/CollegeContentPreview";
import JoditInput from "../admin/JoditInput";
import { PreviewButton } from "../shared/PreviewButton";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import { required, useGetIdentity } from "ra-core";
import StatusSelect from "../shared/ArticleSTatusSelect";

const silosChoices = [
  { id: "info", name: "info" },
  { id: "course", name: "course" },
  { id: "career", name: "career" },
  { id: "ranking", name: "ranking" },
  { id: "fees", name: "fees" },
  { id: "scholarship", name: "scholarship" },
  { id: "placement", name: "placement" },
  { id: "news", name: "news" },
  { id: "faq", name: "faq" },
  { id: "other", name: "other" },
  { id: "campus", name: "campus" },
  { id: "accommodation", name: "accommodation" },
  { id: "reviews", name: "reviews" },
  { id: "facilities", name: "facilities" },
];

const collegeContentFilters = [
  <SearchInput source="q" alwaysOn />,
  <NumberInput source="college_id" />,
  <BooleanInput source="is_active" />,
  <SelectInput source="silos" choices={silosChoices} />,
  <StatusSelect />,
];

const CollegeswiseContentListActions = () => (
  <div className="flex items-center gap-2">
    <FilterButton />
    <ExportButton />
    <CreateButton />
  </div>
);

export const CollegeswiseContentList = () => (
  <List
    filters={collegeContentFilters}
    actions={<CollegeswiseContentListActions />}
  >
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="silos" />
      <DataTable.Col source="college_id" label="College">
        <ReferenceField source="college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="status" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const CollegeswiseContentEdit = () => {
  const { identity, isLoading } = useGetIdentity();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const isContentWriter = identity?.role === "content_writer";

  return (
    <Edit>
      <SimpleForm className="max-w-full">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-4">
            <TextInput source="id" disabled />
            <TextInput source="title" validate={required()} />
            <JoditInput source="content" />
            <SelectInput
              source="silos"
              choices={silosChoices}
              validate={required()}
            />
            <TextInput source="meta_desc" />
            <ImageSelectorInput
              source="og_img"
              folderPath="collegeswise-content/og_img"
            />
            <ReferenceInput source="college_id" reference="colleges">
              <AutocompleteInput
                optionText={(record) => `${record.id} - ${record.college_name}`}
                validate={required()}
              />
            </ReferenceInput>
            <NumberInput source="score" />
            <ImageSelectorInput
              source="banner_img"
              folderPath="collegeswise-content/banner_img"
            />
            <ImageSelectorInput
              source="img1"
              folderPath="collegeswise-content/img1"
            />
            <ImageSelectorInput
              source="img2"
              folderPath="collegeswise-content/img2"
            />

            {/* Only show is_active and status for admin and team_lead */}

            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}

            <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput>
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
          </div>
          <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 h-full bg-white overflow-auto max-h-[72vh]">
              <LiveCollegeContentPreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const CollegeswiseContentCreate = () => {
  const { identity, isLoading } = useGetIdentity();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const isContentWriter = identity?.role === "content_writer";

  return (
    <Create>
      <SimpleForm className="max-w-full">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-4">
            <TextInput source="title" validate={required()} />
            <JoditInput source="content" />
            <SelectInput
              source="silos"
              choices={silosChoices}
              validate={required()}
            />
            <TextInput source="meta_desc" />
            <ImageSelectorInput
              source="og_img"
              folderPath="collegeswise-content/og_img"
            />
            <ReferenceInput source="college_id" reference="colleges">
              <AutocompleteInput
                optionText={(record) => `${record.id} - ${record.college_name}`}
                validate={required()}
              />
            </ReferenceInput>
            <NumberInput source="score" />
            <ImageSelectorInput
              source="banner_img"
              folderPath="collegeswise-content/banner_img"
            />
            <ImageSelectorInput
              source="img1"
              folderPath="collegeswise-content/img1"
            />
            <ImageSelectorInput
              source="img2"
              folderPath="collegeswise-content/img2"
            />

            {/* Only show is_active and status for admin and team_lead */}

            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}

            <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput>
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
          </div>
          <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 bg-white h-full overflow-auto max-h-[72vh]">
              <LiveCollegeContentPreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};

export const CollegeswiseContentShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3 space-y-4">
        <RecordField source="id">
          <NumberField source="id" />
        </RecordField>
        <RecordField source="title" />
        <RecordField source="content">
          <TextField source="content" className="line-clamp-4" />
        </RecordField>
        <RecordField source="silos" />
        <RecordField source="college_id">
          <ReferenceField source="college_id" reference="colleges" />
        </RecordField>
        <RecordField source="author_id">
          <ReferenceField source="author_id" reference="authors" />
        </RecordField>
        <RecordField source="score">
          <NumberField source="score" />
        </RecordField>
        <RecordField source="is_active" render={(r) => String(r.is_active)} />
        <RecordField source="createdAt">
          <DateField source="createdAt" />
        </RecordField>
        <RecordField source="updatedAt">
          <DateField source="updatedAt" />
        </RecordField>
        <RecordField source="deletedAt">
          <DateField source="deletedAt" showTime />
        </RecordField>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton resource="collegeswise-content" />
        </div>
        <div className="sticky top-24 self-start w-full">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[75vh]">
            <CollegeContentPreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);
