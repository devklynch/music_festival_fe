import "./ScheduleDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Shows from "../Shows/Shows";

function ScheduleDetails() {
  const { schedule_id } = useParams();
  console.log(schedule_id);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchShows = async (sortBy = null, order = null) => {
    try {
      let url = `http://localhost:3000/api/v1/schedules/${schedule_id}`;
      if (sortBy && order) {
        url += `?sort_by=${sortBy}&order=${order}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setSchedule(data.data[0]);
        console.log("All Shows", data.data[0].attributes.shows);
      } else {
        throw new Error(
          "Error fetching shows, please try again in a few minutes"
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (isLoading) {
    return <p>Loading schedules</p>;
  }

  const sortShows = (sortBy, order) => {
    setIsLoading(true);
    fetchShows(sortBy, order);
  };

  const removeShow = async (show_id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/schedules/${schedule_id}/shows/${show_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          attributes: {
            ...prevSchedule.attributes,
            shows: prevSchedule.attributes.shows.filter(
              (show) => show.id !== show_id
            ),
          },
        }));
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to remove show. Please try again."
        );
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };
  const showList = schedule.attributes.shows.map((show) => {
    return (
      <Shows
        artist={show.artist}
        location={show.location}
        start_time={show.start_time}
        end_time={show.end_time}
        show_id={show.id}
        removeShow={removeShow}
        fetchShows={fetchShows}
      />
    );
  });

  return (
    <div>
      <h3>{schedule.attributes.title}</h3>
      <h4>Date:{schedule.attributes.date}</h4>
      <div className="sort-buttons">
        <button onClick={() => sortShows("start_time", "asc")}>
          Sort by Start Time (Earliest to Latest)
        </button>
        <button onClick={() => sortShows("start_time", "desc")}>
          Sort by Start Time (Latest to Earliest)
        </button>
        <button onClick={() => sortShows("artist", "asc")}>
          Sort by Artist Name (A-Z)
        </button>
        <button onClick={() => sortShows("artist", "desc")}>
          Sort by Artist Name (Z-A)
        </button>
      </div>
      <section className="show-container">{showList}</section>
    </div>
  );
}

export default ScheduleDetails;
