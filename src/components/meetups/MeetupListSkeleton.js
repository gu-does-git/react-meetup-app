import ContentLoader from "react-content-loader";

function MeetupListSkeleton(props) {
  /* Creating an auxiliary array to loop later */
  var counterArr = Array.from({ length: props.count }, (e, i) => {
    return i;
  });

  /* Iterating on the auxiliary array and returning skeletons according to it */
  return (
    <div>
      {counterArr.map((i) => (
        <ContentLoader
          key={"skeleton" + i}
          animate={true}
          speed={2}
          height={620}
          backgroundColor="#333333"
          foregroundColor="#999999"
          style={{ width: "100%" }}
        >
          <rect x="0" y="350" rx="4" ry="4" width="200" height="13" />
          <rect x="0" y="375" rx="4" ry="4" width="120" height="8" />
          <rect x="0" y="395" rx="4" ry="4" width="100" height="8" />
          <rect x="0" y="430" rx="4" ry="4" width="150" height="40" />
          <rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            height="320"
            style={{ width: "100%" }}
          />
        </ContentLoader>
      ))}
    </div>
  );
}

export default MeetupListSkeleton;
