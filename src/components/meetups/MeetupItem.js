import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

import FavoritesContext from "../../store/favorites-context";
import LazyLoad from "react-lazyload";
import ImageSkeleton from "./ImageSkeleton";

import { useContext } from "react";

function MeetupItem(props) {
  /* import the Favorite Context */
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  /* function to handle the toggling of the favorite state */
  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <LazyLoad height={320} once offset={200}>
            <ImageSkeleton src={props.image} alt={props.title} />
          </LazyLoad>
        </div>
        <div className={classes.content}>
          <h3>{props.description}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
