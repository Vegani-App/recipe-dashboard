// Función para obtener las 3 recetas featured (endpoint público)
// Endpoint: /.netlify/functions/get-featured
// Este endpoint es llamado por la app iOS

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  // Solo permitir GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Leer de Netlify Blobs
    const store = getStore('featured-recipes');
    const data = await store.get('current');

    if (!data) {
      // Si no hay datos, devolver array vacío
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
        },
        body: JSON.stringify({
          recipes: [],
          updatedAt: null
        })
      };
    }

    const parsedData = JSON.parse(data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
      },
      body: JSON.stringify(parsedData)
    };
  } catch (error) {
    console.error('Error getting featured recipes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to get featured recipes',
        message: error.message
      })
    };
  }
};
