import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const MessageDialog = ({ winner, reset }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (winner) {
            dialogRef.current.showModal(); // Abre el diálogo cuando hay un ganador
        }
    }, [winner]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 flex justify-center items-center bg-black/50 text-white text-xl font-bold"
        >
            <div className="bg-white text-black p-8 rounded-lg shadow-lg flex flex-col items-center">
                <p className="mb-4">¡Ganó el {winner}!</p>
                <div className="flex gap-4">
                    {/* Botón para volver al menú principal */}
                    <Link
                        to="/"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Menú Principal
                    </Link>
                    {/* Botón para reiniciar la partida */}
                    <button
                        onClick={reset}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Volver a Jugar
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default MessageDialog;