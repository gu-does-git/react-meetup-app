import { useState } from "react";
import { motion } from "framer-motion";
import ContentLoader from "react-content-loader";

function ImageSkeleton(props) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <div>
      {
        /* if the image is not loaded, show a skeleton to indicate that it's loading */
        !imageIsLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            variants={{
              true: { opacity: 0 },
              false: { opacity: 1 },
            }}
            animate={!imageIsLoaded.toString()}
            transition={{ duration: 0.5 }}
          >
            <ContentLoader
              speed={2}
              animate={true}
              height={320}
              style={{ width: "100%" }}
              backgroundColor="#333333"
              foregroundColor="#999999"
            >
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
        )
      }
      <motion.img
        initial={{ opacity: 0 }}
        variants={{
          true: { opacity: 1 },
          false: { opacity: 0 },
        }}
        animate={imageIsLoaded.toString()}
        transition={{ duration: 0.5 }}
        src={props.src}
        alt={props.alt}
        onLoad={() => {
          setImageIsLoaded(true);
        }}
      />
    </div>
  );
}

export default ImageSkeleton;
