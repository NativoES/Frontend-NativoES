// InputTemplate.js
export const InputTemplate = ({name, value, onChange, className, placeholder }) => (
    <input
      type="text"
      name={name}
      className={`border-b outline-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F] ${className}`}
      placeholder={placeholder || 'Completar'}
      value={value}
      onChange={onChange}
    />
  );
  export default InputTemplate;
