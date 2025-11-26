"use client";

import { useRef, useState } from "react";
import { useActionState } from "react";

type ExcelUploaderProps<T> = {
  action: (formData: FormData) => Promise<T | null>;
  label?: string;
  sublabel?: string;
  accept?: string;
  uploadButtonText?: string;
  onSuccess?: (data: T) => void;
};

export default function ExcelUploader<T>({
  action,
  label = "Upload Excel",
  sublabel,
  accept = ".xlsx,.xls",
  uploadButtonText = "Upload",
  onSuccess,
}: ExcelUploaderProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const wrapper = async (_prevState: T | null, formData: FormData) => {
    const result = await action(formData);
    if (result && onSuccess) onSuccess(result);
    return result;
  };

  const [state, formAction, isPending] = useActionState(wrapper, null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={formAction} className="p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
        {sublabel && <p className="text-sm text-gray-500">{sublabel}</p>}
      </div>

      {/* File selection */}
      <div className="flex items-center space-x-2">
        <label
          htmlFor="file"
          className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition ${
            selectedFile ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {selectedFile ? selectedFile.name : "Select an Excel file"}
        </label>
        <input
          ref={fileInputRef}
          id="file"
          type="file"
          name="file"
          accept={accept}
          required
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload + Status */}
      <div className="flex items-center space-x-2">
        <button
          type="submit"
          disabled={!selectedFile || isPending}
          className={`px-4 py-2 rounded-lg font-medium text-white transition ${
            selectedFile
              ? isPending
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isPending ? "Uploading…" : uploadButtonText}
        </button>
      </div>

      {/* Success message */}
      {state && <p className="text-sm text-green-700">Upload completed successfully!</p>}
    </form>
  );
}
