import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Folder, File, Upload, Copy, X, Trash } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface FileItem {
  key: string;
  url: string;
  size: number;
  lastModified: string;
}

export const MediaLibraryList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

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
  };

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("folder", currentPath);

    try {
      const response = await fetch(`${API_URL}/api/v1/cms/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      await fetchFiles(); // Refresh file list
      setUploadFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileDelete = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/cms/upload?key=${selectedFile.key}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      await fetchFiles(); // Refresh file list
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
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
    <div className="p-4">
      <CardTitle title="Media Library" />
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Breadcrumbs />
                <Button onClick={() => setShowCreateFolder(true)}>
                  Create Folder
                </Button>
              </div>
              {showCreateFolder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold mb-4">Create New Folder</h3>
                    <Input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Folder name"
                    />
                    <div className="flex justify-end space-x-4 mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setShowCreateFolder(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateFolder} disabled={loading}>
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder}
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
                ))}
                {files.map((file) => (
                  <div
                    key={file.key}
                    className="border rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleFileSelect(file)}
                  >
                    {file.url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) ? (
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
                ))}
              </div>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-80 md:ml-4 mt-4 md:mt-0">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-4">Upload New File</h3>
              <div className="flex flex-col space-y-4">
                <Input
                  type="file"
                  onChange={(e) =>
                    setUploadFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                <Button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || loading}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            </CardContent>
          </Card>
          {selectedFile && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">File Details</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <img
                  src={selectedFile.url}
                  alt={selectedFile.key}
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-sm font-semibold truncate">
                  {selectedFile.key.split("/").pop()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
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
                  onClick={handleFileDelete}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete File
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
