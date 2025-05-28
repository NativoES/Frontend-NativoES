'use client'

import '@/styles/globals.css';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import NavbarAdmin from "@/components/NavbarAdmin"
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';
import { useAppContext} from '@/contexts/Context';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { loader } = useAppContext()
  return (

    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardLayout2>
           <main >{children}</main>
      </DashboardLayout2>
      {/* {loader !== "" && <Loader></Loader>}
      {pathname.startsWith('/Admin') && <NavbarAdmin />}
      {pathname.startsWith('/Student') && <NavbarAdmin />}
      {pathname.startsWith('/Classes') && <NavbarAdmin />}
      {pathname.startsWith('/AddExercice') && <NavbarAdmin />} */}

   
    </div>

  );
}
