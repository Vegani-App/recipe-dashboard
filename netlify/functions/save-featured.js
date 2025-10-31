// Función para guardar las 3 recetas featured en Netlify Blobs
// Endpoint: /.netlify/functions/save-featured (POST)

import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  // Solo permitir POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const recipes = await req.json();

    // Validar que sean exactamente 3 recetas
    if (!Array.isArray(recipes) || recipes.length !== 3) {
      return new Response(JSON.stringify({ error: 'Must provide exactly 3 recipes' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar estructura de cada receta
    for (const recipe of recipes) {
      if (!recipe.id || !recipe.title || !recipe.image) {
        return new Response(JSON.stringify({
          error: 'Each recipe must have id, title, and image'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Guardar en Netlify Blobs (v2 configura automáticamente)
    const store = getStore('featured-recipes');

    await store.set('current', JSON.stringify({
      recipes,
      updatedAt: new Date().toISOString()
    }));

    return new Response(JSON.stringify({
      success: true,
      message: 'Featured recipes saved successfully',
      recipes
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error saving featured recipes:', error);
    return new Response(JSON.stringify({
      error: 'Failed to save featured recipes',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
