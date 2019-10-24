import React from 'react';

export const SpecialsContext = React.createContext({
    specials: null,
    recipes: null,
    addSpecial: () => {},
    updateSpecial: () => {}
});

export const SpecialsContextProvider = SpecialsContext.Provider;
export const SpecialsContextConsumer = SpecialsContext.Consumer;
