import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  const [isLoading, setIsloading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsloading(true);
    fetch("https://react-meetup-41bc2-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Transforma os dados antes de atribuir o valor (Array to Object)
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
        setLoadedMeetups(meetups);

        setIsloading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups}></MeetupList>
    </section>
  );
}

export default AllMeetupsPage;
