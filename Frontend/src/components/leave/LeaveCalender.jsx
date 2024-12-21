import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {};
    fetch("/api/leaves")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((leave) => ({
          title: `${leave.employeeId.name} - On Leave`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          allDay: true,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching leave data:", error));
  }, []);

  return (
    <div>
      <h1>Leave Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default LeaveCalendar;
