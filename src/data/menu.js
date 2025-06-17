import { BookOpen, Globe, GraduationCap, Home, Users } from "lucide-react";


export const navItemsProfesor = [
  { name: 'Inicio', pathname: '/Classes', icon: <Home className="h-5 w-5" /> },
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
  { name: 'Sitio Web', pathname: '/WebSite', icon: <Globe className="h-5 w-5" /> },
];