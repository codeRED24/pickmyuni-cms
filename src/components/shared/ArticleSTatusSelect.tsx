import { SelectInput } from "../admin";

export default function StatusSelect({ role }: { role?: string }) {
  return (
    <SelectInput
      // provide a string (matching the choice id) when role indicates draft, otherwise undefined
      defaultValue={role === "content_writer" ? "DRAFT" : "DRAFT"}
      disabled={role === "content_writer"}
      disableValue="DRAFT"
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
