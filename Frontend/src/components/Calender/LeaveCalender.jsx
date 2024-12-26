import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const LeaveCalender = () => {
  const localizer = momentLocalizer(moment);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dept_name,
          startDate: leave.startDate,
          endDate: leave.endDate,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
        }));
        const transformedData = transformLeaveData(data);
        setLeaveList(transformedData);
        console.log("data", data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  console.log("leaveList", leaveList);

  function transformLeaveData(rawData) {
    return rawData.map((leave) => {
      return {
        title: `${leave.name}'s ${leave.leaveType}`, // Constructing the title
        start: new Date(leave.startDate), // Replace with the correct start date
        end: new Date(leave.endDate), // Replace with the correct end date
        status: leave.status,
        type: leave.leaveType,
      };
    });
  }

  // Open modal on date click
  const handleDateClick = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setModalOpen(true);
    const eventsForSelectedDate = leaveList.filter((event) =>
      moment(slotInfo.start).isBetween(event.start, event.end, "day", "[]")
    );
    setEventsForSelectedDate(eventsForSelectedDate);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // Default color

    if (event.status === "approved") backgroundColor = "#28a745"; // Green
    else if (event.status === "Pending") backgroundColor = "#ffc107"; // Yellow
    else if (event.status === "Rejected") backgroundColor = "#dc3545"; // Red

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="h-full p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <Calendar
        localizer={localizer}
        events={leaveList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        className="h-full"
        selectable // Enable date selection
        onSelectSlot={handleDateClick} // Handle date click
        eventPropGetter={eventStyleGetter} // Apply custom styling
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          style={{ zIndex: "9" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">
              Leave Details for {moment(selectedDate).format("MMMM Do, YYYY")}
            </h2>
            {eventsForSelectedDate.length > 0 ? (
              <ul>
                {eventsForSelectedDate.map((event, index) => (
                  <li key={index} className="mb-2">
                    <strong>{event.title}</strong>:{" "}
                    <span
                      className={
                        event.status === "approved"
                          ? "text-green-600"
                          : event.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {event.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No leave details available for this date.</p>
            )}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveCalender;
