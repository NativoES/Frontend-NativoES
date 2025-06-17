'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/templates/Button';
import { enrollStudent, getAllStudents, getEnrolledStudents } from '@/services/user/user.service';

export default function ModalInscribirEstudiante({ onClose, onInscribir, claseId }) {
    const [query, setQuery] = useState('');
    const [allStudents, setAllStudents] = useState([]);
    const [studentsInscritos, setStudentsInscritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allData, enrolledData] = await Promise.all([
                    getAllStudents(),
                    getEnrolledStudents(claseId)
                ]);

                if (Array.isArray(allData)) {
                    setAllStudents(allData);
                } else if (Array.isArray(allData.data)) {
                    setAllStudents(allData.data);
                } else {
                    console.warn("Formato de respuesta inesperado:", allData);
                }

                const inscritosIds = enrolledData.students.map((e) => e._id);
                setStudentsInscritos(inscritosIds);
            } catch (error) {
                console.error("Error al cargar estudiantes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [claseId]);


    const filteredStudents = allStudents.filter((student) =>
        student.nombreCompleto.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase())
    );


    const handleInscribir = async (userId) => {
        try {
            await enrollStudent({ estudianteId: userId, claseId });
            onInscribir();
            onClose();
        } catch (error) {
            console.error("Error inscribiendo estudiante:", error);
            alert("No se pudo inscribir al estudiante");
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Inscribir Estudiante</h2>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por nombre o email..."
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                {loading ? (
                    <p className="text-center text-gray-500">Cargando estudiantes...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border border-gray-200 rounded-md">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="py-2 px-4 border-b">Nombre</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => {
                                    const yaInscrito = studentsInscritos.includes(student._id);
                                    console.log("estudiaante inscritos: ", student._id, "-------", studentsInscritos)
                                    return (
                                        <tr key={student._id} className="hover:bg-gray-50 transition">
                                            <td className="py-2 px-4 border-b">{student.nombreCompleto}</td>
                                            <td className="py-2 px-4 border-b">{student.email}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                {yaInscrito ? (
                                                    <span className="text-green-600 font-semibold">Inscrito</span>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleInscribir(student._id)}
                                                        variant="primary"
                                                    >
                                                        Inscribir
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No se encontraron estudiantes.</p>
                        )}
                    </div>
                )}

                <Button
                    onClick={onClose}
                    variant="danger"
                    className="w-full mt-6"
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );
}
