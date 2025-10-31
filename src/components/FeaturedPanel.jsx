import React from 'react';
import './FeaturedPanel.css';

function FeaturedPanel({ selectedRecipes, onRemove, onPublish, isLoading }) {
  return (
    <div className="featured-panel">
      <div className="featured-header">
        <h2>Featured Recipes</h2>
        <span className="count-badge">
          {selectedRecipes.length} / 3
        </span>
      </div>

      {selectedRecipes.length === 0 ? (
        <div className="empty-featured">
          <p>Select 3 recipes from the search results</p>
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
                title="Remove"
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
        {isLoading ? 'Publishing...' : 'Publish to App'}
      </button>

      {selectedRecipes.length < 3 && selectedRecipes.length > 0 && (
        <p className="hint">
          Select {3 - selectedRecipes.length} more recipe{3 - selectedRecipes.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default FeaturedPanel;
