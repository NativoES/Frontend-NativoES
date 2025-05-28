// ButtonTemplate.js
import Link from 'next/link';

export const ButtonTemplate = ({ href, text, className }) => (
  <Link href={href}>
    <button
      className={`flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 ${className}`}
    >
      {text}
    </button>
  </Link>
);

// export default ButtonTemplate; 