import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { Create, NumberInput, SelectInput, TextField } from "../admin";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Edit } from "@/components/admin/edit";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { TextInput } from "@/components/admin/text-input";
import JoditInput from "../admin/JoditInput";
import { required, useGetIdentity } from "ra-core";
import {
  CollegeCoursePreview,
  LiveCollegeCoursePreview,
} from "../college-course/CollegeCoursePreview";
import { DateField } from "@/components/admin/date-field";
import { NumberField } from "@/components/admin/number-field";
import { RecordField } from "@/components/admin/record-field";
import { Show } from "@/components/admin/show";
import { PreviewButton } from "../shared/PreviewButton";
import { ImageSelectorInput } from "@/components/admin/ImageSelectorInput";
import StatusSelect from "../shared/ArticleSTatusSelect";

const collegeCourseLevel = [
  { id: "diploma", name: "diploma" },
  { id: "bachelor", name: "bachelor" },
  { id: "master", name: "master" },
  { id: "doctorate", name: "doctorate" },
  { id: "certificate", name: "certificate" },
  { id: "other", name: "other" },
  { id: "graduate_certificate", name: "graduate_certificate" },
  { id: "post_graduate_certificate", name: "post_graduate_certificate" },
  { id: "graduate_diploma", name: "graduate_diploma" },
  { id: "post_graduate_diploma", name: "post_graduate_diploma" },
  { id: "elicos", name: "elicos" },
  { id: "associate_degree", name: "associate_degree" },
  { id: "advanced_diploma", name: "advanced_diploma" },
];

export const CollegesCourseList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="college_id" label="College">
        <ReferenceField source="college_id" reference="colleges">
          <TextField source="college_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="course_id" label="Course">
        <ReferenceField source="course_id" reference="courses">
          <TextField source="course_name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="streamId">
        <ReferenceField source="streamId" reference="streams" />
      </DataTable.Col>
      <DataTable.Col
        source="is_active"
        render={(record) => (record.is_active ? "Yes" : "No")}
      />
      <DataTable.Col source="status" />
      <DataTable.Col source="deletedAt">
        <DateField source="deletedAt" showTime />
      </DataTable.Col>
      <DataTable.Col source="level" />
      <DataTable.Col source="author_id">
        <ReferenceField source="author_id" reference="authors" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const CollegesCourseEdit = () => {
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
            <TextInput source="name" validate={required()} />
            <JoditInput source="content" />
            <NumberInput
              source="duration_in_months"
              label="Duration (in weeks)"
            />
            <NumberInput source="tution_fees" />
            <NumberInput source="hostel_fees" />
            <NumberInput source="one_time_fees" />
            <NumberInput source="other_fees" />
            <TextInput source="meta_desc" />
            <ImageSelectorInput source="og_img" />
            {/* <TextInput source="createdAt" />
        <TextInput source="updatedAt" /> */}
            <ReferenceInput source="college_id" reference="colleges">
              <AutocompleteInput />
            </ReferenceInput>
            <ReferenceInput source="course_id" reference="courses">
              <AutocompleteInput optionText={"course_name"} />
            </ReferenceInput>
            <ReferenceInput source="streamId" reference="streams">
              <AutocompleteInput />
            </ReferenceInput>
            <NumberInput source="score" />
            <SelectInput
              source="level"
              choices={collegeCourseLevel}
              validate={required()}
            />
            <NumberInput source="domestic_fees_in_aud" />
            <NumberInput source="domestic_non_tution_fees" />
            <NumberInput source="domestic_total_fees" />
            {/* <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput> */}
            {/* <TextInput source="last_date" /> */}
            {/* <NumberInput source="offered_domestic_fees" />
            <NumberInput source="offered_int_fees" /> */}
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
            {/* <BooleanInput source="is_promoted" />
            <BooleanInput source="pmu_exclusive" /> */}

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}
          </div>
          <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 h-full bg-white overflow-auto max-h-[72vh]">
              <LiveCollegeCoursePreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const CollegesCourseCreate = () => {
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
            {/* <TextInput source="id" disabled /> */}
            <TextInput source="name" validate={[required()]} />
            <JoditInput source="content" />
            <NumberInput
              source="duration_in_months"
              label="Duration (in weeks)"
            />
            <NumberInput source="tution_fees" />
            <NumberInput source="hostel_fees" />
            <NumberInput source="one_time_fees" />
            <NumberInput source="other_fees" />
            <TextInput source="meta_desc" />
            <ImageSelectorInput source="og_img" />
            {/* <TextInput source="createdAt" />
        <TextInput source="updatedAt" /> */}
            <ReferenceInput source="college_id" reference="colleges">
              <AutocompleteInput validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="course_id" reference="courses">
              <AutocompleteInput
                optionText={"course_name"}
                validate={[required()]}
              />
            </ReferenceInput>
            <ReferenceInput source="streamId" reference="streams">
              <AutocompleteInput validate={[required()]} />
            </ReferenceInput>
            <NumberInput source="score" />
            <SelectInput
              source="level"
              choices={collegeCourseLevel}
              validate={[required()]}
            />
            <NumberInput source="domestic_fees_in_aud" />
            <NumberInput source="domestic_non_tution_fees" />
            <NumberInput source="domestic_total_fees" />
            {/* <ReferenceInput source="author_id" reference="authors">
              <AutocompleteInput />
            </ReferenceInput> */}
            {/* <TextInput source="last_date" /> */}
            {/* <NumberInput source="offered_domestic_fees" />
            <NumberInput source="offered_int_fees" /> */}
            <TextInput source="keywords" />
            <TextInput source="canonical_url" />
            {/* <BooleanInput source="is_promoted" />
            <BooleanInput source="pmu_exclusive" /> */}

            {/* Only show is_active and status for admin and team_lead */}
            {!isContentWriter && (
              <>
                <BooleanInput source="is_active" />
                <StatusSelect />
              </>
            )}
          </div>
          <div className="w-1/2 h-[75vh] flex flex-col sticky top-24 self-start">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 h-full bg-white overflow-auto max-h-[72vh]">
              <LiveCollegeCoursePreview />
            </div>
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};

export const CollegesCourseShow = () => (
  <Show>
    <div className="flex gap-4">
      <div className="w-1/3 space-y-4">
        <RecordField source="id">
          <NumberField source="id" />
        </RecordField>
        <RecordField source="name" />
        <RecordField source="content">
          <TextField source="content" className="line-clamp-4" />
        </RecordField>
        <RecordField source="duration_in_months">
          <NumberField source="duration_in_months" />
        </RecordField>
        <RecordField source="tution_fees">
          <NumberField source="tution_fees" />
        </RecordField>
        <RecordField source="hostel_fees">
          <NumberField source="hostel_fees" />
        </RecordField>
        <RecordField source="one_time_fees">
          <NumberField source="one_time_fees" />
        </RecordField>
        <RecordField source="other_fees" />
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
        <RecordField source="college_id">
          <ReferenceField source="college_id" reference="colleges" />
        </RecordField>
        <RecordField source="course_id">
          <ReferenceField source="course_id" reference="courses">
            <TextField source="course_name" />
          </ReferenceField>
        </RecordField>
        <RecordField source="streamId">
          <ReferenceField source="streamId" reference="streams" />
        </RecordField>
        <RecordField source="score">
          <NumberField source="score" />
        </RecordField>
        <RecordField
          source="is_active"
          render={(record) => (record.is_active ? "Yes" : "No")}
        />
        <RecordField source="level" />
        <RecordField source="domestic_fees_in_aud" />
        <RecordField source="domestic_non_tution_fees" />
        <RecordField source="domestic_total_fees" />
        <RecordField source="author_id">
          <ReferenceField source="author_id" reference="authors" />
        </RecordField>
        {/* <RecordField source="is_promoted" />
        <RecordField source="last_date" />
        <RecordField source="offered_domestic_fees" />
        <RecordField source="offered_int_fees" />
        <RecordField source="pmu_exclusive" />
        <RecordField source="keywords" /> */}
        <RecordField source="canonical_url" />
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">Preview</h2>
          <PreviewButton resource="colleges-courses" />
        </div>
        <div className="sticky top-24 self-start w-full">
          <div className="border rounded-lg p-4 bg-white overflow-auto max-h-[75vh]">
            <CollegeCoursePreview />
          </div>
        </div>
      </div>
    </div>
  </Show>
);
