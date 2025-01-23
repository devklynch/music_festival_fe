import "./Schedule.css";

function Schedule({ id, title, date, user_id, children }) {
  console.log("Title", title);
  return (
    <div className="schedule-card">
      <h3 className="title">{title}</h3>
      <p className="date">Schedule date: {date}</p>
      <p className="user-id">User Id: {user_id}</p>
      {children}
    </div>
  );
}
export default Schedule;
