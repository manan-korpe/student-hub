import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colleges",
    }
  },
  { timestamps: true }
);

const permissionSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tables",
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colleges",
    },
    can_read: {
      type: Boolean,
      default: false,
    },
    can_write: {
      type: Boolean,
      default: false,
    },
    can_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tables = mongoose.model("Tables", tableSchema);
const Roles = mongoose.model("Roles", roleSchema);
const Permissions = mongoose.model("Permissions", permissionSchema);

export {
  Tables,
  Roles,
  Permissions
}
