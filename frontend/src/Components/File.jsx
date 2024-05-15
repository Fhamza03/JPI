import React from 'react'
import { useLocation } from "react-router-dom";

export default function File() {
    const location = useLocation();
    const { fileId,
        fileName,
        fileCode,
        rev,
        pdf_path,
        subjectOfRev,
        created_On } = location.state || {};

  return (
    <div>
        <h1>{fileId}</h1>
        <h1>{fileName}</h1>
        <h1>{fileCode}</h1>
        <h1>{rev}</h1>
        <h1>{pdf_path}</h1>
        <h1>{subjectOfRev}</h1>
        <h1>{created_On}</h1>
    </div>
  )
}
