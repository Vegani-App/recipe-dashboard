import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import FeaturedPanel from './components/FeaturedPanel';
import './App.css';

function App() {
  const [allRecipes, setAllRecipes] = useState([]); // Todas las recetas cargadas
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Recetas filtradas por búsqueda
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 30;

  // Cargar recetas al iniciar
  useEffect(() => {
    loadCurrentFeatured();
    loadInitialRecipes();
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

  const loadInitialRecipes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Spoonacular permite máximo 100 resultados por request
      const response = await fetch(
        '/.netlify/functions/search-recipes?query=vegan&number=100'
      );

      if (!response.ok) {
        throw new Error('Error loading recipes');
      }

      const data = await response.json();
      setAllRecipes(data.results || []);
      setFilteredRecipes(data.results || []);
    } catch (err) {
      setError(err.message);
      setAllRecipes([]);
      setFilteredRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    // Filtrar localmente sin llamar a la API
    if (!query.trim()) {
      setFilteredRecipes(allRecipes);
      setCurrentPage(1);
      return;
    }

    const filtered = allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  const handleSelectRecipe = (recipe) => {
    if (selectedRecipes.find(r => r.id === recipe.id)) {
      // Si ya está seleccionada, la quitamos
      setSelectedRecipes(selectedRecipes.filter(r => r.id !== recipe.id));
    } else if (selectedRecipes.length < 3) {
      // Si no está y hay espacio, la agregamos
      setSelectedRecipes([...selectedRecipes, recipe]);
    } else {
      // If already 3, show error
      setError('You can only select 3 recipes');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePublish = async () => {
    if (selectedRecipes.length !== 3) {
      setError('You must select exactly 3 recipes');
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
        throw new Error('Error publishing recipes');
      }

      const data = await response.json();
      setSuccessMessage('Recipes published successfully! The app will update in a few minutes.');

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
        <p>Search and select 3 recipes to feature in the app</p>
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
              <p>Loading recipes...</p>
            </div>
          )}

          {!isLoading && filteredRecipes.length > 0 && (
            <>
              <div className="recipes-count">
                Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
              </div>
              <RecipeGrid
                recipes={filteredRecipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage)}
                selectedRecipes={selectedRecipes}
                onSelectRecipe={handleSelectRecipe}
              />
              {filteredRecipes.length > recipesPerPage && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    ← Previous
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {Math.ceil(filteredRecipes.length / recipesPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredRecipes.length / recipesPerPage), prev + 1))}
                    disabled={currentPage >= Math.ceil(filteredRecipes.length / recipesPerPage)}
                    className="pagination-button"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}

          {!isLoading && filteredRecipes.length === 0 && allRecipes.length > 0 && (
            <div className="empty-state">
              <p>No recipes found. Try a different search term.</p>
            </div>
          )}

          {!isLoading && allRecipes.length === 0 && !error && (
            <div className="empty-state">
              <p>No recipes loaded yet.</p>
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
