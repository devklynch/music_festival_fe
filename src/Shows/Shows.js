import "./Shows.css";

function Shows({
  artist,
  location,
  start_time,
  end_time,
  show_id,
  removeShow,
  fetchShows,
}) {
  const handleDelete = () => {
    removeShow(show_id);
    fetchShows();
  };
  return (
    <div className="show-card">
      <h4>{artist}</h4>
      <h5>Stage: {location}</h5>
      <p>
        Show Time: {start_time} - {end_time}
      </p>
      <button onClick={handleDelete}>Remove Show</button>
    </div>
  );
}

export default Shows;
