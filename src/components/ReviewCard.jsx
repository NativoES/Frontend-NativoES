import React from 'react';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Trash, Move, Star } from 'lucide-react';

const RatingSelector = ({ rating, onChange }) => (
    <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(value => (
            <button key={value} type="button" onClick={() => onChange(value)} className="p-1">
                <Star
                    size={20}
                    className={value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
            </button>
        ))}
    </div>
);

const ReviewCard = ({ review, index, onChange, onChangeRespuesta, onAvatarChange, onMove, onRemove }) => {
    const updateAvatarFile = (index, file) => {
        if (!(file instanceof File)) return;

        const updated = [...formData];
        updated[index].avatarFile = file;
        updated[index].avatarUrl = URL.createObjectURL(file); // vista previa
        setFormData(updated);
    };



    return (
        <Card>
            <CardHeader className="flex items-center justify-between py-3">
                <span className="font-medium">{review.nombre || 'Sin nombre'}</span>
                <div className="flex gap-2">
                    <button type="button" disabled={index === 0} onClick={() => onMove(index, 'up')}>
                        <Move size={16} className="rotate-90 text-gray-500" />
                    </button>
                    <button
                        type="button"
                        disabled={index === undefined}
                        onClick={() => onMove(index, 'down')}
                    >
                        <Move size={16} className="-rotate-90 text-gray-500" />
                    </button>
                    <button type="button" onClick={() => onRemove(index)}>
                        <Trash size={16} className="text-red-500" />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                    <div>
                        <img
                            src={review.avatarUrl || '/no-image.png'}
                            alt="Avatar preview"
                            className="w-24 h-24 object-cover rounded mb-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target?.files?.[0];
                                if (file) onAvatarChange(index, file);
                            }}
                        />
                    </div>



                    <div className="mt-2">
                        <label className="text-sm">Calificación</label>
                        <RatingSelector
                            rating={review.calificacion ?? 0}
                            onChange={(value) => onChange(index, 'calificacion', value)}
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                    <Input
                        label="Nombre"
                        value={review.nombre}
                        onChange={(e) => onChange(index, 'nombre', e.target.value)}
                        fullWidth
                    />
                    <Textarea
                        label="Contenido"
                        value={review.contenido}
                        onChange={(e) => onChange(index, 'contenido', e.target.value)}
                        rows={4}
                        fullWidth
                    />
                </div>

                <div className="md:col-span-3 space-y-3">
                    <h4 className="text-sm font-semibold">Respuesta</h4>
                    <Input
                        label="Autor"
                        value={review.respuestas?.autor || ''}
                        onChange={(e) => onChangeRespuesta(index, 'autor', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Texto"
                        value={review.respuestas?.texto || ''}
                        onChange={(e) => onChangeRespuesta(index, 'texto', e.target.value)}
                        fullWidth
                    />
                    <Textarea
                        label="Contenido"
                        value={review.respuestas?.contenido || ''}
                        onChange={(e) => onChangeRespuesta(index, 'contenido', e.target.value)}
                        rows={3}
                        fullWidth
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
