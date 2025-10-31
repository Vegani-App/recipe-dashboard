// Función para buscar recetas en Spoonacular API
// Endpoint: /.netlify/functions/search-recipes?query=tacos&number=20

exports.handler = async (event) => {
  // Solo permitir GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { query = '', number = 20, offset = 0 } = event.queryStringParameters || {};

  // Validar que hay una query
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Query parameter is required' })
    };
  }

  // API key de Spoonacular desde variables de entorno
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  try {
    // Llamar a Spoonacular API
    const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
    url.searchParams.append('query', query);
    url.searchParams.append('number', number);
    url.searchParams.append('offset', offset);
    url.searchParams.append('diet', 'vegan');
    url.searchParams.append('addRecipeInformation', 'true');
    url.searchParams.append('fillIngredients', 'true');
    url.searchParams.append('apiKey', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error calling Spoonacular API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch recipes',
        message: error.message
      })
    };
  }
};
