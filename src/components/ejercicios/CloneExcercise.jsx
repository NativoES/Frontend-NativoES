import React from 'react'
import { useAppContext } from '@/contexts/Context';
import { useParams } from 'next/navigation';
import { completarTexto, falsoVerdadero, formarPalabra, llenarEspacio, notaColores, notaTexto, ordenarPalabra, ordenarTexto, palabraImagen, relacionarPalabra, seleccionPalabra, updateAudio, uploadGif, uploadImage, uploadVideo } from '@/services/exercises/exercises.service';

const cloneHandlers = {
    arrastrarAlTexto: completarTexto,
    seleccionPalabra: seleccionPalabra,
    gif: uploadGif,
    audio: updateAudio,
    video: uploadVideo,
    imagen: uploadImage,
    falsoVerdadero: falsoVerdadero,
    relacionarPalabra: relacionarPalabra,
    imagenPalabra: palabraImagen,
    ordenarPalabras: ordenarPalabra,
    notaTexto: notaTexto,
    formarPalabra: formarPalabra,
    nota: notaColores,
    ordenarTexto: ordenarTexto,
    rellenarTexto: llenarEspacio,


};


export const CloneExcercise = () => {
    const { select, setIsOpenModal, setSelect, loader, setLoader } = useAppContext();
    const params = useParams();

    const handleSave = async () => {
        if (!select || !select._id || !select.template) return;

        const claseId = params?.id;
        const template = select.template;
        const handler = cloneHandlers[template];

        if (!handler) {
            alert(`No se encontró función para clonar el template "${template}"`);
            return;
        }

        try {
            setLoader(true);

            const cloneData = {
                ...select,
                _id: undefined,
                claseId,
                titulo: `${select.titulo} (copia)`,
                createdAt: undefined,
                __v: undefined,
            };

            await handler(cloneData);

            setLoader(false);
            setIsOpenModal('');
            setSelect(null);
        } catch (error) {
            console.error(error);
            alert('Error al clonar ejercicio');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-center text-red-600">¿Estás seguro?</h2>
                <p className="text-center text-gray-700 mt-3">
                    Estás a punto de clonar el ejercicio{' '}
                    <span className="font-semibold text-black">"{select?.titulo ?? 'sin título'}"</span>.
                </p>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={() => setIsOpenModal('')}
                        className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loader}
                        className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
                    >
                        {loader ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};
