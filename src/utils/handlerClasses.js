const actualizarOrdenEjercicios = async (ejercicioOrdenado) => {
//   const ejercicioOrdenado = ['abc123', 'def456', 'ghi789'];
  const classeId = 'tuClaseId'; // Reemplaza con el ID real de la clase

  try {
    const response = await fetch('/api/classes/updateExercises', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classeId,
        exerciseIdsOrder: ejercicioOrdenado,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Orden de ejercicios actualizado con éxito');
    } else {
      console.error('Error al actualizar el orden', data.error);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};