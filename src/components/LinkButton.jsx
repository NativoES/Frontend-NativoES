import Link from 'next/link';
import React from 'react';

const Button = ({href, children, variant = "primary", className }) => {
    const baseStyles = "px-4 py-2 rounded text-black inline-block";
    const variants = {
        primary: "bg-[#FEAB5F] text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300",
        secondary: "bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded transition duration-300",
        danger: "bg-red-500 hover:bg-red-500 py-2 px-4 rounded transition duration-300",

    };

    return (
        <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </Link>
    );
};

export default Button;