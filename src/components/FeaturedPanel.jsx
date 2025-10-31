import React from 'react';
import './FeaturedPanel.css';

function FeaturedPanel({ selectedRecipes, onRemove, onPublish, isLoading }) {
  return (
    <div className="featured-panel">
      <div className="featured-header">
        <h2>Recetas Destacadas</h2>
        <span className="count-badge">
          {selectedRecipes.length} / 3
        </span>
      </div>

      {selectedRecipes.length === 0 ? (
        <div className="empty-featured">
          <p>Selecciona 3 recetas de los resultados de búsqueda</p>
        </div>
      ) : (
        <div className="featured-list">
          {selectedRecipes.map((recipe, index) => (
            <div key={recipe.id} className="featured-item">
              <span className="position-number">{index + 1}</span>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="featured-image"
              />
              <div className="featured-info">
                <h4>{recipe.title}</h4>
                {recipe.readyInMinutes && (
                  <span className="time">⏱ {recipe.readyInMinutes} min</span>
                )}
              </div>
              <button
                className="remove-button"
                onClick={() => onRemove(recipe.id)}
                title="Quitar"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="publish-button"
        onClick={onPublish}
        disabled={selectedRecipes.length !== 3 || isLoading}
      >
        {isLoading ? 'Publicando...' : 'Publicar en la App'}
      </button>

      {selectedRecipes.length < 3 && selectedRecipes.length > 0 && (
        <p className="hint">
          Selecciona {3 - selectedRecipes.length} receta{3 - selectedRecipes.length > 1 ? 's' : ''} más
        </p>
      )}
    </div>
  );
}

export default FeaturedPanel;
