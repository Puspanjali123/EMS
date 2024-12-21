import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { getRequest, requestLeave } from "../controllers/LeaveRequest.js";
const router = express.Router();
app.get("/api/leaves", authMiddleware, getRequest);

app.post("/api/leaves", authMiddleware, requestLeave);

export default router;
