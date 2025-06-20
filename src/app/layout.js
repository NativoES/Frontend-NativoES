'use client'

import '@/styles/globals.css'
import { AppProvider } from '@/contexts/Context'
import NavbarAdmin from '@/components/NavbarAdmin'
import { usePathname } from 'next/navigation'
import AlertGlobal from '@/components/AlertGlobal'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  const showNavbar = pathname.startsWith('/Admin') || pathname.startsWith('/Classes') || pathname.startsWith('/AddExercice')

  return (
    <AppProvider>
      <html lang="es">
        <body>
          <div className="flex flex-col min-h-screen">
            {showNavbar && <NavbarAdmin />}
            <AlertGlobal />
            <main className="flex-1 bg-gray-100">{children}</main>
          </div>
        </body>
      </html>
    </AppProvider>
  )
}
