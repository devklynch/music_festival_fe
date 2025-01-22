import logo from "./logo.svg";
import "./App.css";
import Main from "./Main/Main";
import ScheduleDetails from "./ScheduleDetails/ScheduleDetails";
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/schedules" element={<Main />} />
      <Route path="/schedules/:schedule_id" element={<ScheduleDetails />} />
    </Routes>
  );
}

export default App;
