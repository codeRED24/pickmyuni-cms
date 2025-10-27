import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Translate,
  useDeleteMany,
  useListContext,
  useNotify,
  useRefresh,
  useResourceContext,
  useTranslate,
  type MutationMode,
  type RaRecord,
  type UseDeleteManyOptions,
} from "ra-core";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { PinConfirmDialog } from "./pin-confirm-dialog";
import { dataProvider } from "@/dataProvider";

export interface BulkDeleteButtonProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> extends React.HTMLAttributes<HTMLButtonElement> {
  mutationMode?: MutationMode;
  label?: string;
  resource?: string;
  className?: string;
  icon?: ReactNode;
  mutationOptions?: UseDeleteManyOptions<RecordType, MutationOptionsError> & {
    meta?: any;
  };
}

export const BulkDeleteButton = <
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
>(
  props: BulkDeleteButtonProps<RecordType, MutationOptionsError>
) => {
  const {
    mutationMode = "undoable",
    icon = defaultIcon,
    label,
    className,
    mutationOptions = {},
  } = props;
  const { meta: mutationMeta, ...otherMutationOptions } = mutationOptions;
  const resource = useResourceContext(props);
  const [deleteMany, { isPending }] = useDeleteMany<
    RecordType,
    MutationOptionsError
  >();
  const { selectedIds, onUnselectItems } = useListContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const translate = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handlePinConfirm = async (pin: string) => {
    setVerifying(true);
    try {
      await dataProvider.verifyPin(pin);
      deleteMany(
        resource,
        { ids: selectedIds, meta: mutationMeta },
        {
          mutationMode,
          onSuccess: () => {
            onUnselectItems();
            notify(`resources.${resource}.notifications.deleted`, {
              messageArgs: {
                smart_count: selectedIds.length,
                _: translate("ra.notification.deleted", {
                  smart_count: selectedIds.length,
                  _: `${selectedIds.length} elements deleted`,
                }),
              },
              undoable: mutationMode === "undoable",
            });
          },
          onError: (error: MutationOptionsError) => {
            const errorMessage =
              typeof error === "string" ? error : (error as any)?.message;
            notify(errorMessage || "ra.notification.http_error", {
              type: "error",
              messageArgs: { _: errorMessage },
            });
            refresh();
          },
          onSettled: () => {
            setVerifying(false);
            setIsOpen(false);
          },
          ...otherMutationOptions,
        }
      );
    } catch (error: any) {
      notify(error.body?.message || "Invalid PIN", { type: "error" });
      setVerifying(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    setIsOpen(true);
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
          {label ?? "Delete"}
        </Translate>
      </Button>
      <PinConfirmDialog
        isOpen={isOpen}
        title="Are you sure you want to delete these elements?"
        content={`This will delete ${selectedIds.length} elements. This action cannot be undone. Please enter your PIN to confirm.`}
        onConfirm={handlePinConfirm}
        onClose={() => setIsOpen(false)}
        loading={isPending || verifying}
      />
    </>
  );
};

const defaultIcon = <Trash />;

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
