import { BookAIcon, BookOpen, Edit, GlassWater, Globe, GraduationCap, Home, MessageCircle, Phone, Star, Tag, Users } from "lucide-react";


export const navItemsProfesor = [
  { name: 'Inicio', pathname: '/Classes', icon: <Home className="h-5 w-5" /> },
  { name: 'Descubrir Mas', pathname: '/ClassesTemplates', icon: <BookAIcon className="h-5 w-5" /> },
  { name: 'Profesores', pathname: '/Profesores', icon: <Users className="h-5 w-5" /> },
  { name: 'Estudiantes', pathname: '/Students', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Clases', pathname: '/Classes', icon: <BookOpen className="h-5 w-5" /> },
];

export const navItemsStudent = [
  { name: 'Inicio', pathname: '/MisClases', icon: <Home className="h-5 w-5" /> },
  { name: 'Profesores', pathname: '/Profesores', icon: <Users className="h-5 w-5" /> },
  { name: 'Estudiantes', pathname: '/Students', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Clases', pathname: '/Classes', icon: <BookOpen className="h-5 w-5" /> },
];

export const navItemsAdmin = [
  { name: 'Inicio', pathname: '/Admin', icon: <Home className="h-5 w-5" /> },
  { name: 'Profesores', pathname: '/Profesores', icon: <Users className="h-5 w-5" /> },
  { name: 'Estudiantes', pathname: '/Students', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Clases', pathname: '/Classes', icon: <BookOpen className="h-5 w-5" /> },
  {
    name: 'Sitio Web',
    icon: <Globe className="h-5 w-5" />,
    children: [
      { name: 'Web Site', pathname: '/WebSite', icon: <Home className="h-5 w-5" /> },
      { name: 'Sección Hero', pathname: '/Hero', icon: <Edit className="h-5 w-5" /> },
      { name: 'Características', pathname: '/Feactures', icon: <Tag className="h-5 w-5" /> },
      { name: 'Profesores', pathname: '/Teachers', icon: <Users className="h-5 w-5" /> },
      { name: 'Fomas de estudio', pathname: '/FormStudy', icon: <GlassWater className="h-5 w-5" /> },
      { name: 'Métodos de estudio', pathname: '/Methods', icon: <MessageCircle className="h-5 w-5" /> },
      { name: 'Precios', pathname: '/Pricing', icon: <Tag className="h-5 w-5" /> },
      { name: 'Reseñas', pathname: '/Reviews', icon: <Star className="h-5 w-5" /> },
      { name: 'Contacto', pathname: '/Contact', icon: <Phone className="h-5 w-5" /> },
    ],
  },
];