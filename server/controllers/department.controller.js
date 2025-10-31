import mongoose from "mongoose";
import { asyncHandler, ErrorResponse } from "../util/index.js";
import { DepartmentModel, CollegesModel } from "../models/index.js";

const createDepartment = asyncHandler(async (req, res, next) => {
  const { name, code } = req.body;
  const collegeID = req.user.college_id;

  if (name == "" || code == "")
    throw new ErrorResponse(400, "Invalide details.");

  const hasCollege = await CollegesModel.findOne({ _id: "6903a5ebfefadcfd3210be8e", isAuthorized: true });
  console.log(hasCollege);
  console.log(collegeID)
  if (!hasCollege)
    throw new ErrorResponse(400, "Invalide details.");

  const department = await DepartmentModel.create({
    name,
    code,
    college_id
  });

  return res.status(200).json({
    success: true,
    message: "Department created successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const updateDepartmnet = asyncHandler(async (req, res, next) => {
  const { name, code } = req.body;
  const departmentID = req.params.id;
  const collegeID = req.user.college_id;

  const hasDepartment = await DepartmentModel.findOne({ _id: departmentID, college_id: collegeID });
  if (!hasDepartment) throw new ErrorResponse(400, "Department Not found.");

  const department = await DepartmentModel.findByIdAndUpdate(departmentID, {
    name: name,
    code: code,
  }, { new: true });
  department.save();

  return res.status(200).json({
    success: true,
    message: "Department Update successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const deleteDepartment = asyncHandler(async (req, res, next) => {
  const departmentID = req.params.id;
  const collegeID = req.user.college_id;

  const hasDepartment = await DepartmentModel.findOne({ _id: departmentID, college_id: collegeID });
  if (!hasDepartment) throw new ErrorResponse(400, "Department Not found.");

  const department = await DepartmentModel.findOneAndDelete({ _id: departmentID, college_id: collegeID });

  return res.status(200).json({
    success: true,
    message: "Department deleted successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const getDepartment = asyncHandler(async (req, res, next) => {
  const departmentID = req.params.id;
  const collegeID = req.user.college_id;

  const department = await DepartmentModel.findOne({ _id: departmentID, college_id: collegeID });
  if (!department) throw new ErrorResponse(400, "Department Not found.");

  return res.status(200).json({
    success: true,
    message: "Department Got Successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const getAllDepartment = asyncHandler(async (req, res, next) => {
  const collegeID = req.user.college_id;
  const departments = await DepartmentModel.find({ college_id: collegeID }).select("-__v -college_id");

  return res.status(200).json({
    success: true,
    message: "Department Got Successfuly.",
    data: {
      departments
    },
  });
});

export { createDepartment, getDepartment, getAllDepartment, updateDepartmnet, deleteDepartment };
