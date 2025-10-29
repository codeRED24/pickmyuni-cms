import { SelectInput } from "../admin";

export default function StatusSelect() {
  return (
    <SelectInput
      source="status"
      choices={[
        { id: "DRAFT", name: "DRAFT" },
        { id: "PENDING", name: "PENDING" },
        { id: "REJECTED", name: "REJECTED" },
        { id: "PUBLISHED", name: "PUBLISHED" },
        { id: "SCHEDULED", name: "Scheduled" },
        { id: "Deleted", name: "Deleted" },
      ]}
    />
  );
}
