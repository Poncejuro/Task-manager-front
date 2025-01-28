export const LoginService = async (username, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas o error en la solicitud');
    }

    const data = await response.json();

    return {
      message: 'Login exitoso',
      token: data.access_token, 
      token_type: data.token_type, 
    };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
