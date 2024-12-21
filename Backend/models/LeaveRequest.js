import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveRequestSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {}
);
const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequest;
