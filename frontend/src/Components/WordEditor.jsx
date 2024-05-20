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

  const handleSave = () => {
    if (editor) {
      const documentContent = editor.root.innerHTML;
      console.log("Document saved:", documentContent);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-5xl px-6 py-8 bg-white rounded-lg shadow-md">
        <input type="file" onChange={handleUploadFile} />
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
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
