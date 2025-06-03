'use client';

import { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/Context';

const DIAS_SEMANA = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
];

const ContactEditor = () => {
  const { language } = useAppContext();
  const [infoId, setInfoId] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horarios, setHorarios] = useState([]);

  const locale = language.toLowerCase();

  // Normalizar días: asegurar que estén todos
  const normalizarHorarios = (data) => {
    return DIAS_SEMANA.map((dia) => {
      const existente = data.find(h => h.dia === dia);
      return existente || { dia, abierto: false };
    });
  };  

  const fetchHorarios = (len) => {
  fetch(`http://localhost:5000/api/information?locale=${len}`)
    .then(res => res.json())
    .then(data => {
      const info = data[0];
      if (info && info[locale]) {
        setInfoId(info._id);
        setTelefono(info[locale].telefono || '');
        setEmail(info[locale].email || '');
        setHorarios(normalizarHorarios(info[locale].horarios || []));
      } else {
        // No hay datos para este idioma, resetear estado
        setInfoId(null); // << IMPORTANTE
        setTelefono('');
        setEmail('');
        setHorarios(normalizarHorarios([]));
      }
    })
    .catch(err => console.error('Error al cargar información:', err));
};


  useEffect(() => {
    fetchHorarios(locale);
  }, [language]);

  const handleHorarioChange = (index, field, value) => {
    setHorarios(prev =>
      prev.map((h, i) =>
        i === index
          ? { ...h, [field]: field === 'abierto' ? value === 'true' : value }
          : h
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      locale,
      informacion: {
        telefono,
        email,
        horarios
      }
    };

    const url = infoId
      ? `http://localhost:5000/api/information/${infoId}`
      : `http://localhost:5000/api/information`;

    const method = infoId ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        alert('Información guardada correctamente');
        if (data._id) setInfoId(data._id);
      })
      .catch(err => {
        console.error('Error al guardar:', err);
        alert('Hubo un error al guardar la información');
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Información de Contacto</h2>
        <Button type="submit" form="contact-form">Guardar cambios</Button>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Información de contacto</h3>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                fullWidth
              />
              <Input
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Horario de atención</h4>
              <div className="space-y-4">
                {horarios.map((h, index) => (
                  <div
                    key={h.dia}
                    className="grid grid-cols-1 md:grid-cols-5 items-end gap-4 border p-3 rounded-lg"
                  >
                    <div className="font-semibold text-gray-700">{h.dia}</div>

                    <select
                      value={String(h.abierto)}
                      onChange={(e) =>
                        handleHorarioChange(index, 'abierto', e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="true">Abierto</option>
                      <option value="false">Cerrado</option>
                    </select>

                    {h.abierto && (
                      <>
                        <Input
                          label="Hora Apertura"
                          type="time"
                          value={h.horaApertura || ''}
                          onChange={(e) =>
                            handleHorarioChange(index, 'horaApertura', e.target.value)
                          }
                        />
                        <Input
                          label="Hora Cierre"
                          type="time"
                          value={h.horaCierre || ''}
                          onChange={(e) =>
                            handleHorarioChange(index, 'horaCierre', e.target.value)
                          }
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ContactEditor;
