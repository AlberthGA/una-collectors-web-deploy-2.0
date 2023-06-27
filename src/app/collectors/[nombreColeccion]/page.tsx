"use client"
import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table/Table'
import PreviousButton from './../../../components/Table/PreviousButton';
import NextButton from './../../../components/Table/NextButton';
import TemplateViewer from '../../../components/TemplateViewer/TemplateViewer';

interface TableData {
  [key: string]: string | number;
}

interface FormularioData {
  descripcion: string,
  ruta: string,
  nombreColeccion: string,
  encabezados: string[],
  campos: string[]
}

const defaultTemplate = { templateHTML: '', documentData: { header: { day: '', docNumber: '', month: '', year: '' } } }

async function getItems(page: number, limit: number, fields: string[], colName: string): Promise<TableData[]> {
  try {
    const url = new URL(`http://localhost:3000/api/${colName}/byFilter`);
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    const params = {
      Filter: '{}',
      fields: fields.toString(),
      page: page.toString(),
      limit: limit.toString(),
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString(), {
      headers: headers,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getFormularioData(): Promise<FormularioData[]> {
  try {
    const url = new URL('http://localhost:3000/api/formularios');
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await fetch(url.toString(), {
      headers: headers,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Ocurrió un error al obtener los campos del formulario');
  }
}

const PermisosPage: React.FC = () => {
  const [formularios, setFormularios] = useState<FormularioData[]>([]);
  const [items, setItems] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<any>(undefined);

  const itemsPerPage = 6;
  const pathname = typeof window !== "undefined" ? window.location.pathname : '';

  useEffect(() => {
    fetchFormularioData();
  }, [pathname]);

  useEffect(() => {
    fetchItems();
  }, [currentPage, formularios]);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  async function fetchFormularioData() {
    try {
      const items: FormularioData[] = await getFormularioData();
      const formulario = items.filter(
        item => item.ruta === pathname.replace("/collectors", "")
      );
      setFormularios(formulario);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchItems() {
    try {
      if (formularios.length > 0) {
        const newItemsArray: any = await getItems(
          currentPage,
          itemsPerPage,
          formularios[0]?.campos || [],
          formularios[0]?.nombreColeccion || ''
        );
        setItems(newItemsArray.data);
        setTotalPages(newItemsArray.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold p-4'>{formularios[0]?.descripcion}</h1>
      <div className='max-w-7xl mx-auto py-3 sm:px-6 lg:px-8'>
        <div className="max-w-full">
          <div className="shadow-md sm:rounded-xl bg-background">
            <div className="max-w-full mx-auto px-4 sm:py-4 sm:px-4 lg:max-w-full lg:px-4">
              {formularios.length > 0 ? (
                <Table headers={formularios[0]?.encabezados} data={items} setSelectedDocument={setSelectedDocument} />
              ) : (
                <div className="text-center">Espere mientras se cargan los datos...</div>
              )}
              <div className="flex flex-col items-end">
                <div className="inline-flex mt-2 xs:mt-0 space-x-1">
                  {currentPage > 1 && (
                    <PreviousButton
                      onMouseClick={() => {
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  )}
                  {currentPage < totalPages && (
                    <NextButton
                      onMouseClick={() => {
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDocument !== undefined &&
        <div className='fixed top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-11 h-full w-full scroll-auto'>
          <div className='bg-white rounded-lg shadow-lg lex scroll-auto h-full w-full'>
            <TemplateViewer selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} colName={formularios[0]?.nombreColeccion}/>
          </div>
        </div>
      }

    </div>
  );
};

export default PermisosPage;