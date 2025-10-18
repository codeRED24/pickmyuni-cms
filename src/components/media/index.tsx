import React, { useState, useEffect, useCallback } from "react";
import {
  Folder,
  File,
  Upload,
  Copy,
  X,
  Trash,
  Info,
  Pencil,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "../ui/sheet";

import { useDropzone } from "react-dropzone";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface FileItem {
  key: string;
  url: string;
  size: number;
  lastModified: string;
}

export const MediaLibraryList = ({
  onFileSelect: onFileSelectProp,
}: {
  onFileSelect?: (file: FileItem) => void;
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[] | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [renameItem, setRenameItem] = useState<FileItem | string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [uploadProgress, setUploadProgress] = useState<
    { fileName: string; progress: number }[]
  >([]);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (selectedFile) {
      setImageDimensions(null);
    }
  }, [selectedFile]);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/cms/upload?folder=${currentPath}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files.");
      }
      const data = await response.json();
      setFiles(data.files || []);
      setFolders(data.folders || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [currentPath]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFolderClick = (folderPath: string) => {
    setCurrentPath(folderPath);
  };

  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
  };

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    if (onFileSelectProp) {
      onFileSelectProp(file);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadFiles(acceptedFiles);
      setShowUploadDialog(true);
    },
    [currentPath]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleFileUpload = async () => {
    if (!uploadFiles) return;

    setLoading(true);
    setUploadProgress(
      uploadFiles.map((file) => ({ fileName: file.name, progress: 0 }))
    );

    const uploadPromises = uploadFiles.map((file, index) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[index] = { ...newProgress[index], progress };
              return newProgress;
            });
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error("Upload failed"));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", currentPath);

        xhr.open("POST", `${API_URL}/api/v1/cms/upload`, true);
        xhr.send(formData);
      });
    });

    try {
      await Promise.all(uploadPromises);
      await fetchFiles(); // Refresh file list
      setUploadFiles(null);
      setShowUploadDialog(false);
      setUploadProgress([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: FileItem | string) => {
    const isFile = typeof item !== "string";
    const key = isFile ? item.key : item;
    const endpoint = isFile ? `?key=${key}` : `/folder?folder=${key}`;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/upload${endpoint}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      await fetchFiles(); // Refresh file list
      if (isFile && selectedFile?.key === key) {
        setSelectedFile(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!renameItem || !newItemName) return;

    const isFile = typeof renameItem !== "string";
    const oldKey = isFile ? renameItem.key : renameItem;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/upload/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldKey, newName: newItemName, isFile }),
      });
      if (!response.ok) {
        throw new Error("Rename failed");
      }
      await fetchFiles(); // Refresh file list
      setShowRenameDialog(false);
      setRenameItem(null);
      setNewItemName("");
      if (isFile && selectedFile?.key === oldKey) {
        // If the selected file was renamed, update it
        const newKey =
          oldKey.substring(0, oldKey.lastIndexOf("/") + 1) + newItemName;
        const newUrl =
          selectedFile.url.substring(0, selectedFile.url.lastIndexOf("/") + 1) +
          newItemName;
        setSelectedFile({ ...selectedFile, key: newKey, url: newUrl });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rename failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInfo = (item: FileItem | string) => {
    if (typeof item !== "string") {
      setSelectedFile(item);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/cms/upload/folder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderName: newFolderName, currentPath }),
      });
      if (!response.ok) {
        throw new Error("Folder creation failed");
      }
      await fetchFiles(); // Refresh file list
      setShowCreateFolder(false);
      setNewFolderName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Folder creation failed");
    } finally {
      setLoading(false);
    }
  };

  const Breadcrumbs = () => {
    const pathParts = currentPath.split("/").filter((p) => p);
    return (
      <div className="flex items-center space-x-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleBreadcrumbClick("")}
        >
          Home
        </Button>
        {pathParts.map((part, index) => {
          const path = pathParts.slice(0, index + 1).join("/");
          return (
            <React.Fragment key={path}>
              <span>/</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBreadcrumbClick(path)}
              >
                {part}
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div
      {...getRootProps({
        className: `dropzone ${isDragActive ? "bg-blue-100" : ""}`,
      })}
    >
      <input {...getInputProps()} />
      <div className="p-4">
        <CardTitle title="Media Library" />
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Breadcrumbs />
                  <div className="flex items-center gap-2">
                    <Button onClick={() => setShowUploadDialog(true)}>
                      <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                    <Button onClick={() => setShowCreateFolder(true)}>
                      Create Folder
                    </Button>
                  </div>
                </div>
                <Dialog
                  open={showUploadDialog}
                  onOpenChange={setShowUploadDialog}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload New File</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <Input
                        type="file"
                        multiple
                        onChange={(e) =>
                          setUploadFiles((prevFiles) => [
                            ...(prevFiles || []),
                            ...(e.target.files
                              ? Array.from(e.target.files)
                              : []),
                          ])
                        }
                      />
                      {uploadFiles && (
                        <div>
                          <p>Selected files:</p>
                          <ul className="space-y-3">
                            {uploadFiles.map((file, i) => (
                              <li
                                key={i}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  {file.type.startsWith("image/") ? (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  ) : (
                                    <File className="w-10 h-10" />
                                  )}
                                  <span>{file.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setUploadFiles(
                                      (prevFiles) =>
                                        prevFiles?.filter(
                                          (_, index) => index !== i
                                        ) || null
                                    );
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>{" "}
                        </div>
                      )}
                      <Button
                        onClick={handleFileUpload}
                        disabled={!uploadFiles || loading}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </Button>
                    </div>
                    {uploadProgress.length > 0 && (
                      <div className="space-y-2">
                        {uploadProgress.map((file, index) => (
                          <div key={index}>
                            <div className="flex justify-between">
                              <span className="text-sm">{file.fileName}</span>
                              <span className="text-sm">{file.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}{" "}
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => setShowUploadDialog(false)}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={showCreateFolder}
                  onOpenChange={setShowCreateFolder}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Folder</DialogTitle>
                    </DialogHeader>
                    <Input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Folder name"
                    />
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => setShowCreateFolder(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateFolder} disabled={loading}>
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={showRenameDialog}
                  onOpenChange={setShowRenameDialog}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rename Item</DialogTitle>
                    </DialogHeader>
                    <Input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="New name"
                    />
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowRenameDialog(false);
                          setRenameItem(null);
                          setNewItemName("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleRename} disabled={loading}>
                        Rename
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {folders.map((folder) => (
                      <ContextMenu key={folder}>
                        <ContextMenuTrigger>
                          <div
                            className="p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent"
                            onClick={() => handleFolderClick(folder)}
                          >
                            <Folder className="w-16 h-16 text-muted-foreground" />
                            <span className="mt-2 text-sm text-center">
                              {folder
                                .split("/")
                                .filter((p) => p)
                                .pop()}
                            </span>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem
                            onClick={() => {
                              const folderName =
                                folder
                                  .split("/")
                                  .filter((p) => p)
                                  .pop() || "";
                              setRenameItem(folder);
                              setNewItemName(folderName);
                              setShowRenameDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => handleDelete(folder)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                    {files.map((file) => (
                      <ContextMenu key={file.key}>
                        <ContextMenuTrigger>
                          <div
                            className="border rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => handleFileSelect(file)}
                          >
                            {file.url.match(
                              /\.(jpeg|jpg|gif|png|svg|webp)$/i
                            ) ? (
                              <img
                                src={file.url}
                                alt={file.key}
                                className="w-full h-32 object-cover"
                              />
                            ) : (
                              <div className="w-full h-32 flex items-center justify-center bg-muted">
                                <File className="w-12 h-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="p-2">
                              <p className="text-sm truncate">
                                {file.key.split("/").pop()}
                              </p>
                            </div>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem onClick={() => handleInfo(file)}>
                            <Info className="mr-2 h-4 w-4" />
                            Info
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={() => window.open(file.url, "_blank")}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(file.url)
                            }
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={() => {
                              const fileName = file.key.split("/").pop() || "";
                              setRenameItem(file);
                              setNewItemName(fileName);
                              setShowRenameDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => handleDelete(file)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
              </CardContent>
            </Card>
          </div>
          <Sheet
            open={selectedFile !== null}
            onOpenChange={(open) => !open && setSelectedFile(null)}
          >
            <SheetContent>
              {selectedFile && (
                <>
                  <SheetHeader>
                    <SheetTitle>File Details</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    {selectedFile.url.match(
                      /\.(jpeg|jpg|gif|png|svg|webp)$/i
                    ) ? (
                      <img
                        src={selectedFile.url}
                        alt={selectedFile.key}
                        className="w-full rounded-lg mb-4"
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          setImageDimensions({
                            width: img.naturalWidth,
                            height: img.naturalHeight,
                          });
                        }}
                      />
                    ) : (
                      <div className="w-full h-32 flex items-center justify-center bg-muted">
                        <File className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {imageDimensions && (
                      <p className="text-xs text-muted-foreground">
                        Dimensions: {imageDimensions.width} x{" "}
                        {imageDimensions.height}
                      </p>
                    )}
                    <p className="text-sm font-semibold truncate">
                      {selectedFile.key.split("/").pop()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Size: {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-xs text-muted-foreground">
                      File Type:{" "}
                      {selectedFile.key.split(".").pop()?.toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last Modified:{" "}
                      {new Date(selectedFile.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <SheetFooter>
                    <Button
                      className="w-full"
                      onClick={() => window.open(selectedFile.url, "_blank")}
                    >
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button
                      className="w-full mt-4"
                      onClick={() =>
                        navigator.clipboard.writeText(selectedFile.url)
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy URL
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full mt-2"
                      onClick={() => handleDelete(selectedFile!)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete File
                    </Button>
                  </SheetFooter>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
