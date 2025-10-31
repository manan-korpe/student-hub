import express from "express";
import {authUser} from "../middlewares/old/authUser.js";
import {createDepartment, getDepartment, getAllDepartment, updateDepartmnet, deleteDepartment} from "../controllers/index.js";

const route = express.Router();

route.post("/",authUser,createDepartment);
route.get("/",authUser,getAllDepartment);
route.route("/:id").get(authUser, getDepartment).put(authUser, updateDepartmnet).delete(authUser, deleteDepartment);

export default route;