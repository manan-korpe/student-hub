import { PersonModel, RoleModel } from "../models/index.js";

async function seedSuperAdmin() {
    try {

        const role = await RoleModel.findOne({ role_name: "super_admin" });
        if (!role) {
            console.log("❌ Role Not Found.");
            return;
        }
        const hashSuperAdmin = await PersonModel.findOne({ role_id: role });


        if (hashSuperAdmin) {
            console.log("🔄 Super Admin already exists");
            return;
        }

        await PersonModel.create({
            role_id: role,
            first_name: process.env.SUPER_USER_NAME,
            email: process.env.SUPER_USER_EMAIL,
            phone: process.env.SUPER_USER_PHONE,
            hash_password: process.env.SUPER_USER_PASSWORD,
            college_id: null
        });

        console.log("✅ Super Admin Created successfully.");
    } catch (error) {
        console.log("❌ Super Admin Creation failed.");
        console.log(error.message);
    }
}

export default seedSuperAdmin;