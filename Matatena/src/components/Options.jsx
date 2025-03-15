import React from 'react';
import { Link } from "react-router-dom";

const contenedor = "flex justify-center items-center h-screen";
const contenedorTodoAncho = "w-64 space-y-3";
const contenedorColumnas = "grid grid-cols-2 gap-2";
const todoAncho = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const columna = "w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 transition";

export default function Options() {
  return (
    <div className={contenedor}>
      {/* Contenedor de los botones con un ancho fijo */}
      <div className={contenedorTodoAncho}>
        {/* Botones superiores */}
        <Link to={"/play"} className="block">
          <button className={todoAncho}>
            Jugar
          </button>
        </Link>
        <Link to={"/instructions"} className="block">
          <button className={todoAncho}>
            Instrucciones
          </button>
        </Link>
        <Link to={"/ranking"} className="block">
          <button className={todoAncho}>
            Ranking
          </button>
        </Link>

        {/* Botones inferiores en una misma fila */}
        <div className={contenedorColumnas}>
          <Link to={"/login"} className="block">
            <button className={columna}>
              Login
            </button>
          </Link>
          <Link to={"/register"} className="block">
            <button className={columna}>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}