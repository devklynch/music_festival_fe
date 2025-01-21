import "./Container.css";
import Schedule from "../Schedule/Schedule";

function Container({ schedules }) {
  console.log("Schedule", schedules[0].attributes.title);
  //how to access data schedules.schedules[0].attributes.title
  return (
    <div>
      <h2>Container Component</h2>
      <div className="all-schedules-cards">
        {schedules.length === 0 ? (
          <p>No Schedules Currently</p>
        ) : (
          schedules.map((schedule) => (
            <Schedule
              key={schedule.id}
              id={schedule.id}
              title={schedule.attributes.title}
              date={schedule.attributes.date}
              user_id={schedule.attributes.user_id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Container;
