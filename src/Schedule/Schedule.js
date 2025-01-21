import "./Schedule.css";

function Schedule({ id, title, date, user_id }) {
  console.log("Title", title);
  return (
    <div className="schedule-card">
      <h3>{title}</h3>
    </div>
  );
}
export default Schedule;
