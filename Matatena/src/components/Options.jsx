import React from 'react';
import { Link } from "react-router-dom";

const contenedor = "flex flex-col justify-center items-center h-screen";
const contenedorTodoAncho = "w-64 space-y-3";
const contenedorColumnas = "grid grid-cols-2 gap-2";
const todoAncho = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const todoAnchoMorado = "w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const columna = "w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 transition";
const title ="text-4xl font-bold mb-6 text-center";
export default function Options() {
  return (
    <div className={contenedor}>
      <h1 className={title}>MATATENA</h1>
      <div>
        {/* Contenedor de los botones con un ancho fijo */}
        <div className={contenedorTodoAncho}>
          {/* Botones superiores */}
          <Link to={"/play"} className="block">
            <button className={todoAncho}>
              Jugar
            </button>
          </Link>
          <a className="block" target='_blank' href="https://forms.gle/TbkAbQmDyzxoj1en9">
            <button className={todoAnchoMorado}>
              Form
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}