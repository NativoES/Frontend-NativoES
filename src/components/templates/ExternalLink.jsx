'use client'

import { useState } from "react";
import InputTemplate  from '@/templates/InputTemplate'
import TextAreaTemplate from '@/templates/TextAreaTemplate'
import Button from '@/templates/Button'
import Label from '@/templates/Labels'

const ExternalLinkCard = ({ onSave, onCancel }) => {
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
    url: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(cardData);
  };

  const handleCancel = () => {
    setCardData({
      title: '',
      description: '',
      url: '',
    });

    if (onCancel) {
      onCancel();
    }
  };

  return (
        <ModalTemplate className="w-full ">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Tarjeta de Enlace Externo</h2>

      {/* Formulario */}
      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          name="title"
          value={cardData.title}
          onChange={handleInputChange}
          placeholder="Ingrese el título"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="description">Descripción:</Label>
        <TextAreaTemplate
          id="description"
          name="description"
          value={cardData.description}
          onChange={handleInputChange}
          placeholder="Ingrese la descripción"
          rows="3"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="url">URL Externa:</Label>
        <InputTemplate
          id="url"
          name="url"
          type="url"
          value={cardData.url}
          onChange={handleInputChange}
          placeholder="https://ejemplo.com"
        />
      </div>

      <div className="space-y-4">
        <Button onClick={handleSave} variant="primary">
          Guardar
        </Button>
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </ModalTemplate>
  );
};

export default ExternalLinkCard;
