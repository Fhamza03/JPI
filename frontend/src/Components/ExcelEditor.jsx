import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelEditor() {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState({ row: -1, col: -1 });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(excelData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = () => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "updated.xlsx");
  };

  const handleCellDoubleClick = (rowIndex, colIndex) => {
    setEditMode({ row: rowIndex, col: colIndex });
  };

  const handleCellValueChange = (e, rowIndex, colIndex) => {
    const newData = [...data];
    newData[rowIndex + 1][colIndex] = e.target.value;
    setData(newData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-5xl px-6 py-8 bg-white rounded-lg shadow-md border border-sky-500">
        <label
          htmlFor="dropzone-file"
          className="mx-auto cursor-pointer flex max-w-md flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-3 text-center"
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
            onChange={handleFileUpload}
          />
        </label>

        {data && (
          <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-sm mt-4 mb-4">
              <thead className="bg-sky-700 text-white dark:bg-gray-700">
                <tr>
                  {data[0].map((cell, index) => (
                    <th
                      className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                      key={index}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rowIndex) => (
                  <tr
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    key={rowIndex}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                        key={cellIndex}
                        onDoubleClick={() =>
                          handleCellDoubleClick(rowIndex, cellIndex)
                        }
                      >
                        {editMode.row === rowIndex &&
                        editMode.col === cellIndex ? (
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) =>
                              handleCellValueChange(e, rowIndex, cellIndex)
                            }
                            autoFocus
                            onBlur={() => setEditMode({ row: -1, col: -1 })}
                          />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="p-10 rounded-lg bg-sky-700 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
