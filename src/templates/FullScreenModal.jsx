import { useAppContext } from "@/contexts/Context";

export default function FullScreenModal({ children, className = '' }) {
  const { setSelect, setIsOpenModal } = useAppContext();

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center"
      onClick={() => { setSelect(false); setIsOpenModal(""); }}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-h-[90vh] w-[90%] p-5 max-w-7xl overflow-hidden flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
