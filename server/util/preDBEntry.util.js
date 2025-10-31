import { RoleModel, TableModel } from "../models/index.js";

export async function preDBEntries() {
    try {
        const roles = ["super_admin", "admin", "student", "staff", "faculty"];
        for (const name of roles) {
            const isExisting = await RoleModel.findOne({ role_name: name });

            if (!isExisting) {
                await RoleModel.create({
                    role_name: name,
                });
            }
        }

        const tables = [
            "Addresses",
            "Contacts",
            "Persons",
            "Tables",
            "Roles",
            "Permissions",
            "Students",
            "Employees",
            "Facultys",
            "Staffs",
            "AcademicRecords",
            "Departments",
            "Courses",
        ];

        for (const name of tables) {
            const isExisting = await TableModel.findOne({ table_name: name });

            if (!isExisting) {
                await TableModel.create({
                    table_name: name,
                });
            }
        }

        console.log("✅ Pre-Entries Successfully Done !");
    } catch (error) {
        console.log("❌ Something wrong with preEntries");
        console.log(error.message);
    }
}
