'use client'

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/Context';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

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
    const { siteData, updateSection, language } = useAppContext();
    const [formData, setFormData] = useState(emptyHeroData);
    const idioma = language.toLowerCase();

    const loadHeroData = async (idioma) => {
        try {
            const res = await fetch(`http://localhost:5000/api/hero?locale=${idioma}`);
            const data = await res.json();

            if (data.length > 0) {
                setFormData({
                    ...data[0][idioma],
                    _id: data[0]._id // opcional, si necesitas para PATCH
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataConLocale = {
            ...formData,
            locale: idioma
        };


        try {

            if (formData._id) {
                // PATCH
                await fetch(`http://localhost:5000/api/hero/${formData._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formDataConLocale)
                });
            } else {
                // POST
                await fetch('http://localhost:5000/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formDataConLocale)
                });
            }


            updateSection('hero', { ...siteData.hero, [idioma]: formDataConLocale });
            console.log('hero actualizado/creado', formDataConLocale);

        } catch (error) {
            console.error('Error al enviar formulario:', error);
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

                            <Input
                                label="URL de imagen de fondo"
                                name="backgroundImageUrl"
                                value={formData?.backgroundImageUrl || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />

                        </form>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Vista previa</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white relative aspect-video">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${formData.backgroundImage})` }} />
                            <div className="relative z-10 p-6 flex flex-col h-full justify-center">
                                <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
                                <p className="text-sm mb-4">{formData.subtitle}</p>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                                        {formData.ctaPrimary}
                                    </span>
                                    <span className="bg-transparent border border-white text-white px-4 py-2 rounded-md text-sm font-medium">
                                        {formData.ctaSecondary}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold">{formData.studentsCount}</span> {formData.studentsText}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
};

export default HeroEditor;