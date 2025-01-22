import "./Main.css";
import { useState, useEffect } from "react";
import Container from "../Container/Container";

function Main() {
  const [allSchedules, setAllSchedules] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllSchedules = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/schedules");
      if (response.ok) {
        const data = await response.json();
        setAllSchedules(data.data);
        //console.log("All Schedules", Array.isArray(data.data));
      } else {
        throw new Error(
          "Error fetching all schedules, please try again in a few minutes"
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  if (isLoading) {
    return <p>Loading schedules</p>;
  }
  return (
    <div className="main-page">
      <h1>Music Festival Schedules</h1>
      <Container schedules={allSchedules} />
    </div>
  );
}

export default Main;
