import React from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, isSelected, onSelect }) {
  return (
    <div
      className={`recipe-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(recipe)}
    >
      <div className="recipe-image-container">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image"
        />
        {isSelected && (
          <div className="selected-badge">
            ✓ Selected
          </div>
        )}
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-meta">
          {recipe.readyInMinutes && (
            <span className="meta-item">
              ⏱ {recipe.readyInMinutes} min
            </span>
          )}
          {recipe.servings && (
            <span className="meta-item">
              👥 {recipe.servings} servings
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
