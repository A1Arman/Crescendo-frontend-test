import React from 'react';

export const RecipeContext = React.createContext({
    recipes: null,
    specials: null,
    addRecipe: () => {},
    updateRecipe: () => {}
});

export const RecipeContextProvider = RecipeContext.Provider;
export const RecipeContextConsumer = RecipeContext.Consumer;
