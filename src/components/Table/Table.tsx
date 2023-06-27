"use client";
import React, { useState } from 'react';
import ExportButton from './ExportButton';

interface TableData {
  headers: string[];
  data: { [key: string]: string | number }[];
  setSelectedDocument: (value: any) => void;
}

const Table: React.FC<TableData> = ({ headers, data, setSelectedDocument }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allRowKeys = data.map((_, index) => `row-${index}`);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedRows(allRowKeys);
    } else {
      setSelectedRows([]);
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, rowKey: string) => {
    if (e.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowKey]);
    } else {
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((key) => key !== rowKey));
    }
  };

  const handleView = (doc: any) => {
    setSelectedDocument(doc);
  }

  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-xl bg-thead">
      <div className="flex flex-col items-end p-2">
        <ExportButton />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-thead">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-1" checked={selectAll} onChange={handleSelectAllChange} />
                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
              </div>
            </th>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const rowKey = `row-${index}`;

            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-100">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-1"
                      checked={selectedRows.includes(rowKey)}
                      onChange={(e) => handleCheckboxChange(e, rowKey)}
                    />
                    <label htmlFor={`checkbox-table${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                {Object.keys(item).map((key) => (
                  <th key={key} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item[key]}
                  </th>
                ))}
                <td className="px-6 py-4 text-gray-900">
                  <button className="font-medium text-blue-500 hover:underline pr-2" onClick={() => handleView(item)}>
                    Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;