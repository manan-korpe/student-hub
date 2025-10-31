import { asyncHandler, ErrorResponse } from "../util/index.js"; // util
import { CollegesModel } from "../models/index.js";

const createCollege = asyncHandler(async (req, res, next) => {
    const { name, code, university, email, phone } = req.body;

    if (name.trim() === "" || code.trim() === "" || university.trim() === "" || email.trim() === "" || phone.trim() === "") {
        throw new ErrorResponse(401, "All Field Required.");
    }

    const hasCollege = await CollegesModel.findOne({ code, university, email, isAuthorized: true });
    if (hasCollege) {
        throw new ErrorResponse(401, "College Already Registered.");
    }

    const college = await CollegesModel.create({
        name,
        code,
        university,
        email,
        phone
    });

    res.status(201).json({
        success: true,
        message: "College Form Successfuly Sent",
    });
});

const updateCollegeStatus = asyncHandler(async (req, res, next) => {
    const { college_id, isAuthorized } = req.body;

    const college = await CollegesModel.findByIdAndUpdate(college_id, { isAuthorized }, { new: true });

    if (!college)
        throw new ErrorResponse(401, "College Status Updation Failed.");

    res.status(200).json({
        success: true,
        message: "College Status Updated.",
        data: college
    })
});

const getAllCollege = asyncHandler(async (req, res, next) => {
    const college = await CollegesModel.find();

    res.status(200).json({
        success: true,
        message: "Colleges Found successfully",
        data: college
    });
});

const getCollege = asyncHandler(async (req, res, next) => {
    const collegeID = req.params.id;
    if (!collegeID)
        throw new ErrorResponse(401, "College Not Found.");

    const college = await CollegesModel.findOne({ _id: collegeID });

    if (!college)
        throw new ErrorResponse(401, "College Not Found.");

    res.status(200).json({
        success: true,
        message: "Colleges Found successfully",
        data: college
    });
});

export { createCollege, updateCollegeStatus, getAllCollege, getCollege };