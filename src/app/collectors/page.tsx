"use client"
import React, { useEffect, useState } from "react";
import MenuButton from "@/components/Dashboard/MenuButton";
import { useRouter } from "next/navigation";

interface FormularioData {
  titulo: string,
  icono: string,
  ruta: string
}

async function getItems(): Promise<FormularioData[]> {
  try {
    const url = new URL('http://localhost:3000/api/formularios/');
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await fetch(url, {
      headers: headers,
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}


const Dashboard = () => {
  const router = useRouter();

  const [items, setItems] = useState<FormularioData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const newItemsArray: any = await getItems();
      setItems(newItemsArray);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="max-w-full mx-auto sm:px-6 sm:py-12 lg:px-2">
      {isLoading ? (
        <div className="flex justify-center items-start h-screen text-center">
          <h1 className="text-2xl font-bold">Espere mientras se cargan los datos...</h1>
        </div>
      ) : (
        <div className="shadow-lg">
          <div className="max-w-2xl mx-auto px-4 sm:py-12 sm:px-6 lg:max-w-full lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-5 lg:grid-cols-5 xl:gap-x-8">
              {items.map((item, index) => (
                <MenuButton
                  key={index}
                  title={item.titulo}
                  img={'/images/' + item.icono}
                  onMouseClick={() => {
                    router.push('/collectors' + item.ruta);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
