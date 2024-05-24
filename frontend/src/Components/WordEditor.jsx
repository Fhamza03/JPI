import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import mammoth from "mammoth";

export default function WordEditor() {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!editor) {
      const newEditor = new Quill(editorRef.current, {
        modules: {
          toolbar: {
            container: "#toolbar",
          },
        },
        theme: "snow",
      });
      setEditor(newEditor);
    }
  }, [editor]);

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.convertToHtml({ arrayBuffer });

        console.log("Converted HTML:", result.value);

        setContent(result.value);
        if (editor) {
          editor.root.innerHTML = result.value;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // const handleSave = () => {
  //   if (editor) {
  //     const documentContent = editor.root.innerHTML;
  //     console.log("Document saved:", documentContent);
  //   }
  // };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-5xl px-6 py-8 bg-white rounded-lg shadow-md">
        {/* <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-lg pr-8 pl-8 bg-sky-700 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Save
          </button>
        </div> */}
        <label
          htmlFor="dropzone-file"
          className="mx-auto cursor-pointer flex max-w-md flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-3 text-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <h2 className="mt-4 text-md font-medium text-gray-700 tracking-wide">
            Upload File
          </h2>

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleUploadFile}
          />
        </label>

        <div id="toolbar" className="toolbar mt-4">
          {toolbarOptions.map((row, rowIndex) => (
            <span key={rowIndex}>
              {row.map((button, buttonIndex) => (
                <button key={buttonIndex} className={`ql-${button}`}></button>
              ))}
            </span>
          ))}
        </div>
        <div
          ref={editorRef}
          id="editor"
          className="mt-4"
          style={{ height: "500px" }}
        />
      </div>
    </div>
  );
}

const toolbarOptions = [
  [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "image",
    "video",
    "formula",
    "clean",
  ],
  [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }, { align: [] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }, { size: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];
