// Función para obtener las 3 recetas featured (endpoint público)
// Endpoint: /.netlify/functions/get-featured
// Este endpoint es llamado por la app iOS

import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  // Solo permitir GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Leer de Netlify Blobs (v2 configura automáticamente)
    const store = getStore('featured-recipes');
    const data = await store.get('current');

    if (!data) {
      // Si no hay datos, devolver array vacío
      return new Response(JSON.stringify({
        recipes: [],
        updatedAt: null
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
        }
      });
    }

    const parsedData = JSON.parse(data);

    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
      }
    });
  } catch (error) {
    console.error('Error getting featured recipes:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get featured recipes',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
