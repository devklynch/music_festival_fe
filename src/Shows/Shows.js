import "./Shows.css";
import {
  GiPalmTree,
  GiDesert,
  GiMusicSpell,
  GiDesertSkull,
  GiWorld,
  GiLindenLeaf,
  GiFlowerEmblem,
} from "react-icons/gi";

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

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    date.setHours(date.getHours() + 7);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getLocationIcon = (location) => {
    switch (location) {
      case "Gobi":
        return <GiDesertSkull className="location-icon" />;
      case "Outdoor Theatre":
        return <GiWorld className="location-icon" />;
      case "Sonora":
        return <GiLindenLeaf className="location-icon" />;
      case "Mojave":
        return <GiFlowerEmblem className="location-icon" />;
      case "Sahara":
        return <GiDesert className="location-icon" />;
      case "Yuma":
        return <GiMusicSpell className="location-icon" />;
      case "Coachella":
        return <GiPalmTree className="location-icon" />;
      default:
        return <GiPalmTree className="location-icon" />;
    }
  };
  return (
    <div className="show-card">
      <h4>{artist}</h4>
      <h5>Stage: {location}</h5>
      <p>Show Time: {`${formatTime(start_time)} - ${formatTime(end_time)}`}</p>
      {getLocationIcon(location)}
      <button onClick={handleDelete}>Remove Show</button>
    </div>
  );
}

export default Shows;
