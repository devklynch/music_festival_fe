import "./ScheduleDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Shows from "../Shows/Shows";

function ScheduleDetails() {
  const { schedule_id } = useParams();
  console.log(schedule_id);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

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

  const sortShows = (event) => {
    const [sortBy, order] = event.target.value.split(",");
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    setIsLoading(true);
    fetchShows(sortBy, order);
  };

  if (isLoading) {
    return <p>Loading schedules</p>;
  }

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
        const [sortBy, order] = sortOption.split(",");
        fetchShows(sortBy, order);
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

  const goHome = () => {
    navigate("/schedules");
  };

  return (
    <div className="full-show-page">
      <header className="schedule-header">
        <div clasName="header-titles">
          <h1>{schedule.attributes.title}</h1>
          <h2>Date:{schedule.attributes.date}</h2>
        </div>
        <button onClick={goHome} className="home-btn" aria-labelledby="Home">
          Go Home
        </button>
      </header>
      <div className="sort-dropdown">
        <label>Sort Shows: </label>
        <select id="sortOptions" onChange={sortShows} value={sortOption}>
          <option value="">Sort Options</option>
          <option value="start_time,asc">
            Start Time (Earliest to Latest)
          </option>
          <option value="start_time,desc">
            Start Time (Latest to Earliest)
          </option>
          <option value="artist,asc">Artist Name (A-Z)</option>
          <option value="artist,desc">Artist Name (Z-A)</option>
        </select>
      </div>
      <section className="show-container">{showList}</section>
    </div>
  );
}

export default ScheduleDetails;
