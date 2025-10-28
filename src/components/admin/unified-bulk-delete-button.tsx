import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Translate,
  useListContext,
  useNotify,
  useRefresh,
  useResourceContext,
  useDeleteMany,
  useUpdateMany,
} from "ra-core";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { PinConfirmDialog } from "@/components/admin/pin-confirm-dialog";
import { dataProvider } from "@/dataProvider";

export interface UnifiedBulkDeleteButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  resource?: string;
  className?: string;
  icon?: ReactNode;
}

export const UnifiedBulkDeleteButton = (
  props: UnifiedBulkDeleteButtonProps
) => {
  const { icon = defaultIcon, label, className } = props;
  const resource = useResourceContext(props);
  const { selectedIds, onUnselectItems } = useListContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [isOpen, setIsOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [deleteMany, { isPending: isDeleting }] = useDeleteMany();
  const [softDeleteMany, { isPending: isSoftDeleting }] = useUpdateMany();

  const isPending = isDeleting || isSoftDeleting || verifying;

  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    setIsOpen(true);
  };

  const handlePinConfirm = async (pin: string) => {
    setVerifying(true);
    try {
      // Try to verify PIN
      await dataProvider.verifyPin(pin);

      // PIN is correct - perform hard delete
      deleteMany(
        resource,
        { ids: selectedIds },
        {
          onSuccess: () => {
            onUnselectItems();
            notify(`${selectedIds.length} items permanently deleted`, {
              type: "success",
            });
            refresh();
          },
          onError: (error: any) => {
            notify(error.message, { type: "error" });
          },
          onSettled: () => {
            setVerifying(false);
            setIsOpen(false);
          },
        }
      );
    } catch (error: any) {
      // PIN is incorrect or blank - perform soft delete
      softDeleteMany(
        resource,
        {
          ids: selectedIds,
          data: { is_active: false, deletedAt: new Date(), status: "DELETED" },
        },
        {
          onSuccess: () => {
            onUnselectItems();
            notify(`${selectedIds.length} items archived`, {
              type: "info",
            });
            refresh();
          },
          onError: (error: any) => {
            notify(error.message, { type: "error" });
          },
          onSettled: () => {
            setVerifying(false);
            setIsOpen(false);
          },
        }
      );
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        type="button"
        onClick={handleClick}
        disabled={isPending || selectedIds.length === 0}
        className={cn("h-9", className)}
      >
        {icon}
        <Translate i18nKey={label ?? "ra.action.delete"}>
          {label ?? "Delete"}
        </Translate>
      </Button>
      <PinConfirmDialog
        isOpen={isOpen}
        title={`Delete ${selectedIds.length} items?`}
        content="Enter your PIN to permanently delete these items, or leave it blank to mark them as inactive."
        onConfirm={handlePinConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};

const defaultIcon = <Trash />;

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
