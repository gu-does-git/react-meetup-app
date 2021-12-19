import { useContext, useState } from "react";
import FavoritesContext from "../../store/favorites-context";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import LazyLoad from "react-lazyload";
import ContentLoader from "react-content-loader";
import { motion, useMotionValue, useTransform } from "framer-motion";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  function handleImageLoaded() {
    setImageIsLoaded(true);
  }

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
            {!imageIsLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                variants={{
                  true: { opacity: 0 },
                  false: { opacity: 1 },
                }}
                animate={!imageIsLoaded.toString()}
                transition={{ duration: 0.5 }}
              >
                <ContentLoader speed={2} height={320} style={{ width: "100%" }}>
                  <rect
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    height="320"
                    style={{ width: "100%" }}
                  />
                </ContentLoader>
              </motion.div>
            )}
            <motion.img
              initial={{ opacity: 0 }}
              variants={{
                true: { opacity: 1 },
                false: { opacity: 0 },
              }}
              animate={imageIsLoaded.toString()}
              transition={{ duration: 0.5 }}
              src={props.image}
              alt={props.title}
              onLoad={handleImageLoaded}
            />
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
