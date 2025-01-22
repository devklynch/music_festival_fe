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
        return <GiDesertSkull className="location-icon" size={70} />;
      case "Outdoor Theatre":
        return <GiWorld className="location-icon" size={70} />;
      case "Sonora":
        return <GiLindenLeaf className="location-icon" size={70} />;
      case "Mojave":
        return <GiFlowerEmblem className="location-icon" size={70} />;
      case "Sahara":
        return <GiDesert className="location-icon" size={70} />;
      case "Yuma":
        return <GiMusicSpell className="location-icon" size={70} />;
      case "Coachella":
        return <GiPalmTree className="location-icon" size={70} />;
      default:
        return <GiPalmTree className="location-icon" size={70} />;
    }
  };
  return (
    <div className="show-card">
      <h4>{artist}</h4>
      <h5>Stage: {location}</h5>
      <p>Show Time: {`${formatTime(start_time)} - ${formatTime(end_time)}`}</p>
      {getLocationIcon(location)}
      <button className="remove-btn" onClick={handleDelete}>
        Remove Show
      </button>
    </div>
  );
}

export default Shows;
