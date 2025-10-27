import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Translate,
  useListContext,
  useNotify,
  useRefresh,
  useResourceContext,
  useUpdateMany,
} from "ra-core";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Confirm } from "@/components/admin/confirm";

export interface BulkSoftDeleteButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  resource?: string;
  className?: string;
  icon?: ReactNode;
}

export const BulkSoftDeleteButton = (props: BulkSoftDeleteButtonProps) => {
  const { icon = defaultIcon, label, className } = props;
  const resource = useResourceContext(props);
  const { selectedIds, onUnselectItems } = useListContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [isOpen, setIsOpen] = useState(false);

  const [softDeleteMany, { isPending }] = useUpdateMany();

  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    softDeleteMany(
      resource,
      {
        ids: selectedIds,
        data: { is_active: false, deletedAt: new Date() },
      },
      {
        onSuccess: () => {
          onUnselectItems();
          notify(`${selectedIds.length} items soft deleted`, {
            type: "success",
          });
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
        type="button"
        onClick={handleClick}
        disabled={isPending || selectedIds.length === 0}
        className={cn("h-9", "cursor-pointer", className)}
      >
        {icon}
        <Translate i18nKey={label ?? "ra.action.delete"}>
          {label ?? "Soft Delete"}
        </Translate>
      </Button>
      <Confirm
        isOpen={isOpen}
        title="Are you sure you want to soft delete these items?"
        content={`This will mark ${selectedIds.length} items as inactive.`}
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};

const defaultIcon = <Trash2 />;

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
