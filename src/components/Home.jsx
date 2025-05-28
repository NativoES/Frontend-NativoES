import { redirect } from 'next/navigation';

export default function Home() {
  // Comprueba si el usuario está autenticado
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('userEmail');

  // Redirige al login si no está autenticado
  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Bienvenido a la página principal</h1>
    </div>
  );
}
