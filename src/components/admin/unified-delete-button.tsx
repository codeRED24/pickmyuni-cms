import { useState } from "react";
import {
  useDelete,
  useRecordContext,
  useResourceContext,
  useRedirect,
  useNotify,
  useUpdate,
  useRefresh,
  useCreatePath,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { PinConfirmDialog } from "./pin-confirm-dialog";
import { dataProvider } from "@/dataProvider";
import { Trash } from "lucide-react";

export const UnifiedDeleteButton = () => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOne, { isPending: isDeleting }] = useDelete();
  const [softDelete, { isPending: isSoftDeleting }] = useUpdate();
  const redirect = useRedirect();
  const notify = useNotify();
  const refresh = useRefresh();
  const createPath = useCreatePath();
  const [verifying, setVerifying] = useState(false);

  const isPending = isDeleting || isSoftDeleting || verifying;

  const handlePinConfirm = async (pin: string) => {
    if (!record) return;

    setVerifying(true);
    try {
      // Try to verify PIN
      await dataProvider.verifyPin(pin);

      // PIN is correct - perform hard delete
      deleteOne(
        resource,
        { id: record?.id, previousData: record },
        {
          onSuccess: () => {
            setIsOpen(false);
            redirect(
              "list",
              createPath({
                resource,
                type: "list",
              })
            );
            notify("Item permanently deleted", { type: "success" });
          },
          onError: (error: any) => {
            notify(error.message, { type: "error" });
          },
          onSettled: () => {
            setVerifying(false);
          },
        }
      );
    } catch (error: any) {
      // PIN is incorrect or blank - perform soft delete
      softDelete(
        resource,
        {
          id: record.id,
          data: { is_active: false, deletedAt: new Date() },
          previousData: record,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            notify("Item archived", { type: "info" });
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
            setVerifying(false);
          },
        }
      );
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        className="cursor-pointer"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
      <PinConfirmDialog
        isOpen={isOpen}
        title="Delete this item?"
        content="Enter your PIN to permanently delete this item, or leave it blank to mark it as inactive."
        onConfirm={handlePinConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};
