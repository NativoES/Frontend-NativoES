'use client';

import { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/Context';
import { createContact, getContact, updateContact } from '@/services/landing/landing.service';

const DIAS_SEMANA = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
];

const ContactEditor = () => {
  const { language } = useAppContext();
  const [infoId, setInfoId] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [redesSociales, setRedesSociales] = useState([]);

  const locale = language.toLowerCase();

  const normalizarHorarios = (data = []) => {
    return DIAS_SEMANA.map((dia) => {
      const existente = data.find(h => h.dia === dia);
      return existente || { dia, abierto: false };
    });
  };

  const normalizarRedes = (data = []) => {
    const redesPredefinidas = [
      { nombre: 'WhatsApp', icon: '🟢' },
      { nombre: 'Telegram', icon: '🔵' },
      { nombre: 'Twitter', icon: '🐦' },
      { nombre: 'Instagram', icon: '📸' },
      { nombre: 'Facebook', icon: '📘' },
      { nombre: 'LinkedIn', icon: '💼' }
    ];

    return redesPredefinidas.map((r) => {
      const existente = data.find(d => d.nombre === r.nombre);
      return {
        nombre: r.nombre,
        url: existente?.url || '',
        icon: r.icon
      };
    });
  };

  const fetchHorarios = async (len) => {
    try {
      const data = await getContact(len);
      const info = data[0];

      if (info && info[len]) {
        setInfoId(info._id);
        setTelefono(info[len].telefono || '');
        setEmail(info[len].email || '');
        setHorarios(normalizarHorarios(info[len].horarios || []));
        setRedesSociales(normalizarRedes(info[len].redesSociales || []));
      } else {
        setInfoId(null);
        setTelefono('');
        setEmail('');
        setHorarios(normalizarHorarios([]));
        setRedesSociales(normalizarRedes([]));
      }
    } catch (err) {
      console.error('Error al cargar información:', err);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      locale,
      informacion: {
        telefono,
        email,
        horarios,
        redesSociales,
      }
    };

    try {
      let data;

      if (infoId) {
        data = await updateContact(infoId, payload);
      } else {
        data = await createContact(payload);
      }

      alert('Información guardada correctamente');
      if (data?._id) setInfoId(data._id);

    } catch (err) {
      console.error('Error al guardar:', err);
      alert('Hubo un error al guardar la información');
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Información de Contacto</h2>
        <Button type="submit" form="contact-form" variant="primary">Guardar cambios</Button>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">Información de contacto</h3>
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
              <h4 className="text-xl font-semibold">Horario de atención</h4>
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

            <div>
              <h4 className="text-xl font-semibold">Redes Sociales</h4>
              <div className="space-y-3">
                {redesSociales.map((r, index) => (
                  <div
                    key={r.nombre}
                    className="flex items-center justify-between gap-4 border p-3 rounded-lg max-w-[500px]"
                  >
                    <div className="text-2xl w-20 text-center">{r.icon}</div>
                    {/* <Input
                      label="Nombre"
                      value={r.nombre}
                      disabled
                      className="w-1/2"
                    /> */}
                    <span>{r.nombre}</span>
                    <Input
                      // label="URL"
                      value={r.url}
                      placeholder="URL"
                      onChange={(e) =>
                        setRedesSociales(prev =>
                          prev.map((x, i) =>
                            i === index ? { ...x, url: e.target.value } : x
                          )
                        )
                      }
                      className="w-full"
                    />
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
