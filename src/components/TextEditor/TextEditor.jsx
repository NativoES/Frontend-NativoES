'use client'
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.core.css';
import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import 'react-quill-new/dist/quill.bubble.css'
import 'react-quill-new/dist/quill.core.css'
// import { ImageResize } from 'quill-image-resize-module-react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
const ImageResize = dynamic(() => import('quill-image-resize-module-react'), { ssr: false })
// const ReactQuill = dynamic(async () => await import("react-quill"), { ssr: false })

export default function TextEditor({ value, setValue, edit }) {

    useEffect(() => {
        // Dynamically import Quill and register the module
        if (typeof window !== 'undefined') {
            import('react-quill-new').then(({ Quill }) => {
                Quill.register('modules/imageResize', ImageResize)
            })
        }
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [modules, setModules] = useState({
        toolbar: [
            ['bold', 'italic', 'underline'],

            [{ 'size': ['small', '', 'large'] }],
            [{ 'align': '' }],
            [{ 'align': 'center' }],
            [{ 'align': 'right' }],
            [{ 'align': 'justify' }],
            ["link", 'image', "video"],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['clean']
        ],

    }
    );


    const [formats, setFormats] = useState([
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'header', 'blockquote', 'code-block',
        'indent', 'list',
        'direction', 'align',
        'link', 'image', 'video', 'formula',
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
    ]);

    useEffect(() => {
        setIsLoading(true)
    }, []);
    return isLoading && <div className='bg-white text-black z-50'>

        {
            edit
                ?
                <ReactQuill theme="snow" modules={modules}
                    formats={formats} value={value} onChange={setValue} />
                : ''
        }
    </div>
}