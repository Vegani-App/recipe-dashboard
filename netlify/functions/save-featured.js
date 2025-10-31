// Función para guardar las 3 recetas featured en Netlify Blobs
// Endpoint: /.netlify/functions/save-featured (POST)

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  // Solo permitir POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const recipes = JSON.parse(event.body);

    // Validar que sean exactamente 3 recetas
    if (!Array.isArray(recipes) || recipes.length !== 3) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Must provide exactly 3 recipes' })
      };
    }

    // Validar estructura de cada receta
    for (const recipe of recipes) {
      if (!recipe.id || !recipe.title || !recipe.image) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: 'Each recipe must have id, title, and image'
          })
        };
      }
    }

    // Guardar en Netlify Blobs con credenciales explícitas
    const store = getStore('featured-recipes', {
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN
    });

    await store.set('current', JSON.stringify({
      recipes,
      updatedAt: new Date().toISOString()
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Featured recipes saved successfully',
        recipes
      })
    };
  } catch (error) {
    console.error('Error saving featured recipes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to save featured recipes',
        message: error.message
      })
    };
  }
};
