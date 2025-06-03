import React, { useState } from 'react';
import { Link } from "react-router-dom";
import InstructionsDialog from './InstructionsDialog';
import SignIn from './LoginRegister/SignIn';
import LogIn from './LoginRegister/LogIn';

const contenedor = "flex justify-center items-center h-screen";
const contenedorTodoAncho = "w-64 space-y-3";
const contenedorColumnas = "grid grid-cols-2 gap-2";
const todoAncho = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const todoAnchoMorado = "w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const columna = "w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 transition";

export default function Options() {
  // Estos UseState sirven para abrir o cerrar los distintos dialogs de la aplicación
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

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
        <button
          onClick={() => setOpenInstructions(true)} // Abre el diálogo de instrucciones
          className={todoAncho}
        >
          Instrucciones
        </button>
        <Link to={"/ranking"} className="block">
          <button className={todoAncho}>
            Ranking
          </button>
        </Link>
        <a className="block" target='_blank' href="https://forms.gle/TbkAbQmDyzxoj1en9">
          <button className={todoAnchoMorado}>
            Danos tu opinión
          </button>
        </a>
        {/* Botones inferiores en una misma fila */}
        <div className={contenedorColumnas}>
          {/* Botón para abrir el diálogo de login */}
          <button
            className={columna}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </button>
          {/* Botón para abrir el diálogo de registro */}
          <button
            className={columna}
            onClick={() => setOpenRegister(true)}
          >
            Register
          </button>
        </div>
      </div>
      {/* Dialog de instrucciones */}
      {openInstructions && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 relative max-w-xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setOpenInstructions(false)}
            >
              ×
            </button>
            <InstructionsDialog open={true} setOpen={setOpenInstructions} />
          </div>
        </div>
      )}
      {/* Dialog de login */}
      {openLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setOpenLogin(false)}
            >
              ×
            </button>
            <LogIn />
          </div>
        </div>
      )}
      {/* Dialog de registro */}
      {openRegister && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setOpenRegister(false)}
            >
              ×
            </button>
            <SignIn />
          </div>
        </div>
      )}
    </div>
  );
}