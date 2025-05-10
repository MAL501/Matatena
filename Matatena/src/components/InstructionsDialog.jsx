import React, { useEffect, useRef } from 'react';
import GameExample from '../assets/GameExample.png'; // Importa la imagen desde la carpeta assets

const InstructionsDialog = ({ open, setOpen }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (open) {
            dialogRef.current.showModal();
            // Forzar reset de estilos por si hay herencia no deseada
            dialogRef.current.style.position = 'fixed';
            dialogRef.current.style.top = '0';
            dialogRef.current.style.left = '0';
            dialogRef.current.style.right = '0';
            dialogRef.current.style.bottom = '0';
        } else {
            dialogRef.current.close();
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false); // Cierra el diálogo al cambiar el estado
    };

    return (
        <dialog
            ref={dialogRef}
            className="fixed top-0 left-0 w-full h-full bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 border-none overflow-hidden"
            style={{
                display: open ? 'block' : 'none', // Alternativa para navegadores antiguos
                margin: 0,
                zIndex: 9999
            }}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center overflow-y-auto">
                {/* Título del diálogo */}
                <h2 className="text-2xl font-bold mb-4">Instrucciones</h2>
                
                {/* Texto de instrucciones */}
                <p className="text-justify mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                {/* Imagen de ejemplo */}
                <img
                    src={GameExample}
                    alt="Ejemplo del juego"
                    className="w-full max-w-[400px] rounded-lg mb-4"
                />

                {/* Botón para cerrar el diálogo */}
                <button
                    onClick={handleClose}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mt-auto"
                >
                    Cerrar
                </button>
            </div>
        </dialog>
    );
};

export default InstructionsDialog;