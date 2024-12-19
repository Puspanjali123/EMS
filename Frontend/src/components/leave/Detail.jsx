import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate;
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {leave ? (
        <div>
          <h2>Leave Details</h2>
          <div>
            <div>
              <img
                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
                alt=""
              />
            </div>
            <div>
              <div>
                <p>Name :</p>
                <p>{leave.employeeId.userId.name}</p>
              </div>
              <div>
                <p>Employee ID:</p>
                <p>{leave.employeeId.employeeId}</p>
              </div>
              <div>
                <p>Leave Type :</p>
                <p>{leave.leaveType}</p>
              </div>
              <div>
                <p>Reason :</p>
                <p>{leave.reason}</p>
              </div>
              <div>
                <p>Department:</p>
                <p>{leave.employeeId.department.dept_name}</p>
              </div>
              <div>
                <p>Start Date:</p>
                <p>{new Date(leave.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p>End Date:</p>
                <p>{new Date(leave.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p>{leave.status === "Pending" ? "Action" : "Status"}</p>
                {leave.status === "Pending" ? (
                  <div>
                    <button onClick={() => changeStatus(leave._id, "Approved")}>
                      Approve
                    </button>
                    <button onClick={() => changeStatus(leave._id, "Rejected")}>
                      Reject
                    </button>
                  </div>
                ) : (
                  <p>{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Detail;
