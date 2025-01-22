import "./Container.css";
import Schedule from "../Schedule/Schedule";
import { Link } from "react-router-dom";

function Container({ schedules }) {
  console.log("Schedule", schedules[0].attributes.title);
  //how to access data schedules.schedules[0].attributes.title
  return (
    <div>
      <div className="all-schedules-cards">
        {schedules.length === 0 ? (
          <p>No Schedules Currently</p>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id}>
              <Schedule
                key={schedule.id}
                id={schedule.id}
                title={schedule.attributes.title}
                date={schedule.attributes.date}
                user_id={schedule.attributes.user_id}
              />
              <Link to={`/schedules/${schedule.id}`}>
                <button>Schedule Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Container;
