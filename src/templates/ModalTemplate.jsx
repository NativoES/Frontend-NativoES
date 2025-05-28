import { useAppContext
 } from '@/contexts/Context';


export default function ModalTemplate({ children, className }) {
    const { setSelect, setIsOpenModal } = useAppContext
()

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-500  flex justify-center items-center backdrop-blur-lg  duration-500 z-50 transition-all ${className}`}
            onClick={() => { setSelect(false); setIsOpenModal("") }}
        >
            <div className="flex flex-col justify-center relative bg-white rounded-lg shadow-md w-1/2 min-w-[500px] max-w-[800px]  px-[30px] py-[40px] max-h-[100vh] overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
