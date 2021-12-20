import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import MeetupSkeletonList from "../components/meetups/MeetupListSkeleton";

function AllMeetupsPage() {
  const [isLoading, setIsloading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  /* using the useEffect() with empty array to stop infinite requests */
  useEffect(() => {
    /* fetch the meetups from outside database */
    fetch("https://react-meetup-41bc2-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        /* transform the data before adding it */
        const meetups = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = {
              id: key,
              ...data[key],
            };
            meetups.push(element);
          }
        }

        /* setting the data */
        setLoadedMeetups(meetups);

        /* disabling the Loading state */
        setIsloading(false);
      });
  }, []);

  if (isLoading) {
    /* if the HTTP request is loading, show the skeleton list to indicate loading */
    return (
      <section>
        <h1>All Meetups</h1>
        <MeetupSkeletonList count={10} />
      </section>
    );
  } else {
    /* once the request has loaded, show the loaded Meetups */
    return (
      <section>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetups}></MeetupList>
      </section>
    );
  }
}

export default AllMeetupsPage;
