import { useState } from "react";
import {
  useDelete,
  useRecordContext,
  useResourceContext,
  useRedirect,
  useNotify,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { PinConfirmDialog } from "./pin-confirm-dialog";
import { dataProvider } from "@/dataProvider";
import { Trash } from "lucide-react";

export const DeleteButton = () => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOne, { isPending }] = useDelete();
  const redirect = useRedirect();
  const notify = useNotify();
  const [verifying, setVerifying] = useState(false);

  const handlePinConfirm = async (pin: string) => {
    setVerifying(true);
    try {
      await dataProvider.verifyPin(pin);
      deleteOne(
        resource,
        { id: record?.id, previousData: record },
        {
          onSuccess: () => {
            setIsOpen(false);
            redirect("list", resource);
            notify(`Successfully deleted ${resource}`, { type: "success" });
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
      notify(error.body?.message || "Invalid PIN", { type: "error" });
      setVerifying(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
      <PinConfirmDialog
        isOpen={isOpen}
        title="Are you sure you want to delete this element?"
        content="This action cannot be undone. Please enter your PIN to confirm."
        onConfirm={handlePinConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending || verifying}
      />
    </>
  );
};
