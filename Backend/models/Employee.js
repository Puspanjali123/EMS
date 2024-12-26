import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveBalanceSchema = new Schema(
  {
    leaveType: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    used: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);
const employeeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    profileImage: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },

    leaveBalances: {
      type: [leaveBalanceSchema],
      default: [
        { leaveType: "Vacation", total: 20, used: 0 },
        { leaveType: "Sick Leave", total: 10, used: 0 },
        { leaveType: "Casual Leave", total: 5, used: 0 },
      ],
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
