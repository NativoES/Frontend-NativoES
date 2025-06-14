import { useAppContext } from "@/contexts/Context";

export const ModalTemplate = ({ children, className }) => {

    const { setSelect, setIsOpenModal } = useAppContext()

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center backdrop-blur-lg duration-500 z-50 transition-all ${className}`}
            onClick={() => { setSelect(false); setIsOpenModal(false) }}
        >
            <div className="flex flex-col justify-center relative bg-white p-4 rounded-lg shadow-md w-1/2 min-w-[500px] max-w-[800px]  h-[90%] max-h-[600px] overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                {children}
                {/* <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✖
      </button> */}
            </div>
        </div>
    )
};