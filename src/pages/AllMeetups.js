import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import ContentLoader from "react-content-loader";

function AllMeetupsPage() {
  const runCallback = (cb) => {
    return cb();
  };
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

  let content;
  if (isLoading) {
    content = (
      <section>
        <h1>All Meetups</h1>
        {runCallback(() => {
          const row = [];
          for (var i = 0; i < 10; i++) {
            row.push(
              <ContentLoader
                key={i}
                speed={2}
                height={620}
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
            );
          }
          return row;
        })}
      </section>
    );
  } else {
    content = (
      <section>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetups}></MeetupList>
      </section>
    );
  }
  return content;
}

export default AllMeetupsPage;
