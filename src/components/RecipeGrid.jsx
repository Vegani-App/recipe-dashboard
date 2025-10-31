import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeGrid.css';

function RecipeGrid({ recipes, selectedRecipes, onSelectRecipe }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSelected={selectedRecipes.some(r => r.id === recipe.id)}
          onSelect={onSelectRecipe}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
