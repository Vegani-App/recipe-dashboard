import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import FeaturedPanel from './components/FeaturedPanel';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Cargar las recetas featured actuales al iniciar
  useEffect(() => {
    loadCurrentFeatured();
  }, []);

  const loadCurrentFeatured = async () => {
    try {
      const response = await fetch('/.netlify/functions/get-featured');
      const data = await response.json();
      if (data.recipes && data.recipes.length > 0) {
        setSelectedRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error loading current featured:', error);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/.netlify/functions/search-recipes?query=${encodeURIComponent(query)}&number=20`
      );

      if (!response.ok) {
        throw new Error('Error al buscar recetas');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipe = (recipe) => {
    if (selectedRecipes.find(r => r.id === recipe.id)) {
      // Si ya está seleccionada, la quitamos
      setSelectedRecipes(selectedRecipes.filter(r => r.id !== recipe.id));
    } else if (selectedRecipes.length < 3) {
      // Si no está y hay espacio, la agregamos
      setSelectedRecipes([...selectedRecipes, recipe]);
    } else {
      // Si ya hay 3, mostramos un error
      setError('Solo puedes seleccionar 3 recetas');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePublish = async () => {
    if (selectedRecipes.length !== 3) {
      setError('Debes seleccionar exactamente 3 recetas');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/.netlify/functions/save-featured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRecipes),
      });

      if (!response.ok) {
        throw new Error('Error al publicar recetas');
      }

      const data = await response.json();
      setSuccessMessage('¡Recetas publicadas exitosamente! La app se actualizará en unos minutos.');

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 VeganMaps Featured Recipes</h1>
        <p>Busca y selecciona 3 recetas para destacar en la app</p>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}

          {isLoading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Buscando recetas...</p>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <RecipeGrid
              recipes={searchResults}
              selectedRecipes={selectedRecipes}
              onSelectRecipe={handleSelectRecipe}
            />
          )}

          {!isLoading && searchResults.length === 0 && !error && (
            <div className="empty-state">
              <p>Busca recetas veganas para comenzar</p>
            </div>
          )}
        </div>

        <FeaturedPanel
          selectedRecipes={selectedRecipes}
          onRemove={(id) => setSelectedRecipes(selectedRecipes.filter(r => r.id !== id))}
          onPublish={handlePublish}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
