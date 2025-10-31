import { Button } from "@/components/ui/button";
import {
  useNotify,
  useRecordContext,
  useRefresh,
  useSaveContext,
  useGetIdentity,
} from "ra-core";
import { useState } from "react";
import { Save, SendHorizonal, CheckCircle, XCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface ApprovalButtonsProps {
  contentType:
    | "article"
    | "course"
    | "college_course"
    | "collegewise_content"
    | "city"
    | "state"
    | "stream"
    | "specialization";
  disabled?: boolean;
}

export const ApprovalButtons = ({
  contentType,
  disabled = false,
}: ApprovalButtonsProps) => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const { identity } = useGetIdentity();
  const { save } = useSaveContext();
  const { getValues } = useFormContext();
  const [loading, setLoading] = useState(false);

  const isContentWriter = identity?.role === "content_writer";
  const isTeamLead = identity?.role === "team_lead";
  const isAdmin = identity?.role === "admin";
  const isPending = record?.status === "PENDING";

  const handleSaveAsDraft = async () => {
    if (!save) {
      notify("Save function not available", { type: "error" });
      return;
    }

    try {
      setLoading(true);
      // Get all current form values and merge with status
      const formValues = getValues();
      const dataToSave = {
        ...formValues,
        status: "DRAFT",
      };

      console.log("Saving draft with data:", dataToSave);

      // Call save and wait for it to complete
      const result = await save(dataToSave);

      console.log("Save result:", result);
      notify("Saved as draft", { type: "success" });
      refresh();
    } catch (error: any) {
      console.error("Error saving draft:", error);
      notify(error.message || "Error saving draft", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestApproval = async () => {
    if (!record?.id) {
      notify("Please save the content first before requesting approval", {
        type: "warning",
      });
      return;
    }

    // Check current status
    if (record.status === "PENDING") {
      notify("Approval request is already pending", { type: "info" });
      return;
    }

    if (record.status === "PUBLISHED") {
      notify("This content is already published", { type: "info" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/approval/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content_type: contentType,
          content_id: record.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to request approval");
      }

      notify("Approval request submitted successfully!", { type: "success" });
      refresh();
    } catch (error: any) {
      notify(error.message || "Error requesting approval", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!record?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/approval/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content_type: contentType,
          content_id: record.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to approve content");
      }

      notify("Content approved and published successfully!", {
        type: "success",
      });
      refresh();
    } catch (error: any) {
      notify(error.message || "Error approving content", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!record?.id) return;

    const feedback = prompt(
      "Please provide feedback for rejection (optional):"
    );

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/approval/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content_type: contentType,
          content_id: record.id,
          feedback: feedback || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to reject content");
      }

      notify("Content rejected", { type: "success" });
      refresh();
    } catch (error: any) {
      notify(error.message || "Error rejecting content", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Team lead viewing pending content - show Approve/Reject buttons
  if ((isTeamLead || isAdmin) && isPending) {
    return (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={handleReject}
          disabled={disabled || loading}
          className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </Button>
        <Button
          type="button"
          onClick={handleApprove}
          disabled={disabled || loading}
          className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4" />
          Approve & Publish
        </Button>
      </>
    );
  }

  // Team lead viewing non-pending content - return nothing, let regular Save button show
  if (isTeamLead && !isPending) {
    return null;
  }

  // Content writer buttons
  return (
    <>
      {/* Save as Draft button for content writers */}
      {isContentWriter && (
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveAsDraft}
          disabled={disabled || loading}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save as Draft
        </Button>
      )}

      {/* Request Approval button */}
      <Button
        type="button"
        onClick={handleRequestApproval}
        disabled={
          disabled ||
          loading ||
          !record?.id ||
          record?.status === "PENDING" ||
          record?.status === "PUBLISHED"
        }
        className="flex items-center gap-2 cursor-pointer"
      >
        <SendHorizonal className="w-4 h-4" />
        Request Approval
      </Button>
    </>
  );
};
