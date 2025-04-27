import React, { useEffect, useRef } from 'react';
//TODO: Añadir CSS para que se muestre centrado
//TODO: Incluir botones para reiniciar la partida o volver al menú principal
const MessageDialog = ({ winner }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (winner) {
            dialogRef.current.showModal(); // Abre el diálogo cuando hay un ganador
        }
    }, [winner]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 flex justify-center items-center bg-black/50 text-white text-xl font-bold rounded-lg"
        >
            <div className="bg-white text-black p-8 rounded-lg shadow-lg">
                <p>¡Ganó el {winner}!</p>
            </div>
        </dialog>
    );
};

export default MessageDialog;
