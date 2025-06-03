'use client'
import React from 'react';
import { useAppContext } from '@/contexts/Context';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Edit, Eye, Users, Star, Tag, MessageCircle, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const DashboardHome = () => {
  const { siteData } = useAppContext();
  const pathname =  usePathname()


    const navItems = [
    { name: 'Sección Hero', pathname: '/Hero', icon: <Edit className="h-5 w-5" />, active: pathname.includes('Hero') },
    { name: 'Características', pathname: '/Features', icon: <Tag className="h-5 w-5" />, active: pathname.includes('Heatures') },
    { name: 'Profesores', pathname: '/Teachers', icon: <Users className="h-5 w-5" />, active: pathname.includes('Teachers') },
    { name: 'Métodos de estudio', pathname: '/Methods', icon: <MessageCircle className="h-5 w-5" />, active: pathname.includes('Methods') },
    { name: 'Precios', pathname: '/Pricing', icon: <Tag className="h-5 w-5" />, active: pathname.includes('Pricing') },
    { name: 'Reseñas', pathname: '/Reviews', icon: <Star className="h-5 w-5" />, active: pathname.includes('Reviews') },
    { name: 'Contacto', pathname: '/Contact', icon: <Phone className="h-5 w-5" />, active: pathname.includes('Contact') },
  ];
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panel de control de NativoES</h2>
        <Button
          variant="primary"
          leftIcon={<Eye size={18} />}
          // onClick={previewSite}
        >
          Vista previa del sitio
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Resumen del sitio</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                <Tag size={18} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-300">Características</p>
                <p className="font-semibold">{siteData.features.items.length}</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg flex items-center space-x-3">
              <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full">
                <Users size={18} className="text-emerald-600 dark:text-emerald-300" />
              </div>
              <div>
                <p className="text-sm text-emerald-600 dark:text-emerald-300">Profesores</p>
                <p className="font-semibold">{siteData?.teachers?.profiles?.length}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center space-x-3">
              <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                <Star size={18} className="text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-amber-600 dark:text-amber-300">Reseñas</p>
                <p className="font-semibold">{siteData.reviews.items.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {navItems.map((section) => (
          <Card key={section.id} hover className="h-full">
            <CardContent className="p-5 h-full flex flex-col">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                  {section.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                {section.description}
              </p>
              <Link href={section.pathname}>
              <Button
                variant="outline"
                fullWidth
              >
                Editar
              </Button>
              
              </Link>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;



// import React from 'react';
// import Hero from '@/components/landing/Hero';
// import Navbar from '@/components/landing/Navbar';
// import Features from '@/components/landing/Features';
// import Teachers from '@/components/landing/Teachers';
// import StudyMethods from '@/components/landing/StudyMethods';
// import Pricing from '@/components/landing/Pricing';
// import Reviews from '@/components/landing/Reviews';
// import Contact from '@/components/landing/Contact';
// import Footer from '@/components/landing/Footer';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <Hero />
//       <Features />
//       <Teachers />
//       <StudyMethods />
//       <Pricing />
//       <Reviews />
//       <Contact />
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;