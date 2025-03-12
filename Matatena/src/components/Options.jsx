import React from 'react';

const contenedor = "flex justify-center items-center h-screen";
const contenedorTodoAncho="w-64 space-y-3";
const contenedorColumnas="grid grid-cols-2 gap-2";
const todoAncho ="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const columna = "w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 transition";
export default function Options() {
  return (
    <div className={contenedor}>
      {/* Contenedor de los botones con un ancho fijo */}
      <div className={contenedorTodoAncho}>
        {/* Botones superiores */}
        <button className={todoAncho}>
          Jugar
        </button>
        <button className={todoAncho}>
          Instrucciones
        </button>
        <button className={todoAncho}>
          Ranking
        </button>

        {/* Botones inferiores en una misma fila */}
        <div className={contenedorColumnas}>
          <button className={columna}>
            Login
          </button>
          <button className={columna}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
