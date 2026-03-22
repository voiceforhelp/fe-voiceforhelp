"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" /> });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["link"],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = ["header", "bold", "italic", "underline", "strike", "list", "blockquote", "link", "align"];

  return (
    <div className="rich-text-editor">
      <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} placeholder={placeholder || "Write your content..."} />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 300px;
          font-size: 15px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background: #f9fafb;
        }
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
        .rich-text-editor .ql-toolbar.ql-snow,
        .rich-text-editor .ql-container.ql-snow {
          border-color: #d1d5db;
        }
        .rich-text-editor .ql-toolbar.ql-snow:focus-within + .ql-container.ql-snow,
        .rich-text-editor .ql-container.ql-snow:focus-within {
          border-color: #22c55e;
        }
      `}</style>
    </div>
  );
}
