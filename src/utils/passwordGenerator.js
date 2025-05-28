export function passwordGenerator(longitud = 12) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    let contrasena = '';
    
    // Asegurarse de que la longitud sea un número válido
    if (longitud < 8) {
      console.log('La longitud mínima de la contraseña debe ser 8 caracteres.');
      return;
    }
  
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      contrasena += caracteres[indiceAleatorio];
    }
    
    return contrasena;
  }