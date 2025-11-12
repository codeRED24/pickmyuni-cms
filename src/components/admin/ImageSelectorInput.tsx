//@ts-nocheck
import { useDropzone } from "react-dropzone";
import * as React from "react";
import { useInput, FieldTitle, InputProps } from "ra-core";
import { FormLabel, FormField, FormError } from "@/components/admin/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MediaLibraryList } from "@/components/media";
import { InputHelperText } from "./input-helper-text";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export const ImageSelectorInput = (
  props: InputProps & { folderPath?: string }
) => {
  const {
    field,
    fieldState: { error, isTouched },
    formState: { isSubmitted },
    isRequired,
  } = useInput(props);

  const [open, setOpen] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/upload`
        );
        xhr.withCredentials = true;

        xhr.upload.onprogress = (event) => {
          const percent = (event.loaded / event.total) * 100;
          field.onChange(`Uploading: ${Math.round(percent)}%`);
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 201) {
            field.onChange(JSON.parse(xhr.responseText).url);
          } else {
            field.onChange("Upload failed");
          }
        };

        const formData = new FormData();
        formData.append("file", file);

        let folder = props.folderPath;
        if (!folder) {
          folder = "uploads";
        }

        formData.append("folder", folder);
        xhr.send(formData);
      }
    },
    [field, props.folderPath]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <FormField className={cn("w-full", props.className)}>
      <FormLabel>
        <FieldTitle
          label={props.label}
          source={props.source}
          resource={props.resource}
          isRequired={isRequired}
        />
      </FormLabel>
      <div
        {...getRootProps({
          className: `flex items-center gap-2 ${
            isDragActive ? "bg-blue-100" : ""
          }`,
        })}
      >
        <input {...getInputProps()} />
        <Input
          {...field}
          type="text"
          readOnly={props.readOnly}
          disabled={props.disabled}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              disabled={!field.value}
              aria-label="Preview image"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] w-auto h-auto sm:max-h-[90vh]">
            {field.value &&
            field.value.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) ? (
              <img
                src={field.value}
                alt="Preview"
                className="object-contain sm:max-w-[85vw] sm:max-h-[85vh]"
              />
            ) : (
              <div className="p-4">
                <p>Cannot preview this file type.</p>
                <a
                  href={field.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Open file in new tab
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Select Image</Button>
          </DialogTrigger>
          <DialogContent className="h-[80vh] w-[90vw] sm:max-w-[90vw] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Media Library</DialogTitle>
            </DialogHeader>
            <MediaLibraryList
              onFileSelect={(file) => {
                field.onChange(file.url);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <InputHelperText helperText={props.helperText} />
      <FormError error={error} isTouched={isTouched || isSubmitted} />
    </FormField>
  );
};
