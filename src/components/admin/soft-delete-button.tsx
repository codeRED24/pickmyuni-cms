import {
  useRecordContext,
  useResourceContext,
  useNotify,
  useRedirect,
  useRefresh,
  useCreatePath,
  useUpdate,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Confirm } from "@/components/admin/confirm";

export const SoftDeleteButton = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const createPath = useCreatePath();
  const [isOpen, setIsOpen] = useState(false);

  const [softDelete, { isPending }] = useUpdate();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (!record) return;

    softDelete(
      resource,
      {
        id: record.id,
        data: { is_active: false, deletedAt: new Date() },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify("Item soft deleted", { type: "success" });
          redirect(
            "list",
            createPath({
              resource,
              type: "list",
            })
          );
          refresh();
        },
        onError: (error: any) => {
          notify(error.message, { type: "error" });
        },
        onSettled: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center cursor-pointer"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Soft Delete
      </Button>
      <Confirm
        isOpen={isOpen}
        title="Are you sure you want to soft delete this item?"
        content="This will mark the item as inactive."
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};
