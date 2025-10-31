import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colleges",
    },
    head_of_department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("Departments", departmentSchema);