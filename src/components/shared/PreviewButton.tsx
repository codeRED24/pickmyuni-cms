import { useRecordContext } from "ra-core";

export const PreviewButton = ({ resource }: { resource: string }) => {
  const record = useRecordContext();
  if (!record || !record.id) return null;

  const id = record.id;

  return (
    <a
      href={`#/${resource}/${id}/preview`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline mb-4 block"
    >
      Open Preview in new tab
    </a>
  );
};
