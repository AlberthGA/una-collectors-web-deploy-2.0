"use client";
import Handlebars from "handlebars";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import "../../styles/templates.css";

interface ITemplateViewer {
  selectedDocument: any;
  setSelectedDocument: (value: string | undefined) => void
  colName:string
}

const TemplateViewer = ({ selectedDocument, setSelectedDocument,colName }: ITemplateViewer) => {
  const [templateHTML, setTemplateHTML] = useState<string>('');
  const [documentData, setDocumentData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTemplate = async () => {
    try {
      const url = new URL(`http://localhost:3000/api/templates/byQuery`);
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const params = {
        version: documentData.templateVersion,
        nombre: documentData.templateName,
      };
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url.toString(), {
        headers: headers,
      });
      const res = await response.json();
      console.log(res.data[0].template);
      return res.data[0].template;
    } catch (error) {
      console.error(error);
      return '';
    } finally {
      setIsLoading(false);
    }

  };

  const fetchDocument = async () => {
    setIsLoading(true);
    try {
      const url = new URL(`http://localhost:3000/api/${colName}/`);
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const params = {
        find: `{"codigo":"${selectedDocument.codigo}"}`,
      };
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url.toString(), {
        headers: headers,
      });
      const res = await response.json();
      return res[0];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  let canvasRef = useRef<HTMLDivElement>(null);

  Handlebars.registerHelper(
    "ifEquals",
    function (this: any, arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    }
  );

  const handleTempleteFetch = async () => {
    setTemplateHTML(await fetchTemplate());
  }

  const handleDocFetch = async () => {
    const data = await fetchDocument();
    setDocumentData(data);
  }

  useEffect(() => {
    if (documentData) {
      handleTempleteFetch();
    }
  }, [documentData]);

  useEffect(() => {
    if (!documentData) {
      handleDocFetch()
    }
  }, []);

  const template = Handlebars.compile(templateHTML);
  const finalHTML = template(documentData);

  return (
    <div className="w-full h-full flex flex-col felx-1 items-start justify-center ">
      <div className="w-full flex items-center justify-end pt-5 pr-5">
        <button className="w-fit h-fit bg-red-900 text-white rounded-lg px-3 py-1 font-bold hover:bg-red-400" onClick={() => { setSelectedDocument(undefined) }}>
          x
        </button>
      </div>
      {isLoading
        ? <div className="w-full h-full py-5 flex flex-1 items-center justify-center overflow-x-auto ">
          <div className="w-full rounded-lg h-full a4-size flex flex-1 flex-col justify-center items-center border-2">
            <h1 className="text-center w-full font-bold text-xl">Cargando Formulario...</h1>
          </div>
        </div>
        : templateHTML === ''
          ?
          <div className="w-full h-full py-5 flex flex-1 items-center justify-center overflow-x-auto ">
            <div className="w-full rounded-lg h-full a4-size flex flex-1 flex-col justify-center items-center border-2">
              <h1 className="text-center w-full font-bold text-7xl">404</h1>
              <h1 className="text-center w-full font-bold text-xl">No se encontro la platilla para este formulario</h1>
            </div>
          </div>
          : <>
            <div className="w-full h-full py-5 flex flex-1 items-center justify-center overflow-x-auto ">
              <div className="w-full rounded-lg h-full a4-size scrollbar-invisible flex flex-1 flex-col  overflow-x-auto border-2">
                <div
                  id={"canvas"}
                  ref={canvasRef}
                  className="w-full print:shadow-none "
                  dangerouslySetInnerHTML={{ __html: finalHTML }}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center pb-5  ">
              <ReactToPrint
                trigger={() => (
                  <button className="w-fit h-fit bg-blue-700 hover:bg-blue-900 text-white rounded-lg px-4 py-2 font-bold ">
                    Imprimir!
                  </button>
                )}
                content={() => canvasRef.current}
                pageStyle={`
            @page {
                size: auto;
                margin: 11mm 17mm 17mm 17mm;        
                @top-right-corner {
                    content: "Page " counter(page);
                  }`}
              />
            </div>
          </>}
    </div>
  );
};

export default TemplateViewer;
