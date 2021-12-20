import { createContext, useState } from "react";

/* favorites context creation */
const FavoritesContext = createContext({
  favorites: [],
  total: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

/* context provider */
export function FavoritesContextProvider(props) {
  /* state that'll be used to store temporary favorites items */
  const [userFavorites, setUserFavorites] = useState([]);

  /* temporary context accessible to provider */
  const context = {
    favorites: userFavorites,
    total: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  /* function to handle the add favorite action */
  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  /* function to handle the remove favorite action */
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  /* aux. function to answer if the item is favorite */
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
