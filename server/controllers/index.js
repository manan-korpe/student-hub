import { createCollege, updateCollegeStatus, getAllCollege, getCollege } from "./college.controller.js";
import { register, login, logout, getProfile, updateProfile } from "./auth.controller.js";
import { createCourse, getCourse, getAllCourse, updateCourse, deleteCourse } from "./course.controller.js";
import { createDepartment, getDepartment, getAllDepartment, updateDepartmnet, deleteDepartment } from "./department.controller.js";
import { getAllRole, getAllTable, getAllPermission } from "./permission.controller.js";

export {
    //college
    createCollege,
    updateCollegeStatus,
    getAllCollege,
    getCollege,
    //auth
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    //role
    getAllRole,
    //table
    getAllTable,
    //permission
    getAllPermission,
    //course
    createCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
    //department
    createDepartment,
    getDepartment,
    getAllDepartment,
    updateDepartmnet,
    deleteDepartment
}