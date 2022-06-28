import React from 'react';

const AppContext = React.createContext<{
  store?: Store;
  actions?: {
    getLikedCats: () => Cat[];
    getAllCats: () => Cat[];
    likeCat: (id: string) => void;
    unlikeCat: (id: string) => void;
    checkIsLiked: (id: string) => boolean;
  };
}>({});

export {AppContext};
