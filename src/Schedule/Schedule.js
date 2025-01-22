import "./Schedule.css";

function Schedule({ id, title, date, user_id }) {
  console.log("Title", title);
  return (
    <div className="schedule-card">
      <h3>{title}</h3>
      <p>Schedule date: {date}</p>
      <p>User Id: {user_id}</p>
    </div>
  );
}
export default Schedule;
