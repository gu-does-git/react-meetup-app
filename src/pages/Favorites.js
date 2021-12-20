import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";

function FavoritesPage() {
  /* favorites context */
  const favoriteCtx = useContext(FavoritesContext);

  if (favoriteCtx.total === 0) {
    /* if there isn't a favorite to show, show a message instead */
    return (
      <section>
        <h1>My Favorites</h1>
        <h2>You got no favorites</h2>
      </section>
    );
  } else {
    return (
      <section>
        <h1>My Favorites</h1>
        <MeetupList meetups={favoriteCtx.favorites} />
      </section>
    );
  }
}

export default FavoritesPage;
