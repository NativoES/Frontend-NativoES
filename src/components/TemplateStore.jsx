'use client'
import ImageProvider from '@/components/templates/ImageProvider';
import UploadAudio from '@/components/templates/UploadAudio';
import CompleteText from '@/components/CompleteText';
import OrderColumn from '@/components/OrderColumn';
import OrderText from '@/components/OrderText';
import SelectQuestions from '@/components/SelectQuestions';
import { useSearchParams } from 'next/navigation'
import CardTemplate from '@/components/CardTemplate';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';



export default function TemplateStore() {
    const searchParams = useSearchParams()
    const modal = searchParams.get('modal')
    console.log(modal)
    const router = useRouter()
    const pathname = usePathname()

    const templates = [
        {
            name: 'Plantilla de imagenes',
            img: '/demo.jpg'
        },
        {
            name: 'Plantilla de ',
            img: '/demo.jpg'
        },
        {
            name: 'Plantilla de ',
            img: '/demo.jpg',
            url:'/Admin'
        }
    ]

    function handlerPropagation(e) {
        e.stopPropagation()

    }
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const handlerModal = ( ) => {
        router.push(pathname + '?' + createQueryString('modal', 'fdsfs'))
    }
    return (

        modal === 'template' && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 " onClick={handlerModal}>
            <div className="relative bg-gray-200 p-6 rounded-lg w-full max-w-[800px] max-h-[70vh] overflow-y-auto" onClick={handlerPropagation}>
                <h2 className="text-2xl font-bold mb-4 text-black">Crea un nuevo ejercicio</h2>
                {modal === 'template' && <div className="grid grid-cols-2 gap-4 w-full max-w-[100%] ">
                    {templates.map(i => <CardTemplate data={i} />)}
                </div>
                }

         
                <button
                    className="flex items-center px-4 py-2 mt-3 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    )
}