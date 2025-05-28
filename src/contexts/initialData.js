
export const initialData = {
  navigation: [
    { title: 'Sobre Nosotros', href: '#about' },
    { title: 'Profesores', href: '#teachers' },
    { title: 'Servicios', href: '#services' },
    { title: 'Precios', href: '#pricing' },
    { title: 'Reseñas', href: '#reviews' },
    { title: 'Contactos', href: '#contact' }
  ],
  hero: {
    title: 'Aprende Español Naturalmente',
    subtitle: 'Alcanza la fluidez que buscas y abrete nuevas oportunidades en el entorno internacional con nuestra plataforma moderna.',
    ctaPrimary: 'Test de nivel',
    ctaSecondary: 'Clase gratuita',
    studentsCount: '1,234',
    studentsText: 'students online',
    backgroundImage: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg'
  },
  features: {
    title: 'Nuestro modo de trabajo',
    subtitle: 'Descubre cómo funciona nuestra metodología única',
    items: [
      {
        id: '1',
        title: 'Plataformas interactivas',
        description: 'Todas las sesiones de nuestros cursos en linea se llevan a cabo en nuestra plataformas interactiva',
        icon: 'monitor'
      },
      {
        id: '2',
        title: 'Ejercicios divertidos',
        description: 'Sin tareas aburridas, libros de texto, solo ejercicios y juegos divertidos.',
        icon: 'puzzle'
      },
      {
        id: '3',
        title: 'Mostrar como se trabajan',
        description: 'Enseñar todas la herramientas en forma de capsulas con titulo pequeño, texto y una foto o video.',
        icon: 'video'
      }
    ]
  },
  teachers: {
    title: 'Nuestros profesores',
    subtitle: 'Expertos nativos que te guiarán en tu aprendizaje',
    profiles: [
      {
        id: '1',
        name: 'María González',
        role: 'Profesora de Español',
        bio: 'Experta en conversación y gramática con 5 años de experiencia.',
        image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg'
      },
      {
        id: '2',
        name: 'Carlos Rodríguez',
        role: 'Profesor de Español',
        bio: 'Especialista en literatura y cultura hispana.',
        image: 'https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg'
      },
      {
        id: '3',
        name: 'Laura Martínez',
        role: 'Profesora de Español',
        bio: 'Enfocada en enseñanza de español para negocios.',
        image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg'
      }
    ]
  },
  methods: {
    title: 'Formas de estudio',
    subtitle: 'Metodologías adaptadas a tus necesidades',
    items: [
      {
        id: '1',
        title: 'Clases individuales',
        description: 'Sesiones personalizadas con atención exclusiva del profesor.',
        icon: 'user'
      },
      {
        id: '2',
        title: 'Clases grupales',
        description: 'Aprende en un ambiente colaborativo con otros estudiantes.',
        icon: 'users'
      },
      {
        id: '3',
        title: 'Práctica de conversación',
        description: 'Sesiones diseñadas para mejorar tu fluidez verbal.',
        icon: 'message-circle'
      },
      {
        id: '4',
        title: 'Cursos intensivos',
        description: 'Programas acelerados para un aprendizaje más rápido.',
        icon: 'zap'
      }
    ]
  },
  pricing: {
    title: 'Precios',
    subtitle: 'Planes adaptados a tus necesidades',
    tiers: [
      {
        id: '1',
        title: 'Individual',
        price: '2750',
        discountPrice: '2500',
        features: [
          'Clases en Skype o Google Meet',
          'Material didáctico personalizado',
          'Acceso a plataforma interactiva',
          'Programa según tus objetivos',
          'Horarios flexibles'
        ],
        cta: 'Reserva tu clase'
      },
      {
        id: '2',
        title: 'Pareja',
        price: '4500',
        discountPrice: '4000',
        features: [
          'Clases para dos personas',
          'Material didáctico compartido',
          'Acceso a plataforma interactiva',
          'Programa según objetivos comunes',
          'Horarios coordinados'
        ],
        cta: 'Reserva tu clase',
        isPopular: true
      },
      {
        id: '3',
        title: 'Grupo',
        price: '1800',
        discountPrice: '1500',
        features: [
          'Clases para 3-5 personas',
          'Material didáctico compartido',
          'Acceso a plataforma interactiva',
          'Programa estándar con adaptaciones',
          'Horarios preestablecidos'
        ],
        cta: 'Reserva tu clase'
      }
    ]
  },
  reviews: {
    title: 'Reseñas',
    subtitle: 'Lo que dicen nuestros estudiantes',
    items: [
      {
        id: '1',
        author: 'Ana K.',
        content: 'Las clases son muy dinámicas y realmente he mejorado mi español en poco tiempo.',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      },
      {
        id: '2',
        author: 'Michael P.',
        content: 'Los profesores son excelentes y la metodología es muy efectiva.',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      {
        id: '3',
        author: 'Sophia R.',
        content: 'Estoy muy satisfecha con mi progreso. Recomiendo totalmente esta escuela.',
        rating: 4,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ]
  },
  contact: {
    phone: '+123 456 789 456',
    email: 'info@nativoes.com',
    hours: {
      monday: '8:00 AM - 20:00 PM',
      tuesday: '8:00 AM - 20:00 PM',
      wednesday: '8:00 AM - 20:00 PM',
      thursday: '8:00 AM - 20:00 PM',
      friday: '8:00 AM - 20:00 PM',
      saturday: '8:00 AM - 16:00 PM',
      sunday: 'Cerrado'
    }
  },
  footer: {
    logo: 'NativoES',
    description: 'Potencia la comunicación global a través de la educación de idiomas por parte de expertos.',
    socialLinks: [
      { platform: 'facebook', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'twitter', url: '#' }
    ],
    copyright: '© 2024 NativoES. All rights reserved.'
  }
};