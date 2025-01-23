import "./Schedule.css";

function Schedule({ id, title, date, user_id, children }) {
  return (
    <div className="schedule-card">
      <h2 className="title">{title}</h2>
      <p className="date">Schedule date: {date}</p>
      <p className="user-id">User Id: {user_id}</p>
      {children}
    </div>
  );
}
export default Schedule;
