// Función para buscar recetas en Spoonacular API
// Endpoint: /.netlify/functions/search-recipes?query=tacos&number=20

export default async (req, context) => {
  // Solo permitir GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(req.url);
  const query = url.searchParams.get('query') || '';
  const number = url.searchParams.get('number') || '20';
  const offset = url.searchParams.get('offset') || '0';

  // Validar que hay una query
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // API key de Spoonacular desde variables de entorno
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Llamar a Spoonacular API
    const apiUrl = new URL('https://api.spoonacular.com/recipes/complexSearch');
    apiUrl.searchParams.append('query', query);
    apiUrl.searchParams.append('number', number);
    apiUrl.searchParams.append('offset', offset);
    apiUrl.searchParams.append('diet', 'vegan');
    apiUrl.searchParams.append('addRecipeInformation', 'true');
    apiUrl.searchParams.append('fillIngredients', 'true');
    apiUrl.searchParams.append('apiKey', apiKey);

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error calling Spoonacular API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch recipes',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
