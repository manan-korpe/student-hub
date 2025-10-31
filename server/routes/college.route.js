import express from "express";
import { createCollege, updateCollegeStatus, getAllCollege, getCollege } from "../controllers/college.controller.js";

const route = express.Router();

route.route("/").get(getAllCollege).post(createCollege).put(updateCollegeStatus);
route.route("/:id").get(getCollege);

export default route;