import { asyncHandler, ErrorResponse } from "../util/index.js"; // util
import {
  CollegesModel,
  PersonModel,
  StudentModel,
  StaffModel,
  FacultyModel,
  RoleModel,
} from "../models/index.js"; // model

const register = asyncHandler(async (req, res, next) => {
  let body = req.body,user;
  body["hash_password"] = body.password;
  delete body["password"];

  let hasCollege = await CollegesModel.findOne({_id:body.college_id, isAuthorized:true});
  if (!hasCollege) throw new ErrorResponse(400, "College Not Found");

  let isUserExist = await PersonModel.findOne({ email: body?.email });
  if (isUserExist) throw new ErrorResponse(400, "User already exists");

  let isRoleExist = await RoleModel.findById(body.role_id);
  if (!isRoleExist) throw new ErrorResponse(400, "Invalid role assign");

  let role = String(isRoleExist.role_name).toLowerCase();
  if (role === "admin") {
    user = await PersonModel.create(body);
  } else if (role === "student") {
    user = await StudentModel.create(body);
  } else if (role === "staff") {
    user = await StaffModel.create(body);
  } else if (role === "faculty") {
    user = await FacultyModel.create(body);
  }
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: isRoleExist.role_name,
      name: user.getFullName(),
    },
  });
});

const login = asyncHandler(async (req, res, next) => {
  let token;
  const { email, password } = req.body;

  if (email == "" || password == "")
    throw new ErrorResponse(400, "Invalid email or password");

  const user = await PersonModel.findOne({ email }).populate("role_id");

  if (!user) throw new ErrorResponse(400, "Invalid email or password");

  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword)
    throw new ErrorResponse(400, "Invalid email or password");

  token = user.createJWT();

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 60 * 2,
    sameSite: "lax",
    secure: false,
  });

  const userObj = user.toObject();
  delete userObj["hash_password"];

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: userObj,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout Successfuly"
  });
});

const getProfile = asyncHandler(async (req, res, next) => {
  const user = await PersonModel.findById(req.user.id)
    .populate("role_id")
    .select("-hash_password");

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const personID = req.user.id;

  const updatedProfile = await PersonModel.findByIdAndUpdate(personID, { ...body }, { new: true }).populate("role_id").select("-hash_password -createdAt -updatedAt -__v");

  return res.status(201).json({
    success: true,
    message: "Profile Updated Successfully",
    data: {
      ...updatedProfile.toObject()
    }
  });
});

export { register, login, logout, getProfile, updateProfile };
