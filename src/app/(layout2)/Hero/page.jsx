'use client'

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { createHero, getHero, updateHero } from '@/services/landing/landing.service';

const emptyHeroData = {
    title: '',
    title2: '',
    subtitle: '',
    btcPrimary: '',
    btcSecondary: '',
    studentsCount: '',
    studentsText: '',
    backgroundImageUrl: ''
};

const HeroEditor = () => {
    const { siteData, updateSection, language, showAlert } = useAppContext();
    const [formData, setFormData] = useState(emptyHeroData);
    const [backgroundFile, setBackgroundFile] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState('');
    
    const idioma = language.toLowerCase();
    
    const loadHeroData = async (idioma) => {
        try {
            const data = await getHero(idioma);

            console.log('Datos del hero:', data);


            if (data.length > 0) {
                setFormData({
                    ...data[0][idioma],
                    backgroundImageUrl: data[0].backgroundImageUrl || '',
                    _id: data[0]._id
                });
            } else {
                setFormData(emptyHeroData);
            }
        } catch (err) {
            console.error('Error al cargar datos del hero:', err);
            setFormData(emptyHeroData);
        }
    };

    useEffect(() => {
        loadHeroData(idioma);
    }, [language]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBackgroundImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBackgroundFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title || '');
        formDataToSend.append('title2', formData.title2 || '');
        formDataToSend.append('subtitle', formData.subtitle || '');
        formDataToSend.append('btcPrimary', formData.btcPrimary || '');
        formDataToSend.append('btcSecondary', formData.btcSecondary || '');
        formDataToSend.append('studentsCount', formData.studentsCount || '');
        formDataToSend.append('studentsText', formData.studentsText || '');
        formDataToSend.append('locale', idioma);

        // Archivo o URL de imagen
        if (backgroundFile) {
            formDataToSend.append('file', backgroundFile);
        } else {
            formDataToSend.append('file', backgroundFile);
        }

        try {

            if (formData._id) {
                // PATCH
                await updateHero(formData._id, formDataToSend);
                
            } else {
                // POST
                await createHero(formDataToSend)
            }

            updateSection('hero', { ...siteData.hero, [idioma]: formDataToSend });
            showAlert('Guardado correctamente', 'success');
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showAlert('Error al guardar', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Editar Sección Hero</h2>
                <Button type="submit" form="hero-form">Guardar cambios</Button>
            </div>

            <div className="">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Contenido</h3>
                    </CardHeader>
                    <CardContent>
                        <form id="hero-form" onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Título"
                                name="title"
                                value={formData?.title || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <Input
                                label="Título 2"
                                name="title2"
                                value={formData?.title2 || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <Textarea
                                label="Subtítulo"
                                name="subtitle"
                                value={formData?.subtitle || ''}
                                onChange={handleInputChange}
                                rows={3}
                                fullWidth
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Texto CTA Principal"
                                    name="btcPrimary"
                                    value={formData?.btcPrimary || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                />

                                <Input
                                    label="Texto CTA Secundario"
                                    name="btcSecondary"
                                    value={formData?.btcSecondary || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Número de estudiantes"
                                    name="studentsCount"
                                    value={formData?.studentsCount || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                />

                                <Input
                                    label="Texto de estudiantes"
                                    name="studentsText"
                                    value={formData?.studentsText || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Imagen de fondo</label>
                                <div className="flex items-center space-x-4">
                                    <div className="w-40 h-24 bg-gray-100 rounded overflow-hidden border">
                                        <img
                                            src={backgroundPreview || formData?.backgroundImageUrl || '/no-image.png'}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleBackgroundImageChange} />
                                </div>
                            </div>



                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HeroEditor;