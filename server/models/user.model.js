import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//options
const options = {
  discriminatorKey: "kind",
  collection: "User",
  timestamps: true,
};

//enums
const employeeTypeEnum = ["full-time", "part-time", "contract"];
const employeeStatus = ["active", "inactive", "on leave"];
const staffShift = ["morning", "afternoon"];

//person
const personSchema = new mongoose.Schema(
  {
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addresses",
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
    college_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "colleges",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    Birth_date: {
      type: mongoose.Schema.Types.Date,
    },
    profile_image: {
      type: String,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  options
);

//student
const studentSchema = mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrollment_no: {
    type: String,
    required: true,
    minLength: 10,
    trim: true,
    unique: true,
  },
  enrollment_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  graduation_year: {
    type: Number,
    required: true,
  },
  current_semester: {
    type: Number,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
});

//employee
const employeeSchema = new mongoose.Schema({
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    enum: employeeTypeEnum,
    required: true,
  },
  joining_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  working_hours: {
    type: Number,
    required: true,
  },
  salary: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    enum: employeeStatus,
    required: true,
  },
});

//staff
const staffSchema = new mongoose.Schema({
  ...employeeSchema.obj,
  shift: {
    type: String,
    enum: staffShift,
    required: true,
  },
  skill: [String],
});

//faculty
const facultySchema = new mongoose.Schema({
  ...employeeSchema.obj,
  office_number: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
});

//functions
personSchema.pre("save", async function (next) {
  if (!this.isModified("hash_password")) next();

  this.hash_password = await bcrypt.hash(this.hash_password, 10);
  next();
});

personSchema.methods.getFullName = function () {
  return `${this.first_name} ${this.middle_name} ${this.last_name}`;
};

personSchema.methods.isValidPassword = async function (password) {
  try {
    let isCorrect = await bcrypt.compare(password, this.hash_password);
    return isCorrect;
  } catch (error) {
    return false;
  }
};

personSchema.methods.createJWT = function () {
  return JWT.sign(
    {
      id: this._id,
      email: this.email,
      college_id:this.college_id,
      role_id:this.role_id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const Persons = mongoose.model("Persons", personSchema);
const Students = Persons.discriminator("Students", studentSchema);
const Employees = Persons.discriminator("Employees", employeeSchema);
const Staffs = Persons.discriminator("Staffs", staffSchema);
const Facultys = Persons.discriminator("Facultys", facultySchema);

export { Persons, Students, Employees, Staffs, Facultys };
