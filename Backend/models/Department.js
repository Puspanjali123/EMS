import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
const departmentSchema = new mongoose.Schema(
  {
    dept_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const empIds = employees.map((emp) => emp._id);
      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: empIds } });
      await Salary.deleteMany({ employeeId: { $in: empIds } });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Department = mongoose.model("Department", departmentSchema);
export default Department;
