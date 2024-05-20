import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import mammoth from 'mammoth';

export default function WordEditor() {
  // const editorRef = useRef(null);
  // const [editor, setEditor] = useState(null);
  // const [content, setContent] = useState('');

  // useEffect(() => {
  //   if (editorRef.current) {
  //     const editorInstance = new Quill(editorRef.current, {
  //       theme: 'snow',
  //     });
  //     setEditor(editorInstance);
  //   }
  // }, []);

  // const handleUploadFile = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const arrayBuffer = e.target.result;
  //       const result = await mammoth.convertToHtml({ arrayBuffer });
  //       const html = result.value; 
  //       setContent(html); 
  //       if (editor) {
  //         editor.root.innerHTML = html; 
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const handleSave = () => {
  //   if (editor) {
  //     const documentContent = editor.root.innerHTML;
  //     console.log('Document saved:', documentContent);
  //   }
  // };

  return (
    <div>
    {/* <input type="file" onChange={handleUploadFile} />
    <div ref={editorRef} id="editor" />
      <button onClick={handleSave}>Save</button> */}
    </div>
  );
}
