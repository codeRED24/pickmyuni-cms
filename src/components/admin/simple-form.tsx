import * as React from "react";
import { Children, ReactNode } from "react";
import {
  Form,
  type FormProps,
  useResourceContext,
  useGetIdentity,
} from "ra-core";
import { cn } from "@/lib/utils";
import { CancelButton } from "@/components/admin/cancel-button";
import { SaveButton } from "@/components/admin/form";
import { ApprovalButtons } from "@/components/shared/ApprovalButtons";
import { useRecordContext } from "ra-core";

export const SimpleForm = ({
  children,
  className,
  toolbar = defaultFormToolbar,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  toolbar?: ReactNode;
} & FormProps) => (
  <Form
    className={cn(`flex flex-col gap-4 w-full max-w-lg`, className)}
    {...rest}
  >
    {children}
    {toolbar}
  </Form>
);

export const FormToolbar = ({
  children,
  className,
  ...rest
}: FormToolbarProps) => {
  const resource = useResourceContext();
  const { identity } = useGetIdentity();

  // Resources that support approval workflow
  const approvalResources = [
    "articles",
    "courses",
    "colleges-courses",
    "collegeswise-content",
    "cities",
    "states",
    "streams",
  ];

  // Map resource names to content types for the API
  const resourceToContentType: Record<string, string> = {
    articles: "article",
    courses: "course",
    "colleges-courses": "college_course",
    "collegeswise-content": "collegewise_content",
    cities: "city",
    states: "state",
    streams: "stream",
  };

  // Check if resource supports approval workflow
  const isApprovalResource =
    resource &&
    approvalResources.includes(resource) &&
    identity?.role &&
    (identity.role === "content_writer" || identity.role === "team_lead");

  const isContentWriter = identity?.role === "content_writer";

  return (
    <div
      {...rest}
      className={cn(
        "sticky pt-4 pb-4 md:block md:pt-2 md:pb-0 bottom-0 bg-linear-to-b from-transparent to-background to-10%",
        className
      )}
      role="toolbar"
    >
      {Children.count(children) === 0 ? (
        <div className="flex flex-col gap-2 items-end">
          {/* Action Buttons Row */}
          <div className="flex flex-row gap-2">
            <CancelButton />
            {isApprovalResource ? (
              <>
                <ApprovalButtons
                  contentType={resourceToContentType[resource] as any}
                />
                {/* Show regular Save button for non-content-writers when ApprovalButtons doesn't render buttons */}
                {!isContentWriter && <SaveButton />}
              </>
            ) : (
              !isContentWriter && <SaveButton />
            )}
          </div>

          {/* Helper Text Row - shown only for approval resources */}
          {isApprovalResource && <ApprovalHelperText />}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export interface FormToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const ApprovalHelperText = () => {
  const record = useRecordContext();

  if (record?.status === "REJECTED") {
    return (
      <p className="text-sm text-red-600">
        This content was rejected. Make changes and request approval again.
      </p>
    );
  }

  if (record?.status === "PENDING") {
    return (
      <p className="text-sm text-yellow-600">
        Approval request is pending. Waiting for team lead review.
      </p>
    );
  }

  if (record?.status === "PUBLISHED") {
    return (
      <p className="text-sm text-green-600">
        This content is published and live.
      </p>
    );
  }

  return null;
};

const defaultFormToolbar = <FormToolbar />;
