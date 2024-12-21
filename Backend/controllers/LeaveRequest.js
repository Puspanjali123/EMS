import Employee from "../models/Employee.js";
import LeaveRequest from "../models/LeaveRequest.js";

const getRequest = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ status: "Approved" }).populate(
      "employeeId"
    );
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

const requestLeave = async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;
  try {
    const leaveRequest = new LeaveRequest({ employeeId, startDate, endDate });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating leave request" });
  }
};

export { getRequest, requestLeave };
